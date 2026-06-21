import os
import matplotlib.pyplot as plt
import numpy as np
import shap
from sklearn.inspection import PartialDependenceDisplay

def generate_explainability_plots(rf_model, X_train, X_test, artifacts_dir='artifacts'):
    """
    Generates and saves feature importance, partial dependence, and SHAP explanation plots.
    """
    os.makedirs(artifacts_dir, exist_ok=True)
    
    # 1. Feature Importance Plot
    importances = rf_model.feature_importances_
    indices = np.argsort(importances)
    
    plt.figure(figsize=(10, 6))
    plt.title("Feature Importance Estimates (Random Forest)")
    plt.barh(range(len(indices)), importances[indices], color='skyblue', align='center')
    plt.yticks(range(len(indices)), [X_train.columns[i] for i in indices])
    plt.xlabel("Relative Importance")
    plt.tight_layout()
    plt.savefig(os.path.join(artifacts_dir, 'feature_importance.png'), dpi=300)
    plt.close()
    print("Saved feature importance chart.")
    
    # 2. Partial Dependence Plots (PDP)
    # Target top continuous variables: Glucose_mean_24h, BMI, Age
    features_to_plot = ['Glucose_mean_24h', 'BMI', 'Age']
    # Filter only if they exist in dataset columns
    pdp_features = [f for f in features_to_plot if f in X_train.columns]
    
    if len(pdp_features) > 0:
        fig, ax = plt.subplots(1, len(pdp_features), figsize=(15, 5))
        if len(pdp_features) == 1:
            ax = [ax]
            
        display = PartialDependenceDisplay.from_estimator(
            rf_model, X_train, pdp_features, ax=ax
        )
        fig.suptitle("Partial Dependence Plots for Top Features", fontsize=16)
        plt.tight_layout()
        plt.savefig(os.path.join(artifacts_dir, 'partial_dependence_plots.png'), dpi=300)
        plt.close()
        print("Saved Partial Dependence Plots.")
    else:
        print("Features for PDP not found in predictors.")
        
    # 3. SHAP local explanation for patient index 100
    try:
        print("Computing SHAP values...")
        explainer = shap.TreeExplainer(rf_model)
        # Use a small background dataset or test set directly
        shap_values = explainer(X_test)
        
        # Plot and save waterfall plot for instance index 100
        plt.figure(figsize=(10, 6))
        shap.plots.waterfall(shap_values[100, :, 1], show=False)
        plt.title("SHAP Explanation for Patient Index 100", fontsize=14, pad=20)
        plt.tight_layout()
        plt.savefig(os.path.join(artifacts_dir, 'shap_waterfall.png'), dpi=300)
        plt.close()
        print("Saved SHAP waterfall explanation plot.")
    except Exception as e:
        print(f"SHAP explanation failed: {e}")
