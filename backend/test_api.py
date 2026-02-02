import requests
import json

# Test the cultivation endpoint
url = "http://localhost:8000/api/cultivation"

data = {
    "soil_moisture": 45,
    "temperature": 22,
    "humidity": 70,
    "rainfall_last_24h": 5,
    "rainfall_7d": 30,
    "soil_ph": 5.2
}

print("Testing /api/cultivation endpoint...")
print("Request data:", json.dumps(data, indent=2))
print("\n" + "="*50 + "\n")

try:
    response = requests.post(url, json=data)
    
    print(f"Status code: {response.status_code}")
    print("\nResponse:")
    result = response.json()
    print(json.dumps(result, indent=2))
    
    print("\n" + "="*50 + "\n")
    
    if "ai_recommendations" in result:
        print("AI Recommendations found!")
        print(f"Number of recommendations: {len(result['ai_recommendations'])}")
        print("\nRecommendations:")
        for i, rec in enumerate(result['ai_recommendations'], 1):
            print(f"{i}. {rec}")
    else:
        print("WARNING: No ai_recommendations in response!")
        print("Available keys:", list(result.keys()))
        
except Exception as e:
    print(f"Error: {e}")
