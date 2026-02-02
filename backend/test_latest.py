import requests
import json

# Test the cultivation/latest endpoint (requires auth)
url = "http://localhost:8000/api/cultivation/latest"

print("Testing /api/cultivation/latest endpoint...")
print("Note: This endpoint requires authentication\n")
print("="*50 + "\n")

try:
    # Try without auth first to see the error
    response = requests.get(url)
    
    print(f"Status code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print("\nResponse:")
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
    else:
        print(f"\nError response:")
        print(response.text)
        print("\nThis is expected if authentication is required.")
        
except Exception as e:
    print(f"Error: {e}")
