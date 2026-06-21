import os
import sys
import base64
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fer.fer import FER

# Add root/ml to sys path so we can import MLPredictor
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from ml.src.predictor import MLPredictor
import backend.version as version

app = FastAPI(
    title=version.APP_NAME,
    version=version.VERSION,
    description="BioSense AI HealthGuard Multimodal API"
)

# Parse allowed origins from environment variables
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

# Configure CORS dynamically
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True if "*" not in allowed_origins else False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances loaded at startup
predictor = None
emotion_detector = None

@app.on_event("startup")
def startup_event():
    global predictor, emotion_detector
    # Initialize ML Predictor (points to the models folder in ml/)
    models_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'models')
    try:
        predictor = MLPredictor(models_dir=models_path)
        print("ML Models loaded successfully.")
    except Exception as e:
        print(f"Error loading ML models: {e}")
        print("Note: Run 'python ml/train.py' to generate model files.")

    # Initialize FER Emotion Detector
    try:
        emotion_detector = FER(mtcnn=False) # mtcnn=False is faster and works well for standard face images
        print("Emotion detector loaded successfully.")
    except Exception as e:
        print(f"Error loading emotion detector: {e}")

# Base router for API version 1
v1_router = APIRouter(prefix="/api/v1")

@v1_router.get("/health")
def health_endpoint():
    """Returns application health diagnostics and model/version metadata."""
    models_loaded = predictor is not None
    detector_loaded = emotion_detector is not None
    
    return {
        "status": "healthy" if models_loaded else "degraded",
        "app_name": version.APP_NAME,
        "version": version.VERSION,
        "model_version": version.MODEL_VERSION,
        "build_date": version.BUILD_DATE,
        "diagnostics": {
            "ml_models_loaded": models_loaded,
            "emotion_detector_loaded": detector_loaded
        }
    }

class VitalsPayload(BaseModel):
    age: float = 45.0
    sex: str = "Male"
    bmi: float = 24.5
    glucose_random: float = 95.0
    sbp_mean: float = 120.0
    dbp_mean: float = 80.0
    hr_mean: float = 72.0
    spo2_mean: float = 98.0
    temp_mean: float = 36.6
    insulin_avg: float = 0.0
    history_htn: bool = False
    hypoglycemia: bool = False
    hyperglycemia: bool = False

@v1_router.post("/predict")
def predict_endpoint(payload: VitalsPayload):
    """Predicts diabetes risk probability, classification, and contributions."""
    if predictor is None:
        raise HTTPException(status_code=503, detail="ML Predictor models not initialized.")
    try:
        vitals_dict = payload.dict()
        result = predictor.predict_vitals(vitals_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ImagePayload(BaseModel):
    image: str # Base64 data url string

def analyze_emotion_from_frame(frame) -> tuple:
    """Helper to detect emotion from cv2 frame."""
    if emotion_detector is None:
        return "neutral", 0.8
        
    try:
        emotions = emotion_detector.detect_emotions(frame)
        if emotions:
            emotion_data = emotions[0]["emotions"]
            best_emotion = max(emotion_data, key=emotion_data.get)
            confidence = float(emotion_data[best_emotion])
            return best_emotion, confidence
    except Exception as e:
        print(f"Emotion detection internal error: {e}")
        
    return "neutral", 0.0

def map_emotion_to_clinical(emotion: str) -> str:
    """Maps raw emotions to professional clinical labels."""
    mapping = {
        'happy': '😊 Stable Psychological State',
        'neutral': '😐 Baseline Emotional State',
        'surprise': '😐 Baseline Emotional State',
        'sad': '😢 Mild Depressive Indicators',
        'angry': '😫 Elevated Stress Response',
        'fear': '😰 High Stress Indicators',
        'disgust': '😫 Elevated Stress Response',
        'scared': '😰 High Stress Indicators'
    }
    return mapping.get(emotion, '😐 Baseline Emotional State')

@v1_router.post("/emotion/frame")
def predict_frame_endpoint(payload: ImagePayload):
    """Legacy compatibility endpoint for base64 webcam frames."""
    try:
        data = payload.image
        img_bytes = base64.b64decode(data.split(",")[1])
        nparr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        emotion, confidence = analyze_emotion_from_frame(frame)
        
        return {
            "emotion": map_emotion_to_clinical(emotion),
            "confidence": round(confidence * 100, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v1_router.post("/emotion")
async def predict_emotion_file(image: UploadFile = File(...)):
    """Standard endpoint for form-uploaded image files."""
    try:
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        emotion, confidence = analyze_emotion_from_frame(frame)
        
        return {
            "emotion": map_emotion_to_clinical(emotion),
            "confidence": round(confidence * 100, 2)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v1_router.post("/fusion")
async def analyze_patient_endpoint(
    image: UploadFile = File(None),
    vitals: str = None
):
    """
    Unified Multimodal Clinical Fusion Endpoint.
    Combines physical vitals metrics with webcam-derived emotional metrics.
    """
    if predictor is None:
        raise HTTPException(status_code=503, detail="ML Predictor models not initialized.")
        
    try:
        # 1. Parse vitals
        import json
        vitals_dict = json.loads(vitals) if vitals else {}
        
        # 2. Run physiological ML models
        ml_result = predictor.predict_vitals(vitals_dict)
        risk = ml_result['risk'] # "Stable 🟢", "At Risk 🟡", "High Risk 🔴"
        prob = ml_result['risk_probability']
        trajectory = ml_result['trajectory']
        
        # 3. Run psychological model (emotion recognition)
        emotion = "neutral"
        confidence = 0.0
        if image:
            contents = await image.read()
            nparr = np.frombuffer(contents, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            emotion, confidence = analyze_emotion_from_frame(frame)
            
        clinical_emotion = map_emotion_to_clinical(emotion)
        
        # 4. Clinical Fusion Engine
        insight = "Vitals reflect a stable physical and emotional baseline."
        
        is_high = "High Risk" in risk
        is_at_risk = "At Risk" in risk
        is_stable = "Stable" in risk
        is_stressed = emotion in ['sad', 'angry', 'fear', 'disgust', 'scared']
        
        if is_high and is_stressed:
            insight = "High diabetes risk compounded by elevated stress or depressive markers. Immediate clinical consultation and diagnostic checks are advised."
        elif is_high and not is_stressed:
            insight = "High diabetes risk detected, though emotional state remains stable. Prioritize metabolic management and blood glucose checks."
        elif is_at_risk and is_stressed:
            insight = "At-risk metabolic condition noted with negative emotional affect. Routine monitoring, lifestyle adjustments, and stress interventions recommended."
        elif is_at_risk and not is_stressed:
            insight = "At-risk metabolic indicators. Focus on diet improvements, exercise, and check-ups."
        elif is_stable and is_stressed:
            insight = "Stable metabolic profile but elevated stress limits holistic wellness. Mindfulness and anxiety management recommended."
        elif is_stable and not is_stressed:
            insight = "Stable metabolic profile with no significant psychological stress. Maintain current healthy routine."
            
        return {
            "diabetesPrediction": risk,
            "riskProbability": prob,
            "emotionResult": clinical_emotion,
            "confidence": round(confidence * 100),
            "insight": insight,
            "trajectory": trajectory,
            "top_features": ml_result['top_features']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include API Router under the version prefix
app.include_router(v1_router)

@app.get("/")
def home():
    return {
        "message": f"Welcome to {version.APP_NAME} API. Please navigate to /docs for Swagger documentation.",
        "health": "/api/v1/health"
    }
