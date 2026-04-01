import pandas as pd
import matplotlib.pyplot as plt
from collections import Counter

def generate_graphs():
    data = pd.read_csv("emotions_log.csv")

    print("Columns in CSV:", data.columns)

    emotion_counts = Counter(data["emotion"])

    # Pie Chart
    plt.figure()
    plt.pie(emotion_counts.values(), labels=emotion_counts.keys(), autopct="%1.1f%%")
    plt.title("Emotion Distribution")
    plt.savefig("emotion_pie_chart.png")
    plt.close()

    # Bar Chart
    plt.figure()
    plt.bar(emotion_counts.keys(), emotion_counts.values())
    plt.title("Emotion Bar Chart")
    plt.xlabel("Emotions")
    plt.ylabel("Count")
    plt.savefig("emotion_bar_chart.png")
    plt.close()

    # Trend Graph
    plt.figure()
    plt.plot(data["emotion"])
    plt.title("Emotion Trend Over Time")
    plt.savefig("emotion_trend.png")
    plt.close()

    print("Graphs generated successfully!")
