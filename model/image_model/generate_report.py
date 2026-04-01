import pandas as pd
from health_logic import analyze_mental_health

def generate_report():
    try:
        analysis = analyze_mental_health()

        report = {
            "Sad %": analysis["Sad %"],
            "Happy %": analysis["Happy %"],
            "Fear %": analysis["Fear %"],
            "Angry %": analysis["Angry %"],
            "Neutral %": analysis["Neutral %"],
            "Predicted Condition": analysis["Predicted Condition"]
        }

        text_report = f"""
----- MENTAL HEALTH ANALYSIS REPORT -----

Emotion Percentages:
Sad: {analysis["Sad %"]}%
Happy: {analysis["Happy %"]}%
Fear: {analysis["Fear %"]}%
Angry: {analysis["Angry %"]}%
Neutral: {analysis["Neutral %"]}%

AI Predicted Mental Health Condition:

>>> {analysis["Predicted Condition"]}

NOTE:
This is AI-based prediction and not a medical diagnosis.
"""

        with open("mental_health_report.txt", "w") as f:
            f.write(text_report)

        print("Mental Health Report Generated!")
        print(text_report)

        return report

    except Exception as e:
        return {"error": str(e)}
