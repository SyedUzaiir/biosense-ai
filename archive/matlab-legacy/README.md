# Legacy MATLAB Implementation

This directory contains the original MATLAB implementation used during the research and prototyping phase of the BioSense AI / HealthGuard project:
- `data_prep.m`: Aggregation and preprocessing of the raw physiological dataset.
- `train_model.m`: SVM and Bagged Trees classification training scripts.
- `explainability.m`: Partial Dependence Plots (PDP) generation routines.
- `dashboard_concept.m`: Concept mockups for the clinician visualization portal.

The production ML pipeline has been completely migrated to a modular, Python-based infrastructure using `scikit-learn`, `shap`, and `scipy` located in the `/ml` directory. The web application runs on a Next.js frontend communicating with a unified FastAPI server.

These files are preserved for historical research records, software evolution tracking, and academic audit purposes.
