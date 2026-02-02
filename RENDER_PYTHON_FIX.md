# 🔧 Render Deployment - Python Version Fix

## Problem

You're getting this error during Render deployment:

```
pip._vendor.pyproject_hooks._impl.BackendUnavailable: Cannot import 'setuptools.build_meta'
==> Build failed 😞
```

## Root Cause

**Render is using Python 3.13 by default**, but your dependencies (numpy, torch, scipy, opencv, etc.) are not yet compatible with Python 3.13. These packages need Python 3.10 or 3.11.

## ✅ Solution Applied

I've made two changes to fix this:

### 1. Created `backend/runtime.txt`

This file tells Render exactly which Python version to use:

```
python-3.10.14
```

### 2. Updated `render.yaml`

Changed the Python version environment variable from `3.10.0` to `3.10.14`.

## 🚀 Next Steps

### Step 1: Commit and Push These Changes

```bash
cd f:\Proj\ChaiTea

# Check what changed
git status

# Add the new files
git add backend/runtime.txt
git add render.yaml

# Commit
git commit -m "Fix: Force Python 3.10.14 for Render deployment"

# Push to GitHub
git push origin main
```

### Step 2: Redeploy on Render

**Option A: Automatic (if auto-deploy is enabled)**
- Render will automatically detect the push and redeploy
- Wait 5-10 minutes
- Check the logs

**Option B: Manual**
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click on your `chaitea-backend` service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Watch the logs

### Step 3: Verify the Fix

In the Render build logs, you should now see:

```
==> Using Python version 3.10.14 (from runtime.txt)
```

Instead of:

```
==> Using Python version 3.13.x (default)
```

## 📊 What to Watch For

### ✅ Success Indicators:

```
==> Using Python version 3.10.14
==> Installing dependencies from requirements.txt
Successfully installed fastapi-0.104.1 uvicorn-0.24.0 ...
==> Build successful!
==> Starting service with 'uvicorn main:app --host 0.0.0.0 --port $PORT'
```

### ❌ If It Still Fails:

Check the logs for:

1. **Wrong Python version?**
   - Look for: `Using Python version X.X.X`
   - Should be: `3.10.14`

2. **Missing dependencies?**
   - Error: `ModuleNotFoundError: No module named 'X'`
   - Solution: Add to `requirements.txt`

3. **Model files too large?**
   - Error: `File size exceeds limit`
   - Solution: Use Git LFS or external storage

4. **Memory issues during build?**
   - Error: `Killed` or `Out of memory`
   - Solution: Reduce dependencies or upgrade to paid tier

## 🔍 Alternative: If runtime.txt Doesn't Work

If Render still uses the wrong Python version, you can also:

### Option 1: Set in Render Dashboard

1. Go to your service → **Environment**
2. Ensure `PYTHON_VERSION` is set to `3.10.14`
3. Click **"Save Changes"**

### Option 2: Use a Build Script

Create `backend/build.sh`:

```bash
#!/bin/bash
# Force Python 3.10
python3.10 -m pip install --upgrade pip
python3.10 -m pip install -r requirements.txt
```

Then update your Render build command to:

```bash
chmod +x build.sh && ./build.sh
```

## 📋 Compatibility Matrix

| Python Version | Status | Notes |
|---------------|--------|-------|
| **3.10.x** | ✅ Recommended | All dependencies work |
| **3.11.x** | ⚠️ Mostly works | Some packages may have issues |
| **3.12.x** | ❌ Not compatible | Many scientific packages fail |
| **3.13.x** | ❌ Not compatible | Too new, most packages fail |

## 🎯 Why This Happens

1. **Render's default:** Uses the latest Python version (3.13)
2. **Your dependencies:** Built for Python 3.10-3.11
3. **The conflict:** Packages like numpy, torch, scipy haven't released Python 3.13 wheels yet
4. **The solution:** Explicitly specify Python 3.10.14

## ✅ Verification Checklist

After redeploying:

- [ ] Build logs show `Using Python version 3.10.14`
- [ ] All dependencies install successfully
- [ ] No `BackendUnavailable` errors
- [ ] Service starts successfully
- [ ] `/docs` endpoint is accessible
- [ ] API responds to requests

## 🚨 If You Still Get Errors

### Error: "No matching distribution found for torch>=2.0.0"

**Solution:** Torch is large. Render might timeout. Try:

```txt
# In requirements.txt, use specific versions:
torch==2.0.1
torchvision==0.15.2
```

### Error: "Killed" during numpy/scipy installation

**Solution:** Memory limit exceeded. Options:

1. **Upgrade to paid tier** ($7/month = 1GB RAM)
2. **Use pre-built wheels:**
   ```txt
   numpy==1.24.3
   scipy==1.10.1
   ```

### Error: Model files not found

**Solution:** Ensure model files are committed:

```bash
git add backend/models/*.pkl
git add backend/models/*.pt
git commit -m "Add model files"
git push
```

## 📞 Still Stuck?

1. **Check Render logs:** Dashboard → Your Service → Logs
2. **Verify Python version:** Look for "Using Python version" in logs
3. **Test locally:** Ensure your app works with Python 3.10 locally
4. **Contact support:** Render has excellent support for build issues

---

**Status:** 
- [x] `runtime.txt` created
- [x] `render.yaml` updated
- [ ] Changes committed and pushed
- [ ] Render redeployed successfully

**Next:** Commit these changes and push to GitHub!
