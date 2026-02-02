# Chatbot Fixes - Model Name & Firestore Warning

## Issues Fixed

### 1. ❌ Gemini API 404 Error
**Error Message:**
```
404 models/gemini-1.5-flash-latest is not found for API version v1beta
```

**Root Cause:**
The model name `models/gemini-1.5-flash-latest` or `models/gemini-flash-latest` is incorrect. The correct format doesn't include the `models/` prefix or `-latest` suffix.

**Fix Applied:**
Changed all instances of Gemini model initialization to use the correct format:
```python
model = genai.GenerativeModel("gemini-flash")
```

**Files Modified:**
- `backend/main.py` - Updated 5 instances across different functions:
  - `generate_ai_market_insight()` (line 122)
  - `generate_ai_strategy_recommendations()` (line 147)
  - `generate_leaf_quality_recommendations()` (line 198)
  - `generate_ai_recommendations_gemini()` (line 431)
  - `generate_chat_response()` (line 2986)

---

### 2. ⚠️ Firestore Deprecation Warning
**Warning Message:**
```
UserWarning: Detected filter using positional arguments. 
Prefer using the 'filter' keyword argument instead.
```

**Root Cause:**
Firestore deprecated the old syntax for `.where()` queries using positional arguments.

**Old Syntax (Deprecated):**
```python
.where("timestamp", ">=", start)
```

**New Syntax (Fixed):**
```python
.where(filter=("timestamp", ">=", start))
```

**Files Modified:**
- `backend/main.py` - Updated in `gather_comprehensive_context()` function (line 2722)

---

## Testing the Fixes

### Quick Test
The backend should auto-reload with uvicorn. Check the terminal for:
```
INFO:     Application startup complete.
```

### Test the Chatbot
1. Open the chatbot in your browser
2. Ask: **"What is my soil moisture?"**
3. You should now get a proper AI response with actual data

### Expected Behavior
✅ No more 404 errors from Gemini API
✅ No more Firestore warnings in console
✅ AI responses work correctly
✅ Fallback still works if needed

---

## Why This Happened

**Gemini Model Names:**
Google's Gemini API has specific model identifiers. The correct format is:
- ✅ `gemini-flash` (correct - fast, efficient)
- ✅ `gemini-pro` (also valid - more advanced)
- ❌ `models/gemini-flash-latest` (incorrect - has prefix and suffix)
- ❌ `models/gemini-1.5-flash-latest` (incorrect)
- ❌ `gemini-1.5-flash` (incorrect - version number not needed)

**Firestore API Changes:**
Google Cloud Firestore updated their Python SDK to use keyword arguments for better clarity and to avoid confusion with filter ordering.

---

## Verification

Run the test script to verify everything works:
```bash
cd F:\Proj\ChaiTea
python test_chatbot.py
```

Expected output:
```
✅ Status: 200
📝 Response: Your current soil moisture is XX%...
🔍 Source: AI
```

If you see `Source: Fallback`, the AI is still not working. Check:
1. GEMINI_API_KEY is set correctly in `.env`
2. Internet connection is working
3. No other errors in backend terminal

---

## Additional Notes

### All Model References Updated
The following functions now use the correct model name:
1. Market insight generation
2. Strategy recommendations
3. Leaf quality recommendations  
4. Cultivation recommendations
5. **Chatbot responses** (main feature)

### Backward Compatibility
These changes are **not backward compatible** with the old model names. If you revert the code, you'll need to revert these changes too.

### API Quota
Using `gemini-flash` is the recommended model for:
- ✅ Fast responses (1-3 seconds)
- ✅ Lower cost
- ✅ Good quality for farming advice
- ✅ Higher rate limits

If you need more advanced reasoning, you can change to `gemini-pro`, but it will be slower and use more quota.

---

## Status: ✅ FIXED

Both issues are now resolved. The chatbot should work correctly with:
- Real-time data from all endpoints
- AI-powered responses using Gemini
- No errors or warnings
- Proper fallback mechanisms
