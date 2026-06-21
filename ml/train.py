import os
import json
import joblib
import pandas as pd
import numpy as np

# Set import paths since it is in ml/ folder
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.preprocess import load_data, preprocess_data
from src.trainer import train_and_evaluate
from src.explainability import generate_explainability_plots

def run_pipeline():
    # Directories
    dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'diabetes_15_important_columns.csv')
    
    # Fallback to datasets folder if not copied to ml/dataset yet
    if not os.path.exists(dataset_path):
        dataset_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model', 'datasets', 'diabetes_15_important_columns.csv')
        
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    artifacts_dir = os.path.join(os.path.dirname(__file__), 'artifacts')
    
    os.makedirs(models_dir, exist_ok=True)
    os.makedirs(artifacts_dir, exist_ok=True)
    
    print(f"Loading raw dataset from {dataset_path}...")
    df = load_data(dataset_path)
    
    print("Preprocessing data and running KNN Imputation...")
    X, y, imputer = preprocess_data(df, is_training=True)
    
    print("Training models and plotting performance metrics...")
    rf_model, svm_pipeline, X_train, X_test, y_train, y_test, top3_patients = train_and_evaluate(
        X, y, artifacts_dir=artifacts_dir
    )
    
    # Generate XAI Explanations
    print("Generating Model Interpretability charts...")
    generate_explainability_plots(rf_model, X_train, X_test, artifacts_dir=artifacts_dir)
    
    # Extract metadata for predictor mapping
    feature_means = X_train.mean().to_dict()
    feature_stds = X_train.std().to_dict()
    feature_importances = {feat: float(imp) for feat, imp in zip(X_train.columns, rf_model.feature_importances_)}
    
    metadata = {
        'feature_names': X_train.columns.tolist(),
        'feature_means': feature_means,
        'feature_stds': feature_stds,
        'feature_importances': feature_importances
    }
    
    # Save Models and Preprocessors Separately
    print("Saving models individually...")
    joblib.dump(rf_model, os.path.join(models_dir, 'random_forest.joblib'))
    joblib.dump(svm_pipeline, os.path.join(models_dir, 'svm.joblib'))
    joblib.dump(imputer, os.path.join(models_dir, 'preprocessor.joblib'))
    
    with open(os.path.join(models_dir, 'metadata.json'), 'w') as f:
        json.dump(metadata, f, indent=4)
        
    # Save simulated patient metadata for reference
    top3_patients.to_csv(os.path.join(artifacts_dir, 'top_3_simulated_patients.csv'), index=False)
    
    print("---------------------------------------------")
    print("ML Pipeline Run Completed Successfully!")
    print(f"Models exported to: {models_dir}")
    print(f"Evaluation charts saved to: {artifacts_dir}")
    print("---------------------------------------------")

if __name__ == '__main__':
    run_pipeline()
