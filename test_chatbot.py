"""
Quick test script for the chatbot endpoint
Run this to verify the backend integration works
"""

import requests
import json

# Test 1: Simple question
print("=" * 60)
print("TEST 1: Simple Data Query")
print("=" * 60)

response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "message": "What is my current soil moisture?",
        "history": []
    }
)

if response.status_code == 200:
    data = response.json()
    print(f"✅ Status: {response.status_code}")
    print(f"📝 Response: {data['response']}")
    print(f"🔍 Source: {data['source']}")
    if data['suggested_actions']:
        print(f"💡 Suggested Actions:")
        for action in data['suggested_actions']:
            print(f"   - {action}")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

print("\n")

# Test 2: Market data
print("=" * 60)
print("TEST 2: Market Data Query")
print("=" * 60)

response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "message": "What are the current tea prices?",
        "history": []
    }
)

if response.status_code == 200:
    data = response.json()
    print(f"✅ Status: {response.status_code}")
    print(f"📝 Response: {data['response']}")
    print(f"🔍 Source: {data['source']}")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

print("\n")

# Test 3: Farm health
print("=" * 60)
print("TEST 3: Farm Health Query")
print("=" * 60)

response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "message": "How is my farm health?",
        "history": []
    }
)

if response.status_code == 200:
    data = response.json()
    print(f"✅ Status: {response.status_code}")
    print(f"📝 Response: {data['response']}")
    print(f"🔍 Source: {data['source']}")
    if data['suggested_actions']:
        print(f"💡 Suggested Actions:")
        for action in data['suggested_actions']:
            print(f"   - {action}")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

print("\n")

# Test 4: Hindi query (multi-lingual)
print("=" * 60)
print("TEST 4: Multi-Lingual Support (Hindi)")
print("=" * 60)

response = requests.post(
    "http://localhost:8000/api/chat",
    json={
        "message": "मेरी मिट्टी की नमी कितनी है?",
        "history": []
    }
)

if response.status_code == 200:
    data = response.json()
    print(f"✅ Status: {response.status_code}")
    print(f"📝 Response: {data['response']}")
    print(f"🔍 Source: {data['source']}")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

print("\n")
print("=" * 60)
print("All tests completed!")
print("=" * 60)
