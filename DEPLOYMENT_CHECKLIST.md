# 🚀 Quick Deployment Checklist

Use this checklist to ensure a smooth deployment to Render.

## Pre-Deployment

- [ ] All code committed and pushed to GitHub
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] Firebase credentials ready
- [ ] Gemini API key ready
- [ ] GitHub repository is public or Render has access

## Backend Deployment (Render)

### Setup
- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Select Free tier

### Environment Variables
Add these in Render dashboard:

- [ ] `GEMINI_API_KEY` = your_gemini_api_key
- [ ] `DEMO_EMAIL` = demo@chaitea.com
- [ ] `FIREBASE_TYPE` = service_account
- [ ] `FIREBASE_PROJECT_ID` = your_project_id
- [ ] `FIREBASE_PRIVATE_KEY_ID` = your_key_id
- [ ] `FIREBASE_PRIVATE_KEY` = your_private_key (keep \n characters!)
- [ ] `FIREBASE_CLIENT_EMAIL` = your_service_account_email
- [ ] `FIREBASE_CLIENT_ID` = your_client_id
- [ ] `FIREBASE_AUTH_URI` = https://accounts.google.com/o/oauth2/auth
- [ ] `FIREBASE_TOKEN_URI` = https://oauth2.googleapis.com/token
- [ ] `FIREBASE_AUTH_PROVIDER_CERT_URL` = https://www.googleapis.com/oauth2/v1/certs
- [ ] `FIREBASE_CLIENT_CERT_URL` = your_cert_url
- [ ] `FIREBASE_UNIVERSE_DOMAIN` = googleapis.com
- [ ] `PYTHON_VERSION` = 3.10.0

### Verification
- [ ] Deployment successful (check logs)
- [ ] Visit `https://your-backend.onrender.com/docs`
- [ ] API documentation loads
- [ ] Note your backend URL: ___________________________

## Frontend Deployment (Vercel - Recommended)

### Setup
- [ ] Create new project on Vercel
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Framework preset: Next.js
- [ ] Build command: `pnpm build` (or leave default)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = https://your-backend.onrender.com

### Verification
- [ ] Deployment successful
- [ ] Visit your Vercel URL
- [ ] App loads without errors
- [ ] Note your frontend URL: ___________________________

## Alternative: Frontend on Render (Static Site)

If using Render instead of Vercel:

- [ ] Create new Static Site on Render
- [ ] Set root directory to `frontend`
- [ ] Set build command: `pnpm install && pnpm build && pnpm export`
- [ ] Set publish directory: `out`
- [ ] Add env var: `NEXT_PUBLIC_API_URL` = your backend URL
- [ ] Update `next.config.mjs` with `output: 'export'`

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Add frontend URL to Render backend env vars:
  - `FRONTEND_URL` = https://your-frontend-url
- [ ] Backend will auto-redeploy

### Firebase Configuration
- [ ] Go to Firebase Console
- [ ] Authentication → Settings → Authorized domains
- [ ] Add: `your-backend.onrender.com`
- [ ] Add: `your-frontend.vercel.app` (or Render URL)

## Testing

### Backend Tests
- [ ] Visit `/docs` endpoint
- [ ] Test `/api/market/kpis` (no auth required)
- [ ] Check logs for errors

### Frontend Tests
- [ ] Homepage loads
- [ ] Login page accessible
- [ ] Google Sign-In works
- [ ] Demo mode works
- [ ] Dashboard loads
- [ ] All tabs functional:
  - [ ] Cultivation Intelligence
  - [ ] Leaf Quality Scanner
  - [ ] Farmer Simulator
  - [ ] Market Intelligence
  - [ ] AI Consequence Mirror
- [ ] No CORS errors in console
- [ ] Images load correctly
- [ ] Charts render properly

### End-to-End Tests
- [ ] Login with Google account
- [ ] Upload a leaf image
- [ ] Run cultivation analysis (manual mode)
- [ ] Check IoT mode (if data available)
- [ ] Generate a simulation PDF
- [ ] View market intelligence
- [ ] Test on mobile device

## Performance Checks

- [ ] First load time acceptable (< 5 seconds)
- [ ] Cold start time noted (30-60s on free tier is normal)
- [ ] Images optimized
- [ ] No console errors
- [ ] No 404s in Network tab

## Documentation Updates

- [ ] Update README.md with deployment URLs
- [ ] Update `.env.production` with actual backend URL
- [ ] Document any deployment-specific issues
- [ ] Share URLs with team

## Monitoring Setup

- [ ] Enable Vercel Analytics (optional)
- [ ] Bookmark Render dashboard
- [ ] Set up status page monitoring (optional)
- [ ] Configure Firebase usage alerts

## Common Issues Checklist

If something doesn't work:

- [ ] Check Render logs for backend errors
- [ ] Check Vercel logs for frontend errors
- [ ] Verify all environment variables are set correctly
- [ ] Check browser console for CORS errors
- [ ] Verify Firebase authorized domains
- [ ] Test API endpoints directly with `/docs`
- [ ] Check if backend is sleeping (cold start)
- [ ] Verify model files are included in deployment

## Success Criteria

Your deployment is successful when:

- [ ] ✅ Backend API responds at `/docs`
- [ ] ✅ Frontend loads without errors
- [ ] ✅ Authentication works (Google + Demo)
- [ ] ✅ All dashboard features functional
- [ ] ✅ No CORS errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Performance acceptable

## URLs for Reference

**Production URLs:**
- Backend: https://_____________________________.onrender.com
- Frontend: https://_____________________________.vercel.app
- API Docs: https://_____________________________.onrender.com/docs

**Development URLs:**
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## Next Steps After Deployment

- [ ] Share app with users
- [ ] Gather feedback
- [ ] Monitor usage and performance
- [ ] Plan for scaling (upgrade to paid tier when needed)
- [ ] Set up custom domain (optional)
- [ ] Configure analytics
- [ ] Set up error tracking (Sentry, etc.)

---

## 🎉 Congratulations!

Your ChaiTea application is now live and accessible to users worldwide!

**Remember:** Free tier has limitations:
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading for production use

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Notes:** _______________________________________________
