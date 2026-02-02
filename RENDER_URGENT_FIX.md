# 🚨 URGENT: Force Render to Use Python 3.10

## Current Status

✅ **Files pushed to GitHub:**
- `runtime.txt` (in root directory)
- `backend/runtime.txt` (in backend directory)  
- `render.yaml` (updated with Python 3.10.14)

❌ **Problem:** Render is still using Python 3.13 despite these files

---

## 🔧 Solution: Manual Configuration in Render Dashboard

Since `runtime.txt` isn't being detected automatically, you need to **manually configure** Python 3.10 in the Render dashboard.

### Step 1: Go to Render Dashboard

1. Open [Render Dashboard](https://dashboard.render.com/)
2. Click on your **`chaitea-backend`** service (or whatever you named it)

### Step 2: Update Environment Variables

1. Click **"Environment"** in the left sidebar
2. Look for the `PYTHON_VERSION` variable
3. **If it exists:** Change the value to `3.10.14`
4. **If it doesn't exist:** Click **"Add Environment Variable"**
   - **Key:** `PYTHON_VERSION`
   - **Value:** `3.10.14`
5. Click **"Save Changes"**

### Step 3: Clear Build Cache (CRITICAL!)

Render caches the Python version, so you need to clear it:

1. Go to **"Settings"** in the left sidebar
2. Scroll down to **"Build & Deploy"** section
3. Find **"Clear build cache"** button
4. Click **"Clear build cache"**
5. Confirm the action

### Step 4: Manual Deploy

1. Go back to your service dashboard
2. Click **"Manual Deploy"** button (top right)
3. Select **"Clear build cache & deploy"**
4. Click **"Deploy"**

### Step 5: Watch the Logs

1. Click **"Logs"** in the left sidebar
2. Watch for this line near the beginning:

   ✅ **Success:** `==> Using Python version 3.10.14 (from runtime.txt)`
   
   ❌ **Still wrong:** `==> Using Python version 3.13.x`

---

## 🎯 Alternative: Update Build Command

If the above doesn't work, try changing the **Build Command**:

1. Go to **"Settings"** → **"Build & Deploy"**
2. Find **"Build Command"**
3. Change from:
   ```bash
   pip install -r requirements.txt
   ```
   
   To:
   ```bash
   python3.10 -m pip install --upgrade pip && python3.10 -m pip install -r requirements.txt
   ```

4. Click **"Save Changes"**
5. Deploy again

---

## 🎯 Alternative: Use a Build Script

If manual Python specification doesn't work, create a build script:

### Create `backend/build.sh`:

```bash
#!/bin/bash
set -e

echo "==> Forcing Python 3.10..."
python3.10 --version

echo "==> Upgrading pip..."
python3.10 -m pip install --upgrade pip

echo "==> Installing dependencies..."
python3.10 -m pip install -r requirements.txt

echo "==> Build complete!"
```

### Update Render Settings:

1. **Build Command:** `chmod +x build.sh && ./build.sh`
2. **Start Command:** `python3.10 -m uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## 📋 Verification Checklist

After deploying, verify these in the logs:

- [ ] `Using Python version 3.10.14` (not 3.13)
- [ ] `Successfully installed fastapi-0.104.1`
- [ ] `Successfully installed uvicorn-0.24.0`
- [ ] `Successfully installed torch-...`
- [ ] `Successfully installed numpy-...`
- [ ] No `BackendUnavailable` errors
- [ ] No `setuptools.build_meta` errors
- [ ] `Build successful!`
- [ ] Service starts without errors

---

## 🐛 If It STILL Uses Python 3.13

### Last Resort Option: Contact Render Support

If none of the above works, Render might have a caching issue:

1. Go to your service dashboard
2. Click **"Help"** (bottom left)
3. Click **"Contact Support"**
4. Send this message:

```
Subject: Service stuck on Python 3.13 despite runtime.txt

Hi Render team,

My service (chaitea-backend) is stuck using Python 3.13 despite having:
- runtime.txt with "python-3.10.14" in both root and backend/ directories
- PYTHON_VERSION=3.10.14 environment variable
- Cleared build cache multiple times

The service keeps using Python 3.13, causing build failures with numpy/torch.

Service URL: [your-service-url]
Repository: https://github.com/EnderMRG/ChaiTea

Can you please help force Python 3.10.14?

Thank you!
```

---

## 🎯 Expected Build Log (Success)

When it works, you should see:

```
==> Cloning from https://github.com/EnderMRG/ChaiTea...
==> Checking out commit 27e9883...
==> Using Python version 3.10.14 (from runtime.txt)
==> Installing dependencies
Collecting fastapi==0.104.1
  Downloading fastapi-0.104.1-py3-none-any.whl
Collecting uvicorn[standard]==0.24.0
  Downloading uvicorn-0.24.0-py3-none-any.whl
...
Successfully installed fastapi-0.104.1 uvicorn-0.24.0 ...
==> Build successful! 🎉
==> Starting service with 'uvicorn main:app --host 0.0.0.0 --port $PORT'
```

---

## 📞 Quick Actions Summary

**Do these in order:**

1. ✅ Add/verify `PYTHON_VERSION=3.10.14` in Environment
2. ✅ Clear build cache in Settings
3. ✅ Manual deploy with "Clear build cache & deploy"
4. ✅ Watch logs for Python version
5. ⚠️ If still 3.13, update Build Command to use `python3.10`
6. ⚠️ If still failing, create build.sh script
7. 🆘 If nothing works, contact Render support

---

**Current Time:** You should be able to fix this in the next 10 minutes!

**Next Step:** Go to Render Dashboard NOW and follow Step 1-4 above! 🚀
