import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer

def load_data(filepath):
    """Loads dataset from a CSV file."""
    return pd.read_csv(filepath)

def preprocess_data(df, imputer=None, is_training=True):
    """
    Cleans, imputes, and performs feature engineering on the patient dataset.
    """
    df = df.copy()
    
    # 1. Target column calculation and leakage prevention
    y = None
    if 'HbA1c_value' in df.columns:
        if is_training:
            y = (df['HbA1c_value'] >= 6.5).astype(float)
        df = df.drop(columns=['HbA1c_value'])
    elif is_training and 'Diabetes' in df.columns:
        y = df['Diabetes'].astype(float)
        df = df.drop(columns=['Diabetes'])
        
    # 2. Encode Sex categorical variable (Male -> 1, Female -> 0)
    if 'Sex' in df.columns:
        df['Sex'] = df['Sex'].map({'Male': 1, 'Female': 0, '1': 1, '0': 0})
        
    # 3. Numeric Imputation using KNN
    # Exclude categorical columns if any non-numeric remains (none should after mapping Sex)
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    if is_training:
        imputer = KNNImputer(n_neighbors=5)
        df[numeric_cols] = imputer.fit_transform(df[numeric_cols])
    else:
        if imputer is not None:
            df[numeric_cols] = imputer.transform(df[numeric_cols])
        else:
            raise ValueError("Imputer must be provided for preprocessing in inference mode.")
            
    # 4. Feature Engineering
    # A. Glucose Stability
    if 'Glucose_max_24h' in df.columns and 'Glucose_mean_24h' in df.columns:
        df['Glucose_Stability'] = df['Glucose_max_24h'] - df['Glucose_mean_24h']
        
    # B. Mean Arterial Pressure (MAP)
    if 'SBP_mean_24h' in df.columns and 'DBP_mean_24h' in df.columns:
        df['MAP'] = (df['SBP_mean_24h'] + 2 * df['DBP_mean_24h']) / 3
        
    # C. BMI Risk Categories
    if 'BMI' in df.columns:
        def get_bmi_risk(bmi):
            if bmi < 18.5:
                return 0 # Underweight
            elif bmi < 25:
                return 1 # Normal
            elif bmi < 30:
                return 2 # Overweight
            else:
                return 3 # Obese
        df['BMI_Risk'] = df['BMI'].apply(get_bmi_risk)
        
    if is_training:
        return df, y, imputer
    return df
