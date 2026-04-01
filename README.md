# 🩺 BioSense AI: HealthGuard System

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)

Welcome to **BioSense AI**, a state-of-the-art multimodal clinical intelligence platform. The HealthGuard system bridges the gap between physiological data and psychological state, providing a comprehensive AI-driven assessment for both patients and clinicians.

The architecture connects a Next.js frontend with robust rule-based algorithms, hardware-simulated vital signs, MATLAB model training suites, and a Python-powered Emotion Detection ML model to deliver holistic health insights.

---

## 🌟 Key Features

### 👨‍⚕️ Clinical Doctor Dashboard
- **Active Patient Registry**: A real-time data table supporting search, filtering, and pagination.
- **Risk Stratification**: Patients are dynamically grouped into `Stable 🟢`, `At Risk 🟡`, and `High Risk 🔴` using advanced weighted classification rules for diabetes vulnerability (tracking HbA1c, fasting glucose, BMI, and hypertension history).
- **Professional Detail Modal**: Comprehensive 15-point data visualization grids broken into:
  - *Metabolic Profile*
  - *Glucose Analysis*
  - *Cardiovascular Health*
  - *Vital Signs*
- **Clinical Terminology**: Casual identifiers are automatically replaced with professional diagnostics (e.g., `Mild Depressive Indicators` instead of "Sad", or `Elevated Stress Response` instead of "Angry").

### 📱 Patient Self-Assessment Portal
- **Secure Authentication**: PID-based routing ensures patients can only interact with their isolated datasets.
- **Facial Emotion Capture**: Integrates with device webcams to capture images and securely route them to a local Python vision model for stress/affect analysis.
- **Combined AI Insights**: The platform cross-references the physical diabetes risk outcome with the psychological state to output a unified medical recommendation (e.g., *"At-risk metabolic condition noted with negative emotional affect. Routine monitoring and stress interventions recommended."*).

### 🧬 MATLAB Model Development Pipeline
- Includes standalone scripts (`data_prep.m`, `train_model.m`, `explainability.m`) utilized heavily by data scientists for raw CSV aggregation, SVM/bagged-tree offline training, and generating Partial Dependence metrics for the clinical engine.

---

## 🛠️ Technology Stack

| Architecture Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router), React, TypeScript |
| **Interactive UI** | Tailwind CSS, Framer Motion, Lucide Icons |
| **State & Persistence** | LocalStorage API (Mock Database) |
| **Backend AI Vision** | Python API (Flask/FastAPI) |
| **Data Science / ML** | MATLAB (Machine Learning Toolbox) |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- Python 3.9+ (for Emotion API)
- MATLAB R2020b+ (Optional, for running offline pipeline metrics)

### 1. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/your-repo/biosense-ai.git
cd biosense-ai/health-guard-ai

# Install Next.js dependencies
npm install

# Start the development server
npm run dev
```
Navigate to `http://localhost:3000` to access the application.

### 2. Emotion Detection API
Ensure your Python vision server is active on `http://127.0.0.1:5000/predict-emotion`. If this server is unreachable, the Next.js platform will natively intercept the error and activate a resilient mock-fallback generator so presentations are not interrupted.

### 3. MATLAB Operations
Open MATLAB, set your active directory to `/model`, and execute:
```matlab
run('data_prep.m')
run('train_model.m')
run('explainability.m')
```

---

## 👥 Team





---

## 🛡️ License
This repository is marked under the standard MIT License. See [LICENSE](LICENSE) for details.
