import pandas as pd
from collections import Counter

def analyze_mental_health(csv_file="emotions_log.csv"):

    data = pd.read_csv(csv_file)

    emotions = data["emotion"].tolist()

    count = Counter(emotions)

    total = sum(count.values())

    sad = count.get("sad", 0) / total
    happy = count.get("happy", 0) / total
    fear = count.get("fear", 0) / total
    angry = count.get("angry", 0) / total
    neutral = count.get("neutral", 0) / total

    # ---- RULE BASED DISEASE PREDICTION ----

    if sad > 0.45 and happy < 0.15:
        condition = "Possible Depression"

    elif fear > 0.35 and sad > 0.2:
        condition = "Possible Anxiety"

    elif angry > 0.3 and fear > 0.2:
        condition = "High Stress Levels"

    elif neutral > 0.5 and happy > 0.2:
        condition = "Mentally Stable"

    else:
        condition = "Mild Emotional Imbalance"

    result = {
        "Sad %": round(sad * 100, 2),
        "Happy %": round(happy * 100, 2),
        "Fear %": round(fear * 100, 2),
        "Angry %": round(angry * 100, 2),
        "Neutral %": round(neutral * 100, 2),
        "Predicted Condition": condition
    }

    return result
