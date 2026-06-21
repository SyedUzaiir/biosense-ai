import os
import argparse
import json

# Set import paths since it is in ml/ folder
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.predictor import MLPredictor

def main():
    # Configure stdout to support UTF-8 emojis on Windows console
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
        
    parser = argparse.ArgumentParser(description="Predict patient diabetes risk probability and glucose trajectory.")
    parser.add_argument('--age', type=float, default=45.0, help="Patient age")
    parser.add_argument('--sex', type=str, default='Male', choices=['Male', 'Female'], help="Patient biological sex")
    parser.add_argument('--bmi', type=float, default=24.5, help="Patient BMI")
    parser.add_argument('--glucose', type=float, default=95.0, help="Random/mean glucose level")
    parser.add_argument('--sbp', type=float, default=120.0, help="Systolic Blood Pressure")
    parser.add_argument('--dbp', type=float, default=80.0, help="Diastolic Blood Pressure")
    
    args = parser.parse_args()
    
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    
    print("Loading MLPredictor service...")
    predictor = MLPredictor(models_dir=models_dir)
    
    patient_vitals = {
        'age': args.age,
        'sex': args.sex,
        'bmi': args.bmi,
        'glucose_random': args.glucose,
        'sbp_mean': args.sbp,
        'dbp_mean': args.dbp
    }
    
    print("\nRunning Inference...")
    result = predictor.predict_vitals(patient_vitals)
    
    print("\nResults:")
    print("====================================================")
    print(f"Diabetes Risk Probability: {result['risk_probability'] * 100:.1f}%")
    print(f"Classification Label:      {result['risk']}")
    print(f"Top 3 Risk Contributors:   {', '.join(result['top_features'])}")
    print(f"Simulated 24h Trajectory (first 6 hours): {result['trajectory'][:6]}...")
    print("====================================================")

if __name__ == '__main__':
    main()
