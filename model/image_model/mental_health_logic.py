def predict_condition(emotion_percentages):

    sad = emotion_percentages.get("sad", 0)
    angry = emotion_percentages.get("angry", 0)
    fear = emotion_percentages.get("fear", 0)
    happy = emotion_percentages.get("happy", 0)
    neutral = emotion_percentages.get("neutral", 0)

    if sad > 40 and happy < 10:
        return "High risk of Depression"

    elif fear > 30 or angry > 30:
        return "Possible Anxiety or Stress Disorder"

    elif angry > 25 and sad > 25:
        return "Emotional Distress Detected"

    elif neutral > 70:
        return "Emotionally Stable"

    elif happy > 40:
        return "Positive Mental State"

    else:
        return "Mild Emotional Imbalance"
