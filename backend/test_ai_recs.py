import os
from dotenv import load_dotenv
import google.generativeai as genai
import json

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Simulate the exact function from the backend
def generate_ai_recommendations_gemini(context: dict):
    prompt = f"""
You are an AI agronomist specialized in Assam tea cultivation.

Given the following field analysis data, generate 3–5 concise, actionable recommendations.

Rules:
- Practical, field-level advice
- Explain WHY each recommendation is needed
- Use bullet points
- No emojis

Field Data:
{context}
"""

    try:
        model = genai.GenerativeModel("models/gemini-flash-latest")
        response = model.generate_content(prompt)

        if not response or not response.text:
            return ["AI recommendations unavailable at the moment."]

        text = response.text.strip()

        recommendations = []
        for line in text.split("\n"):
            line = line.strip()
            if not line:
                continue

            if (
                line.startswith(("-", "•", "*")) or
                line[0].isdigit()
            ):
                recommendations.append(
                    line.lstrip("-•*0123456789. ").strip()
                )

        return recommendations or [
            "Field conditions are stable. Continue routine monitoring."
        ]

    except Exception as e:
        print(f"GEMINI ERROR: {e}")
        return ["AI recommendation service unavailable."]

# Test with sample data
context = {
    "health_score": 75,
    "pest_risk": "Low",
    "drought_risk": "Medium",
    "soil_moisture": 45,
    "temperature": 22,
    "humidity": 70,
    "rainfall_7d": 30,
    "score_explanation": {
        "soil_moisture": "Suboptimal",
        "temperature": "Optimal",
        "humidity": "Optimal",
        "rainfall_7d": "Suboptimal"
    }
}

print("Testing AI recommendations generation...")
print("Context:", json.dumps(context, indent=2))
print("\n" + "="*50 + "\n")

recommendations = generate_ai_recommendations_gemini(context)

print("Generated recommendations:")
print(json.dumps(recommendations, indent=2))
print("\n" + "="*50 + "\n")
print(f"Number of recommendations: {len(recommendations)}")
