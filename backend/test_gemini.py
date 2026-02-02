import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

try:
    model = genai.GenerativeModel("models/gemini-flash-latest")
    
    # Test with a simple prompt
    prompt = """
You are an AI agronomist specialized in Assam tea cultivation.

Given the following field analysis data, generate 3–5 concise, actionable recommendations.

Rules:
- Practical, field-level advice
- Explain WHY each recommendation is needed
- Use bullet points
- No emojis

Field Data:
{'health_score': 75, 'pest_risk': 'Low', 'drought_risk': 'Medium', 'soil_moisture': 45, 'temperature': 22, 'humidity': 70, 'rainfall_7d': 30}
"""
    
    response = model.generate_content(prompt)
    
    print("✅ Gemini API is working!")
    print("\nResponse:")
    print(response.text)
    
except Exception as e:
    print(f"❌ Error: {e}")
    print(f"Error type: {type(e).__name__}")
