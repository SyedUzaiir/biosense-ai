# 🩺 HealthGuard AI — ICU Diabetes Prediction System

## Table of Contents
- Overview
- Features
- Directory structure
- Technology stack
- Installation
- Usage
- Project architecture
- File details
- Contributing
- License
- Acknowledgments

---

## Overview
HealthGuard AI is a clinical intelligence platform for predicting diabetes risk in ICU patients and for providing patient monitoring visualizations. It pairs a Next.js TypeScript frontend with MATLAB scripts for model development and explainability.

---

## Features
- Diabetes risk prediction using ensemble models and SVM
- Real-time vital-sign monitoring (demo/mock data)
- Interactive dashboard and charts
- Explainability: feature importance and partial dependence plots
- Patient registry and risk gauges

---

## Directory structure (high level)
```
MatHackathon/
├── health-guard-ai/       # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── model/
│   └── public/
├── model/                 # MATLAB model scripts and datasets
└── README.md              # This file
```

---

## Technology stack
- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Visuals: Recharts, react-gauge-chart
- ML / Models: MATLAB (Statistics & Machine Learning Toolbox)
- Dev tools: ESLint, PostCSS, Node.js

---

## Installation

Prerequisites
- Node.js (recommended v20+)
- A package manager: npm, yarn, pnpm, or bun
- MATLAB (for model scripts; R2020b or newer recommended)

Frontend setup
1. Clone the repository using your Git client.
2. Change to the frontend folder: health-guard-ai
3. Install dependencies:
```
npm install
# or use your preferred package manager
```
4. Run the development server:
```
npm run dev
```
5. Open the application in your browser at the address your local dev server reports (usually http://localhost:3000).

Model setup (MATLAB)
1. Open MATLAB and set the working directory to the model folder.
2. Ensure that the dataset file diabetes_15_important_columns.csv is present in the model/datasets folder.
3. Run the preprocessing and training scripts:
```
run('data_prep.m')
run('train_model.m')
run('explainability.m')
```

---

## Usage

Development
```
cd health-guard-ai
npm run dev
```

Production
```
npm run build
npm start
```

Frontend routes (examples)
- Login page
- Dashboard (patient registry and statistics)
- Patient analysis (individual vitals and charts)
- Risk checker (interactive form)

MATLAB scripts
- data_prep.m — data cleaning and preprocessing
- train_model.m — model training (bagged trees, SVM)
- explainability.m — feature importance and PDPs
- dashboard_concept.m — MATLAB GUI prototype (optional)

---

## Project architecture (summary)
- Next.js frontend uses mock data for demos and displays results.
- MATLAB pipeline prepares data, trains models offline, and creates explainability plots.
- Frontend and MATLAB pieces are separate; model outputs can be exported and consumed by the frontend if desired.

---

## File details (high level)
- Frontend:
  - components: StatsGrid, PatientTable, GlucoseChart, RiskGauge
  - lib: mockData (patient generator), utils
- Model:
  - MATLAB scripts and datasets (diabetes_15_important_columns.csv)

---

## Contributing
Suggested workflow:
1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Open a pull request

Coding conventions:
- TypeScript with strict typing
- Functional React components and hooks
- Tailwind CSS utilities for styling
- MATLAB scripts follow standard MATLAB style guidelines

---

## License
This project was created as a hackathon submission. Add a LICENSE file to specify terms when ready.

---

## Acknowledgments
Thanks to contributors, anonymized clinical datasets used for prototyping, and open-source libraries used during development.

---
