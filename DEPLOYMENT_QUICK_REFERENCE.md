# ⚡ Quick Deployment Reference

**Use this as a quick checklist while deploying. For detailed instructions, see `RENDER_DEPLOYMENT_STEPS.md`**

---

## 📋 Pre-Flight Checklist

- [ ] Code pushed to GitHub
- [ ] Firebase credentials ready (JSON file downloaded)
- [ ] Gemini API key ready
- [ ] Render account created
- [ ] Vercel account created

---

## 🔧 Backend Deployment (Render)

### Configuration:
```
Name: chaitea-backend
Region: Oregon
Branch: main
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
Instance Type: Free
```

### Environment Variables to Add:
```env
PYTHON_VERSION=3.10.0
DEMO_EMAIL=demo@chaitea.com
GEMINI_API_KEY=<your-key>

# Firebase (from downloaded JSON):
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=<from-json>
FIREBASE_PRIVATE_KEY_ID=<from-json>
FIREBASE_PRIVATE_KEY=<from-json-keep-\n-as-literal>
FIREBASE_CLIENT_EMAIL=<from-json>
FIREBASE_CLIENT_ID=<from-json>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=<from-json>
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

### Test:
- [ ] Visit: `https://your-backend.onrender.com/docs`
- [ ] Swagger UI loads successfully

**Backend URL:** `https://_____________________.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Configuration:
```
Framework: Next.js
Root Directory: frontend
Build Command: (default)
Output Directory: (default)
```

### Environment Variable:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

### Test:
- [ ] Visit: `https://your-project.vercel.app`
- [ ] Homepage loads without errors

**Frontend URL:** `https://_____________________.vercel.app`

---

## 🔗 Connect Services

### 1. Update Backend CORS:
In Render → Backend → Environment, add:
```env
FRONTEND_URL=https://your-project.vercel.app
```

### 2. Update Firebase Authorized Domains:
Firebase Console → Authentication → Settings → Authorized domains

Add:
- `your-backend.onrender.com`
- `your-project.vercel.app`

---

## ✅ Final Testing

- [ ] Backend `/docs` endpoint works
- [ ] Frontend loads
- [ ] Google Sign-In works
- [ ] Demo mode works
- [ ] All dashboard tabs functional
- [ ] No CORS errors in browser console (F12)
- [ ] Test on mobile device

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend build fails** | Check `PYTHON_VERSION=3.10.0` is set |
| **CORS errors** | Verify `FRONTEND_URL` matches exactly |
| **Auth fails** | Add URLs to Firebase authorized domains |
| **30-60s delay** | Normal! Free tier cold start |
| **Env vars not working** | Don't use quotes, wait for redeploy |

---

## 📞 Important URLs

**Documentation:**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs

**Dashboards:**
- Render: https://dashboard.render.com
- Vercel: https://vercel.com/dashboard
- Firebase: https://console.firebase.google.com

**Status Pages:**
- Render: https://status.render.com
- Vercel: https://www.vercel-status.com
- Firebase: https://status.firebase.google.com

---

## 🎯 Success Criteria

✅ **Deployment is successful when:**
1. Backend API responds at `/docs`
2. Frontend loads without errors
3. Authentication works (Google + Demo)
4. All features functional
5. No console errors

---

**Deployment Date:** _______________  
**Backend URL:** _______________  
**Frontend URL:** _______________  
**Status:** ⬜ In Progress | ⬜ Complete | ⬜ Issues

---

*For detailed step-by-step instructions, see `RENDER_DEPLOYMENT_STEPS.md`*
