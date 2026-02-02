# Gemini Chatbot Integration - Verification Guide

## Overview
This document provides step-by-step instructions to verify the Gemini AI chatbot integration with robust fallback mechanisms.

## Implementation Summary

### Backend Changes (`backend/main.py`)
✅ **Added Pydantic Models:**
- `ChatMessage(role, content)` - Individual chat message
- `ChatRequest(message, history)` - Request payload
- `ChatResponse(response, source, suggested_actions)` - Response payload

✅ **Added Helper Functions:**
- `gather_comprehensive_context()` - Gathers data from:
  - Latest Sensor Data (Firestore)
  - Cultivation Engine Results (Health Score, Pest/Drought Risk)
  - Market Data (Latest prices, trends from teadata.xlsx)
  - Leaf Scan History (Latest scan results)
  
- `get_fallback_response(message)` - Rule-based responses for:
  - Leaf quality improvement
  - Irrigation scheduling
  - Market prices
  - Pest/disease prevention
  - Fertilizer recommendations
  - Harvest timing
  - Soil moisture, temperature, humidity
  - Multi-language support (Hindi/Assamese detection)

- `generate_chat_response(message, history, context)` - AI response generation:
  - Uses Gemini 1.5 Flash model
  - Includes comprehensive system prompt for tea agronomist role
  - Detects user language and responds in same language
  - Extracts suggested actions from response
  - Returns (response_text, suggested_actions)

✅ **Added Endpoint:**
- `POST /api/chat` - Main chatbot endpoint
  - Gathers farm context
  - Attempts AI response via Gemini
  - Falls back to rule-based if AI fails
  - Returns response with source indicator

### Frontend Changes (`chatbot-bubble.tsx`)
✅ **Updated `handleSendMessage`:**
- Calls backend API with full chat history
- Handles suggested actions and displays them
- Implements client-side fallback if network fails
- Maintains existing UI/UX

✅ **Client-Side Fallback:**
- Keeps `generateBotResponse()` function intact
- Activates when fetch() throws error
- Ensures chatbot always responds

## Verification Plan

### Test 1: AI Response with Context
**Objective:** Verify AI provides context-aware responses using real farm data

**Steps:**
1. Start backend: `cd backend && uvicorn main:app --reload`
2. Start frontend: `cd frontend && npm run dev`
3. Open chatbot in browser (http://localhost:3000)
4. Ask: "How is my soil moisture?"

**Expected Result:**
- Bot responds with current soil moisture data from Firestore
- Response mentions actual percentage (e.g., "Your current soil moisture is 58%")
- Source should be "AI"
- May include suggested actions if moisture is suboptimal

---

### Test 2: AI Response with Cultivation Health
**Objective:** Verify AI integrates cultivation engine results

**Steps:**
1. Ensure backend and frontend are running
2. Ask: "What is my farm's health status?"

**Expected Result:**
- Bot mentions health score (0-100)
- References pest risk and drought risk levels
- Provides actionable recommendations based on current conditions
- Source: "AI"

---

### Test 3: AI Response with Market Data
**Objective:** Verify AI uses market intelligence

**Steps:**
1. Ask: "What are the current tea prices?"

**Expected Result:**
- Bot mentions current Guwahati market price
- May reference price trend (increasing/decreasing)
- Suggests optimal selling strategy if applicable
- Source: "AI"

---

### Test 4: Backend Fallback (AI Failure)
**Objective:** Verify backend falls back to rule-based when Gemini fails

**Steps:**
1. Stop the backend (Ctrl+C)
2. Open `backend/.env`
3. Temporarily rename `GEMINI_API_KEY` to `GEMINI_API_KEY_DISABLED`
4. Restart backend: `uvicorn main:app --reload`
5. Ask: "What is the irrigation schedule?"

**Expected Result:**
- Bot still responds (doesn't crash)
- Response is from rule-based system: "For tea plants, irrigation depends on season and soil type..."
- Source should be "Fallback"
- No suggested actions

**Cleanup:**
- Restore `GEMINI_API_KEY` in `.env`
- Restart backend

---

### Test 5: Frontend Fallback (Network Failure)
**Objective:** Verify frontend handles backend unavailability

**Steps:**
1. Stop the backend server (Ctrl+C)
2. Keep frontend running
3. Ask: "Tell me about leaf quality"

**Expected Result:**
- Bot still responds using client-side logic
- Response: "To improve leaf quality, ensure consistent soil moisture..."
- Console shows error: "❌ Chat API error, using client-side fallback"
- No crash or loading state stuck

**Cleanup:**
- Restart backend

---

### Test 6: Suggested Actions
**Objective:** Verify suggested actions are extracted and displayed

**Steps:**
1. Ensure both servers are running
2. Ask: "My leaves look yellowish, what should I do?"

**Expected Result:**
- Bot provides diagnosis
- Separate message appears: "💡 Suggested Actions:"
- Lists 1-3 numbered action items
- Actions are specific and actionable

---

### Test 7: Multi-Language Support
**Objective:** Verify language detection and response

**Steps:**
1. Ask in Hindi: "मेरी मिट्टी की नमी कैसी है?"

**Expected Result:**
- Bot responds in Hindi
- Provides relevant information or asks to use English
- Gracefully handles non-English input

---

### Test 8: Chat History Context
**Objective:** Verify AI maintains conversation context

**Steps:**
1. Ask: "What is my soil moisture?"
2. Wait for response
3. Ask: "Is that good or bad?"

**Expected Result:**
- Second response references the previous answer
- AI understands "that" refers to soil moisture value
- Provides contextual advice

---

### Test 9: Leaf Scan Integration
**Objective:** Verify AI references latest leaf scan results

**Steps:**
1. Upload a leaf image via Leaf Quality Scanner
2. Wait for scan to complete
3. Ask chatbot: "What was my last leaf scan result?"

**Expected Result:**
- Bot mentions the grade (Healthy/Diseased/Stressed)
- References disease type if detected
- Mentions severity level
- May suggest follow-up actions

---

### Test 10: Error Recovery
**Objective:** Verify system handles errors gracefully

**Steps:**
1. Ask: "alksjdflaksjdf" (gibberish)
2. Ask: "" (empty - should be blocked)
3. Ask very long question (500+ characters)

**Expected Result:**
- Gibberish gets a polite default response
- Empty message doesn't send (button disabled)
- Long questions are handled without crash

---

## Success Criteria

✅ **AI Integration:**
- [ ] Chatbot calls `/api/chat` endpoint
- [ ] Real farm data is included in responses
- [ ] Responses are contextually relevant
- [ ] Source is correctly labeled ("AI" or "Fallback")

✅ **Backend Fallback:**
- [ ] Rule-based responses work when AI fails
- [ ] No crashes when Gemini API is unavailable
- [ ] Fallback responses are helpful and accurate

✅ **Frontend Fallback:**
- [ ] Client-side responses work when backend is down
- [ ] No infinite loading states
- [ ] Error is logged to console

✅ **Suggested Actions:**
- [ ] Actions are extracted from AI response
- [ ] Displayed as separate message
- [ ] Formatted as numbered list

✅ **User Experience:**
- [ ] Chat history is maintained
- [ ] Responses are fast (< 3 seconds)
- [ ] UI remains responsive during API calls
- [ ] No visual glitches

---

## Troubleshooting

### Issue: "GEMINI_API_KEY not found"
**Solution:** Check `backend/.env` file exists and contains valid API key

### Issue: "CORS error in browser console"
**Solution:** Verify backend CORS allows `http://localhost:3000`

### Issue: "No sensor data found"
**Solution:** Run mock IoT simulator to populate Firestore:
```bash
cd mock-iot
python iot_simulator.py
```

### Issue: "Firestore permission denied"
**Solution:** Verify `serviceAccountKey.json` is in backend directory with correct permissions

### Issue: Chatbot always uses fallback
**Solution:** 
1. Check backend logs for Gemini API errors
2. Verify API key is valid
3. Check internet connection
4. Verify Gemini API quota not exceeded

---

## Performance Notes

- **AI Response Time:** Typically 1-3 seconds
- **Fallback Response Time:** < 100ms
- **Context Gathering:** < 500ms (depends on Firestore)
- **Chat History:** Last 6 messages sent to AI for context

---

## Next Steps

After verification:
1. Monitor backend logs for errors
2. Collect user feedback on response quality
3. Fine-tune system prompt based on common questions
4. Add more fallback rules for edge cases
5. Consider caching context for faster responses
6. Implement rate limiting to prevent API quota exhaustion
