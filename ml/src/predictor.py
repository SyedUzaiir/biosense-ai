import os
import json
import joblib
import pandas as pd
import numpy as np
from scipy.interpolate import PchipInterpolator

class MLPredictor:
    def __init__(self, models_dir='models'):
        """Loads models, preprocessor, and metadata from the models directory."""
        self.models_dir = models_dir
        
        # Paths
        rf_path = os.path.join(models_dir, 'random_forest.joblib')
        svm_path = os.path.join(models_dir, 'svm.joblib')
        prep_path = os.path.join(models_dir, 'preprocessor.joblib')
        meta_path = os.path.join(models_dir, 'metadata.json')
        
        # Load assets
        if not os.path.exists(rf_path) or not os.path.exists(prep_path):
            raise FileNotFoundError(f"Trained models not found in {models_dir}. Please run train.py first.")
            
        self.rf_model = joblib.load(rf_path)
        self.svm_model = joblib.load(svm_path) if os.path.exists(svm_path) else None
        self.preprocessor = joblib.load(prep_path) # KNNImputer
        
        with open(meta_path, 'r') as f:
            self.metadata = json.load(f)
            
        self.feature_names = self.metadata['feature_names']
        self.feature_means = self.metadata['feature_means']
        self.feature_stds = self.metadata['feature_stds']
        self.feature_importances = self.metadata.get('feature_importances', {})
        
    def predict_vitals(self, vitals: dict):
        """
        Runs the full prediction pipeline on a single raw vitals dictionary.
        Returns:
            - risk_probability (float)
            - risk (str): "Stable 🟢", "At Risk 🟡", "High Risk 🔴"
            - top_features (list): list of top 3 features contributing to risk
            - trajectory (list): list of 25 values representing simulated 24h glucose trajectory
        """
        # Convert single record to DataFrame matching training columns
        # Predictors required:
        # Age, Sex, BMI, Glucose_mean_24h, Glucose_max_24h, Hypoglycemia_events_24h,
        # Hyperglycemia_events_24h, Insulin_any_24h, SBP_mean_24h, DBP_mean_24h,
        # History_hypertension, HR_mean_24h, SpO2_mean_24h, Temperature_mean_24h
        
        # Map input keys to standard feature names
        raw_row = {}
        
        # Map values with fallbacks
        raw_row['Age'] = float(vitals.get('age', vitals.get('Age', 45)))
        
        sex_val = vitals.get('sex', vitals.get('Sex', 'Male'))
        raw_row['Sex'] = 1.0 if sex_val in ['Male', '1', 1, 1.0] else 0.0
        
        raw_row['BMI'] = float(vitals.get('bmi', vitals.get('BMI', 24.5)))
        
        # Random glucose in checker maps to mean, max is estimated
        g_mean = float(vitals.get('glucose_random', vitals.get('glucose_mean_24h', vitals.get('Glucose', 95))))
        g_max = float(vitals.get('glucose_max_24h', g_mean * 1.3))
        raw_row['Glucose_mean_24h'] = g_mean
        raw_row['Glucose_max_24h'] = g_max
        
        # Convert booleans or ints to 1.0 / 0.0
        hypo = vitals.get('hypoglycemia', vitals.get('hypo_events_24h', 0))
        raw_row['Hypoglycemia_events_24h'] = 1.0 if (hypo is True or hypo == 'Yes' or float(hypo) > 0) else 0.0
        
        hyper = vitals.get('hyperglycemia', vitals.get('hyper_events_24h', 0))
        raw_row['Hyperglycemia_events_24h'] = 1.0 if (hyper is True or hyper == 'Yes' or float(hyper) > 0) else 0.0
        
        insulin = vitals.get('insulin_any_24h', vitals.get('insulin_avg', 0))
        raw_row['Insulin_any_24h'] = 1.0 if (insulin is True or insulin == 'Yes' or float(insulin) > 0) else 0.0
        
        raw_row['SBP_mean_24h'] = float(vitals.get('sbp_mean', vitals.get('sbp_mean_24h', vitals.get('SBP', 120))))
        raw_row['DBP_mean_24h'] = float(vitals.get('dbp_mean', vitals.get('dbp_mean_24h', 80)))
        
        htn = vitals.get('history_htn', vitals.get('history_hypertension', 0))
        raw_row['History_hypertension'] = 1.0 if (htn is True or htn == 'Yes' or float(htn) > 0) else 0.0
        
        raw_row['HR_mean_24h'] = float(vitals.get('hr_mean', vitals.get('hr_mean_24h', 72)))
        raw_row['SpO2_mean_24h'] = float(vitals.get('spo2_mean', vitals.get('spo2_mean_24h', 98)))
        raw_row['Temperature_mean_24h'] = float(vitals.get('temp_mean', vitals.get('temp_mean_24h', 36.6)))
        
        df_row = pd.DataFrame([raw_row])
        
        # Impute
        cols_to_impute = [col for col in self.feature_names if col not in ['Glucose_Stability', 'MAP', 'BMI_Risk']]
        df_imputed = pd.DataFrame(
            self.preprocessor.transform(df_row[cols_to_impute]),
            columns=cols_to_impute
        )
        
        # Re-apply non-imputed columns
        for col in df_row.columns:
            if col not in cols_to_impute:
                df_imputed[col] = df_row[col].values
                
        # Feature Engineering
        df_imputed['Glucose_Stability'] = df_imputed['Glucose_max_24h'] - df_imputed['Glucose_mean_24h']
        df_imputed['MAP'] = (df_imputed['SBP_mean_24h'] + 2 * df_imputed['DBP_mean_24h']) / 3
        
        bmi = df_imputed['BMI'].values[0]
        if bmi < 18.5:
            df_imputed['BMI_Risk'] = 0.0
        elif bmi < 25:
            df_imputed['BMI_Risk'] = 1.0
        elif bmi < 30:
            df_imputed['BMI_Risk'] = 2.0
        else:
            df_imputed['BMI_Risk'] = 3.0
            
        # Reorder to training layout
        X_infer = df_imputed[self.feature_names]
        
        # Predict Risk
        risk_probability = float(self.rf_model.predict_proba(X_infer)[0, 1])
        
        # Map to Risk labels
        # Standardize matching criteria: High Risk > 70%, At Risk 40-70%, Stable < 40%
        # Or match the Next.js rules
        if risk_probability > 0.65:
            risk = "High Risk 🔴"
        elif risk_probability > 0.35:
            risk = "At Risk 🟡"
        else:
            risk = "Stable 🟢"
            
        # Calculate Top 3 Contributing Features
        # Using importance-weighted deviation from dataset mean
        contributions = {}
        for feat in self.feature_names:
            val = float(X_infer[feat].values[0])
            mean_val = self.feature_means.get(feat, 0.0)
            std_val = self.feature_stds.get(feat, 1.0)
            importance = self.feature_importances.get(feat, 0.0)
            
            # Scaled deviation from typical/mean patient
            deviation = abs(val - mean_val) / max(std_val, 0.01)
            contributions[feat] = importance * deviation
            
        top_features = sorted(contributions, key=contributions.get, reverse=True)[:3]
        
        # Map display names of top features
        display_names = {
            'Glucose_mean_24h': 'Glucose Mean',
            'Glucose_max_24h': 'Glucose Max',
            'BMI': 'BMI',
            'Age': 'Age',
            'Glucose_Stability': 'Glucose Stability',
            'SBP_mean_24h': 'Systolic BP',
            'DBP_mean_24h': 'Diastolic BP',
            'History_hypertension': 'Hypertension History',
            'MAP': 'Mean Arterial Pressure',
            'BMI_Risk': 'BMI Risk Class'
        }
        top_features_display = [display_names.get(f, f) for f in top_features]
        
        # Dynamic Risk Glucose Trajectory (24-hour simulation)
        # interpolates between points to draw a beautiful curve
        key_t = np.array([0, 8, 12, 16, 24])
        key_y = np.array([g_mean, g_mean, g_max, g_mean * 1.1, g_mean])
        pchip = PchipInterpolator(key_t, key_y)
        time_hours = np.arange(25)
        sim_trajectory = [round(float(val), 1) for val in pchip(time_hours)]
        
        return {
            'risk_probability': risk_probability,
            'risk': risk,
            'top_features': top_features_display,
            'trajectory': sim_trajectory
        }
