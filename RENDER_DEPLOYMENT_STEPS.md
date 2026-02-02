# 🚀 Deploy ChaiTea to Render - Quick Steps

Follow these steps to deploy your ChaiTea application to Render's free tier.

---

## ✅ Pre-Deployment Checklist

Before you start, make sure you have:

- [ ] GitHub account
- [ ] Render account ([sign up here](https://render.com))
- [ ] Your code pushed to GitHub
- [ ] Firebase service account credentials (from Firebase Console)
- [ ] Gemini API key ready

## ⚠️ CRITICAL: Python Version

**Your project requires Python 3.10!** Render uses Python 3.13 by default, which will cause build failures.

**✅ Solution Applied:** 
- `backend/runtime.txt` file created (forces Python 3.10.14)
- `render.yaml` updated with correct Python version

**If you get build errors about `setuptools.build_meta` or dependency installation failures, see `RENDER_PYTHON_FIX.md` for detailed troubleshooting.**

---

## 📦 Step 1: Push Your Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Navigate to your project
cd f:\Proj\ChaiTea

# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "Ready for Render deployment"

# Push to GitHub
git push origin main
```

**✅ Verify:** Your code is visible on GitHub at `https://github.com/YOUR_USERNAME/ChaiTea`

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to **[Render Dashboard](https://dashboard.render.com/)**
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect account"** to authorize GitHub (if first time)
4. Find and select your **`ChaiTea`** repository

### 2.2 Configure the Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `chaitea-backend` (or your choice) |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

#### Required Variables:

```env
PYTHON_VERSION=3.10.0
DEMO_EMAIL=demo@chaitea.com
```

#### Firebase Credentials:

You need to get these from your Firebase Console:

1. Go to **Firebase Console** → **Project Settings** → **Service Accounts**
2. Click **"Generate New Private Key"**
3. Download the JSON file
4. Add each field as an environment variable:

```env
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

#### Gemini API Key:

```env
GEMINI_API_KEY=your-gemini-api-key-here
```

**⚠️ IMPORTANT:** For `FIREBASE_PRIVATE_KEY`, keep the `\n` characters as literal `\n` (not actual newlines). Copy the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`.

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for the build to complete
3. Watch the logs for any errors

**✅ Success Check:** 
- Visit `https://your-backend-name.onrender.com/docs`
- You should see the FastAPI Swagger documentation!

**📝 Note your backend URL:** `https://_____________________.onrender.com`

---

## 🌐 Step 3: Deploy Frontend to Vercel (Recommended)

Vercel is better for Next.js apps than Render's static site hosting.

### 3.1 Create Vercel Account

1. Go to **[Vercel](https://vercel.com)**
2. Sign up with your GitHub account

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your **`ChaiTea`** repository
3. Configure:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | (leave default) |
| **Output Directory** | (leave default) |

### 3.3 Add Environment Variable

Add this environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```

Replace `your-backend-name` with your actual Render backend URL.

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Get your URL: `https://your-project.vercel.app`

**📝 Note your frontend URL:** `https://_____________________.vercel.app`

---

## 🔗 Step 4: Connect Frontend and Backend

### 4.1 Update Backend CORS

1. Go back to **Render Dashboard** → Your Backend Service
2. Click **"Environment"** on the left
3. Add this environment variable:

```env
FRONTEND_URL=https://your-project.vercel.app
```

4. The backend will automatically redeploy (takes 3-5 minutes)

### 4.2 Update Firebase Authorized Domains

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"** and add:
   - `your-backend-name.onrender.com`
   - `your-project.vercel.app`

---

## ✅ Step 5: Test Your Deployment

### Backend Tests:

- [ ] Visit `https://your-backend.onrender.com/docs`
- [ ] API documentation loads correctly
- [ ] Try the `/api/market/kpis` endpoint (doesn't require auth)

### Frontend Tests:

- [ ] Visit `https://your-project.vercel.app`
- [ ] Homepage loads without errors
- [ ] Click "Sign in with Google" - authentication works
- [ ] Click "Use Demo" - demo mode works
- [ ] Dashboard loads and all tabs are functional:
  - [ ] Cultivation Intelligence
  - [ ] Leaf Quality Scanner
  - [ ] Farmer Simulator
  - [ ] Market Intelligence
  - [ ] AI Consequence Mirror

### Browser Console Check:

- [ ] Open Developer Tools (F12)
- [ ] Check Console tab - no CORS errors
- [ ] Check Network tab - all API calls succeed

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend Build Fails

**Error:** `ModuleNotFoundError` or dependency issues

**Solution:**
- Check that `requirements.txt` includes all dependencies
- Verify `PYTHON_VERSION=3.10.0` is set in environment variables
- Check Render logs for specific error messages

### Issue 2: Backend Cold Start (30-60 seconds)

**This is normal!** On the free tier, your backend sleeps after 15 minutes of inactivity. The first request wakes it up, which takes 30-60 seconds.

**Solution:** 
- Upgrade to paid tier ($7/month) for always-on service
- Or accept the cold start delay

### Issue 3: CORS Errors

**Error:** `Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy`

**Solution:**
- Verify `FRONTEND_URL` is set correctly in Render backend environment
- Check that your frontend URL matches exactly (no trailing slash)
- Wait for backend to redeploy after adding the variable

### Issue 4: Firebase Authentication Fails

**Error:** `auth/unauthorized-domain`

**Solution:**
- Add your deployed URLs to Firebase authorized domains
- Make sure you added both backend and frontend URLs
- Wait a few minutes for Firebase to update

### Issue 5: YOLOv5 Model Not Loading

**Error:** `YOLOv5 model loading failed`

**Solution:**
- Ensure `models/best.pt` is committed to your GitHub repository
- Check that the file is not in `.gitignore`
- Verify the file size is under 100MB (GitHub limit)
- If larger, use Git LFS or host the model elsewhere

### Issue 6: Environment Variables Not Working

**Solution:**
- Don't use quotes around values in Render dashboard
- For `FIREBASE_PRIVATE_KEY`, keep `\n` as literal text (not actual newlines)
- After adding/changing variables, Render auto-redeploys (wait 3-5 min)

---

## 💰 Free Tier Limitations

**Backend (Render Free):**
- ✅ 512 MB RAM
- ✅ Shared CPU
- ⚠️ Sleeps after 15 minutes of inactivity
- ⚠️ Cold start: 30-60 seconds
- ✅ 750 hours/month (enough for 24/7 if only one service)

**Frontend (Vercel Free):**
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Always active (no cold starts)
- ✅ Global CDN

**Firebase (Spark Plan - Free):**
- ✅ 50,000 reads/day
- ✅ 20,000 writes/day
- ✅ 1 GB storage
- ✅ 10 GB/month bandwidth

---

## 🚀 Upgrade Options (When Needed)

When your app grows:

| Service | Free | Paid | Cost |
|---------|------|------|------|
| **Render Backend** | 512 MB, sleeps | 1 GB, always on | $7/month |
| **Vercel Frontend** | 100 GB bandwidth | 1 TB bandwidth | $20/month |
| **Firebase** | Spark (free) | Blaze (pay-as-you-go) | ~$5-25/month |

---

## 📊 Monitoring Your Deployment

### View Backend Logs:
1. Render Dashboard → Your Service → **Logs**
2. Watch for errors, warnings, and request logs

### View Frontend Logs:
1. Vercel Dashboard → Your Project → **Deployments** → Click latest → **Logs**

### Monitor Firebase Usage:
1. Firebase Console → **Usage and billing**
2. Track authentication, database, and storage usage

---

## 🔄 Continuous Deployment

Both Render and Vercel support automatic deployment:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature X"
   git push origin main
   ```
3. **Automatic deployment happens!**
   - Backend: 5-10 minutes
   - Frontend: 2-3 minutes

**To disable auto-deploy:**
- **Render:** Service Settings → Auto-Deploy → Off
- **Vercel:** Project Settings → Git → Disable

---

## ✅ Success Checklist

Your deployment is complete when:

- [x] Backend API responds at `/docs`
- [x] Frontend loads without errors
- [x] Google Sign-In works
- [x] Demo mode works
- [x] All dashboard features are functional
- [x] No CORS errors in browser console
- [x] Mobile responsive (test on phone)
- [x] Performance is acceptable (after cold start)

---

## 🎉 You're Live!

**Your ChaiTea application is now deployed!**

**Production URLs:**
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **API Docs:** `https://your-backend.onrender.com/docs`

**Next Steps:**
1. ✅ Share your app with users
2. ✅ Gather feedback
3. ✅ Monitor usage and performance
4. ✅ Plan for scaling when needed
5. ✅ Consider custom domain (optional)

---

## 📞 Need Help?

If you encounter issues:

1. **Check Logs:**
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments → Logs
   - Browser: F12 → Console tab

2. **Review This Guide:**
   - Check the "Common Issues" section above

3. **Check Status Pages:**
   - [Render Status](https://status.render.com/)
   - [Vercel Status](https://www.vercel-status.com/)
   - [Firebase Status](https://status.firebase.google.com/)

4. **Community Support:**
   - [Render Community](https://community.render.com/)
   - [Vercel Discord](https://vercel.com/discord)

---

**Good luck with your deployment! 🚀🍃**

*Deployment Date: _______________*  
*Deployed By: _______________*  
*Notes: _______________*
