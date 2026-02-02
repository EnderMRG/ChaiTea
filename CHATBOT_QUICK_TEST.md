# Enhanced Chatbot - Quick Test Guide

## What Changed

### Backend (`main.py`)
✅ **Comprehensive Context Gathering** - Now fetches data from ALL endpoints:
- Current sensor readings (soil moisture, temp, humidity, rainfall, pH)
- Farm averages (last 50 readings)
- Soil moisture trends (last 24 readings)
- Cultivation health analysis (health score, pest/drought risk, status explanations)
- Smart alerts (alert status, risk scores, stress breakdown)
- Market intelligence (current/previous prices, trends, demand index, volatility, price history, all market locations)
- Leaf quality scans (latest + last 3 scans for trend)
- Daily metrics (last 7 days breakdown)

✅ **Enhanced AI Response Generation**:
- Builds comprehensive context summary with ALL data
- Better multi-lingual support with explicit language detection
- Instructs AI to ALWAYS use actual data values
- Provides examples of data-driven responses

✅ **Multi-Lingual Support Fixed**:
- Detects Hindi (Devanagari script keywords)
- Detects Assamese (Bengali script keywords)
- Explicitly instructs AI to respond in the detected language

## Quick Tests

### Test 1: Data-Driven Response (Soil Moisture)
**Ask:** "What is my current soil moisture?"

**Expected:** Bot should respond with EXACT value from sensors, e.g.:
> "Your current soil moisture is 58.3%, which is within the optimal range of 55-65%."

---

### Test 2: Market Data
**Ask:** "What are tea prices today?"

**Expected:** Bot should mention:
- Current Guwahati price (₹XXX/kg)
- Price trend (increasing/decreasing by X%)
- Possibly other market locations

---

### Test 3: Farm Health Status
**Ask:** "How is my farm health?"

**Expected:** Bot should mention:
- Health score (X/100)
- Pest risk level
- Drought risk level
- Specific recommendations based on scores

---

### Test 4: Leaf Quality
**Ask:** "What was my last leaf scan result?"

**Expected:** Bot should mention:
- Grade (Healthy/Diseased/Stressed)
- Disease type if detected
- Severity level
- Confidence score

---

### Test 5: Trends and Averages
**Ask:** "Is my soil moisture increasing or decreasing?"

**Expected:** Bot should reference:
- Current vs previous value
- Trend direction
- Change amount

---

### Test 6: Multi-Lingual (Hindi)
**Ask:** "मेरी मिट्टी की नमी कितनी है?"

**Expected:** Bot should respond ENTIRELY in Hindi with actual data:
> "आपकी वर्तमान मिट्टी की नमी 58.3% है, जो इष्टतम सीमा 55-65% के भीतर है।"

---

### Test 7: All Market Locations
**Ask:** "Show me tea prices in all markets"

**Expected:** Bot should list prices from:
- Guwahati
- Kolkata
- Siliguri
- Jalpaiguri
- Cochin
- Coonoor
- Coimbatore
- Tea Serve

---

### Test 8: Daily Trends
**Ask:** "How has my temperature been this week?"

**Expected:** Bot should reference daily metrics showing temperature for recent days

---

## Verification Checklist

✅ Bot uses ACTUAL data values (not generic responses)
✅ Bot quotes specific numbers from dashboard
✅ Bot references trends and changes
✅ Multi-lingual responses work (Hindi/Assamese)
✅ Suggested actions appear when relevant
✅ Fallback still works if AI fails
✅ Client-side fallback works if backend is down

## Common Issues & Solutions

### Issue: Bot gives generic responses
**Solution:** Check backend logs - context gathering might be failing. Ensure IoT simulator is running.

### Issue: Multi-lingual not working
**Solution:** Verify you're using Hindi/Assamese keywords. The AI needs to detect the language from your input.

### Issue: No market data
**Solution:** Ensure `teadata.xlsx` is in backend directory and has recent data.

### Issue: No sensor data
**Solution:** Run IoT simulator:
```bash
cd mock-iot
python iot_simulator.py
```

## Testing the Backend Directly

You can test the endpoint directly with curl:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is my soil moisture?",
    "history": []
  }'
```

Expected response structure:
```json
{
  "response": "Your current soil moisture is 58.3%...",
  "source": "AI",
  "suggested_actions": ["Check irrigation schedule", "Monitor for next 24 hours"]
}
```

## Next Steps

1. Test all scenarios above
2. Check backend terminal for context gathering logs
3. Verify AI is using actual data values
4. Test multi-lingual support thoroughly
5. Report any issues or unexpected behavior
