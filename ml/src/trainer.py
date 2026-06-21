import os
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc

def train_and_evaluate(X, y, artifacts_dir='artifacts'):
    """
    Splits the data, trains RandomForest and SVM models, generates evaluation plots,
    and returns the trained model objects.
    """
    os.makedirs(artifacts_dir, exist_ok=True)
    
    # 1. 80/20 Train-Test Split (stratified for binary classification)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"Training set size: {X_train.shape[0]}")
    print(f"Testing set size: {X_test.shape[0]}")
    
    # 2. Train Models
    # Model A: Random Forest Classifier (Bagged Tree equivalent)
    print("Training Random Forest Classifier...")
    rf_model = RandomForestClassifier(n_estimators=50, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Model B: SVM with Gaussian (RBF) kernel and Standardisation Pipeline
    print("Training SVM Classifier Pipeline...")
    svm_pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('svm', SVC(kernel='rbf', probability=True, random_state=42))
    ])
    svm_pipeline.fit(X_train, y_train)
    
    # 3. Model Predictions & Evaluation
    rf_preds = rf_model.predict(X_test)
    svm_preds = svm_pipeline.predict(X_test)
    
    rf_probs = rf_model.predict_proba(X_test)[:, 1]
    svm_probs = svm_pipeline.predict_proba(X_test)[:, 1]
    
    # A. Save Confusion Matrices
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    rf_cm = confusion_matrix(y_test, rf_preds)
    rf_disp = ConfusionMatrixDisplay(confusion_matrix=rf_cm, display_labels=['Stable', 'High Risk'])
    rf_disp.plot(ax=axes[0], cmap=plt.cm.Blues)
    axes[0].set_title("Random Forest Confusion Matrix")
    
    svm_cm = confusion_matrix(y_test, svm_preds)
    svm_disp = ConfusionMatrixDisplay(confusion_matrix=svm_cm, display_labels=['Stable', 'High Risk'])
    svm_disp.plot(ax=axes[1], cmap=plt.cm.Blues)
    axes[1].set_title("SVM Confusion Matrix")
    
    plt.tight_layout()
    plt.savefig(os.path.join(artifacts_dir, 'confusion_matrices.png'), dpi=300)
    plt.close()
    print("Saved confusion matrix plots to artifacts.")
    
    # B. Save ROC Curve comparison
    rf_fpr, rf_tpr, _ = roc_curve(y_test, rf_probs)
    rf_auc = auc(rf_fpr, rf_tpr)
    
    svm_fpr, svm_tpr, _ = roc_curve(y_test, svm_probs)
    svm_auc = auc(svm_fpr, svm_tpr)
    
    plt.figure(figsize=(8, 6))
    plt.plot(rf_fpr, rf_tpr, color='blue', lw=2, label=f'Random Forest (AUC = {rf_auc:.2f})')
    plt.plot(svm_fpr, svm_tpr, color='orange', lw=2, linestyle='--', label=f'SVM (AUC = {svm_auc:.2f})')
    plt.plot([0, 1], [0, 1], color='gray', lw=1, linestyle=':')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve Comparison')
    plt.legend(loc='lower right')
    plt.grid(True, alpha=0.3)
    
    plt.savefig(os.path.join(artifacts_dir, 'roc_curve_comparison.png'), dpi=300)
    plt.close()
    print("Saved ROC curve comparison to artifacts.")
    
    # 4. Comorbidity Risk identification in test set (Glucose mean > 180 and Hypoglycemia events > 0)
    high_risk_dka = (X_test['Glucose_mean_24h'] > 180) & (X_test['Hypoglycemia_events_24h'] > 0)
    dka_count = np.sum(high_risk_dka)
    print(f"High Risk DKA Patients identified in Test Set: {dka_count}")
    
    # 5. Extract top 3 highest probability patients
    # Rank by RF high-risk probability
    top3_indices = np.argsort(rf_probs)[-3:][::-1]
    top3_patients = X_test.iloc[top3_indices].copy()
    top3_patients['Predicted_Probability'] = rf_probs[top3_indices]
    
    return rf_model, svm_pipeline, X_train, X_test, y_train, y_test, top3_patients
