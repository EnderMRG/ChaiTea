import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("Testing different model names...")

model_names = [
    "models/gemini-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-flash",
]

for model_name in model_names:
    try:
        print(f"Testing: {model_name}")
        model = genai.GenerativeModel(model_name)
        
        # Test with a simple prompt
        prompt = "Say 'Hello' if you can read this."
        
        response = model.generate_content(prompt)
        
        print(f"SUCCESS: {model_name} works!")
        print(f"Response: {response.text[:50]}...")
        print("")
        
    except Exception as e:
        print(f"FAILED: {model_name}")
        print(f"Error: {str(e)[:100]}")
        print("")
