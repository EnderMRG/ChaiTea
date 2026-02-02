# 🚀 Deploying ChaiTea to Render (Free Tier)

This guide will walk you through deploying both the **Backend (FastAPI)** and **Frontend (Next.js)** to Render's free tier.

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] Your code pushed to a GitHub repository
- [ ] Firebase credentials ready
- [ ] Gemini API key ready

## ⚠️ Free Tier Limitations

**Important things to know:**
- **Backend**: Free web services spin down after 15 minutes of inactivity (cold starts take 30-60 seconds)
- **Frontend**: Static sites are always active but have bandwidth limits
- **Database**: Firebase (external) - no Render database needed
- **Storage**: 512 MB disk space per service
- **Build time**: 15 minutes max per deployment

## 🎯 Deployment Strategy

We'll deploy:
1. **Backend** → Render Web Service (Python)
2. **Frontend** → Vercel (recommended) or Render Static Site

> **Why Vercel for Frontend?** Vercel offers better Next.js support and faster builds on free tier. But we'll cover both options!

---

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend Files

We need to create several configuration files for Render.

#### 1.1 Create `render.yaml` (Optional - for Blueprint)

This file is optional but helps with automated deployment.

#### 1.2 Update `requirements.txt`

Ensure your `requirements.txt` includes `gunicorn`:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
gunicorn==21.2.0
# ... rest of your dependencies
```

#### 1.3 Create `build.sh` (Build Script)

This script will run during deployment to set up the environment.

#### 1.4 Update CORS Settings

Make sure your `main.py` allows your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-domain.vercel.app",  # Add your frontend URL
        "https://your-frontend-domain.onrender.com"  # If using Render for frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Step 2: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Render deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/ChaiTea.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Authorize Render to access your GitHub
   - Select the `ChaiTea` repository

4. **Configure the service:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `chaitea-backend` |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Python 3` |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
   | **Instance Type** | `Free` |

5. **Add Environment Variables**

   Click "Advanced" → "Add Environment Variable" and add:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   DEMO_EMAIL=demo@chaitea.com
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_CERT_URL=your_client_cert_url
   FIREBASE_UNIVERSE_DOMAIN=googleapis.com
   PYTHON_VERSION=3.10.0
   ```

   **Important**: For `FIREBASE_PRIVATE_KEY`, make sure to keep the `\n` characters for line breaks.

6. **Click "Create Web Service"**

   Render will start building and deploying your backend. This takes 5-10 minutes.

7. **Note your backend URL**

   Once deployed, you'll get a URL like: `https://chaitea-backend.onrender.com`

### Step 4: Test Backend Deployment

Visit: `https://chaitea-backend.onrender.com/docs`

You should see the FastAPI Swagger documentation!

---

## Part 2: Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare Frontend

1. **Update API URL**

Create `frontend/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://chaitea-backend.onrender.com
```

2. **Update `lib/api.ts`**

Make sure your API client uses the environment variable:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

#### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com)**

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**

4. **Configure the project:**

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Next.js |
   | **Root Directory** | `frontend` |
   | **Build Command** | `pnpm build` (or leave default) |
   | **Output Directory** | `.next` (default) |
   | **Install Command** | `pnpm install` |

5. **Add Environment Variables:**

   ```
   NEXT_PUBLIC_API_URL=https://chaitea-backend.onrender.com
   ```

6. **Click "Deploy"**

   Vercel will build and deploy in 2-3 minutes.

7. **Get your URL**: `https://chaitea.vercel.app`

#### Step 3: Update Backend CORS

Go back to Render → Your Backend Service → Environment → Add:

```
FRONTEND_URL=https://chaitea.vercel.app
```

Then update your `main.py` CORS to use this:

```python
import os

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push - Render will auto-redeploy.

### Option B: Deploy Frontend to Render

If you prefer to keep everything on Render:

1. **Go to Render Dashboard**

2. **Click "New +" → "Static Site"**

3. **Connect your repository**

4. **Configure:**

   | Setting | Value |
   |---------|-------|
   | **Name** | `chaitea-frontend` |
   | **Branch** | `main` |
   | **Root Directory** | `frontend` |
   | **Build Command** | `pnpm install && pnpm build` |
   | **Publish Directory** | `out` |

5. **Add Environment Variable:**

   ```
   NEXT_PUBLIC_API_URL=https://chaitea-backend.onrender.com
   ```

6. **Update `next.config.mjs`** to enable static export:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };

   export default nextConfig;
   ```

7. **Click "Create Static Site"**

---

## Part 3: Firebase Configuration

### Update Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Add:
   - `chaitea-backend.onrender.com`
   - `chaitea.vercel.app` (or your Render static site URL)

---

## Part 4: Post-Deployment Checklist

- [ ] Backend API is accessible at `/docs`
- [ ] Frontend loads without errors
- [ ] Google Sign-In works
- [ ] Demo mode works
- [ ] Cultivation Intelligence fetches data
- [ ] Leaf scanner accepts uploads
- [ ] Market Intelligence shows data
- [ ] No CORS errors in browser console

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails:**
```bash
# Check Python version in render.yaml or add env var:
PYTHON_VERSION=3.10.0
```

**Cold start timeout:**
- First request after 15 min inactivity takes 30-60 seconds
- This is normal on free tier
- Consider upgrading to paid tier for production

**Module not found:**
```bash
# Ensure all dependencies are in requirements.txt
pip freeze > requirements.txt
```

**Environment variables not working:**
- Check for typos in variable names
- Ensure `FIREBASE_PRIVATE_KEY` has `\n` for newlines
- Don't use quotes around values in Render dashboard

### Frontend Issues

**API calls fail:**
- Check CORS settings in backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for exact error

**Build fails on Vercel:**
```bash
# Make sure package.json has correct scripts:
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

**Static export issues:**
- Remove any server-side only features
- Use `next/image` with `unoptimized: true`
- Avoid `getServerSideProps`

### Firebase Issues

**Authentication fails:**
- Add your deployed URLs to Firebase authorized domains
- Check Firebase API keys are correct
- Verify Firebase project is active

---

## 💰 Cost Optimization Tips

1. **Use Vercel for Frontend**: Better Next.js support, faster builds
2. **Backend Sleep Mode**: Accept 30-60s cold starts on free tier
3. **Optimize Images**: Use WebP format, compress before upload
4. **Reduce Bundle Size**: 
   ```bash
   # Analyze bundle
   cd frontend
   pnpm build
   ```
5. **Cache Static Assets**: Leverage Vercel's CDN

---

## 🚀 Upgrade Path (When Ready)

When you need better performance:

| Service | Free Tier | Paid Tier | Cost |
|---------|-----------|-----------|------|
| **Render Backend** | 512 MB RAM, sleeps | 1 GB RAM, always on | $7/month |
| **Vercel Frontend** | 100 GB bandwidth | 1 TB bandwidth | $20/month |
| **Firebase** | Spark (free) | Blaze (pay-as-you-go) | ~$5-25/month |

---

## 📊 Monitoring

### Render Logs

View logs in Render Dashboard → Your Service → Logs

### Vercel Analytics

Enable in Vercel Dashboard → Your Project → Analytics

### Firebase Usage

Monitor in Firebase Console → Usage and billing

---

## 🔄 Continuous Deployment

Both Render and Vercel support auto-deployment:

1. Push to `main` branch
2. Services automatically rebuild and redeploy
3. Takes 3-5 minutes for backend, 2-3 minutes for frontend

To disable auto-deploy:
- **Render**: Service Settings → Auto-Deploy → Off
- **Vercel**: Project Settings → Git → Disable

---

## ✅ Success Checklist

After deployment, verify:

- [ ] Backend URL works: `https://chaitea-backend.onrender.com/docs`
- [ ] Frontend URL works: `https://chaitea.vercel.app`
- [ ] Login with Google works
- [ ] Demo mode works
- [ ] All dashboard features load
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast load times (after cold start)

---

## 🎉 You're Live!

Your ChaiTea application is now deployed and accessible worldwide!

**Share your URLs:**
- Frontend: `https://chaitea.vercel.app`
- API Docs: `https://chaitea-backend.onrender.com/docs`

**Next Steps:**
1. Set up custom domain (optional)
2. Enable analytics
3. Monitor usage
4. Gather user feedback
5. Plan for scaling when needed

---

## 📞 Support

If you encounter issues:
1. Check Render/Vercel logs
2. Review this guide's troubleshooting section
3. Check Render/Vercel status pages
4. Review Firebase console for auth issues

Good luck! 🚀🍃
