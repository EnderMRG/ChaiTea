# 🏗️ ChaiTea Deployment Architecture

## Production Deployment Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS / CLIENTS                          │
│                    (Web Browsers, Mobile)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────┐              ┌─────────────────┐
│   VERCEL CDN    │              │  RENDER CLOUD   │
│   (Frontend)    │◄────────────►│   (Backend)     │
│                 │   API Calls  │                 │
│  Next.js App    │              │  FastAPI App    │
│  Static Assets  │              │  Python 3.10    │
│                 │              │                 │
└────────┬────────┘              └────────┬────────┘
         │                                │
         │                                │
         │                                ▼
         │                       ┌─────────────────┐
         │                       │  GOOGLE CLOUD   │
         │                       │                 │
         │                       │  ┌───────────┐  │
         │                       │  │  Gemini   │  │
         │                       │  │    AI     │  │
         │                       │  └───────────┘  │
         │                       │                 │
         │                       │  ┌───────────┐  │
         └──────────────────────►│  │ Firebase  │  │
                                 │  │ Firestore │  │
                                 │  │   Auth    │  │
                                 │  └───────────┘  │
                                 │                 │
                                 └─────────────────┘
```

## Component Breakdown

### 🌐 Frontend (Vercel)
- **Platform**: Vercel
- **Framework**: Next.js 14
- **Tier**: Free (Hobby)
- **Features**:
  - Global CDN
  - Automatic HTTPS
  - Instant deployments
  - Git integration
  - Edge functions
- **URL**: `https://chaitea.vercel.app`

### ⚙️ Backend (Render)
- **Platform**: Render
- **Framework**: FastAPI
- **Runtime**: Python 3.10
- **Tier**: Free
- **Features**:
  - Auto-deploy from Git
  - HTTPS included
  - Environment variables
  - Health checks
  - Logs & metrics
- **URL**: `https://chaitea-backend.onrender.com`
- **Limitation**: Sleeps after 15 min inactivity

### 🔥 Database (Firebase)
- **Service**: Firestore
- **Tier**: Spark (Free)
- **Features**:
  - Real-time sync
  - NoSQL database
  - Authentication
  - Security rules
- **Collections**:
  - `farms/` - Farm data
  - `sensors/` - IoT readings
  - `leaf_scans/` - Scan history
  - `pluckers/` - Worker data

### 🤖 AI Services (Google Cloud)
- **Gemini AI**: Text generation & recommendations
- **Firebase Auth**: User authentication
- **Firestore**: Real-time database

## Data Flow

### 1. User Authentication Flow
```
User → Frontend → Firebase Auth → Token → Backend
                     ↓
                  Firestore
```

### 2. Cultivation Intelligence Flow
```
IoT Sensors → Firestore → Backend → ML Models → Gemini AI
                             ↓
                          Frontend ← API Response
```

### 3. Leaf Quality Analysis Flow
```
User Upload → Frontend → Backend → YOLOv5 + CNN → Gemini AI
                                      ↓
                                   Firestore
                                      ↓
                                   Frontend
```

### 4. Market Intelligence Flow
```
CSV Data → Backend → Price Model → Forecast
             ↓
          Gemini AI → Insights
             ↓
          Frontend ← API Response
```

## Deployment Pipeline

### Automatic Deployment (CI/CD)

```
Developer → Git Push → GitHub
                         │
                         ├─► Vercel (Frontend)
                         │   └─► Build → Deploy → Live
                         │
                         └─► Render (Backend)
                             └─► Build → Deploy → Live
```

**Timeline:**
- Frontend: 2-3 minutes
- Backend: 5-10 minutes

### Manual Deployment

1. **Code Changes**
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   ```

2. **Automatic Triggers**
   - Vercel detects push → builds frontend
   - Render detects push → builds backend

3. **Deployment**
   - Both services build in parallel
   - Health checks verify deployment
   - Traffic switches to new version

## Environment Configuration

### Development
```
Frontend: localhost:3000 → Backend: localhost:8000
                              ↓
                           Firebase
```

### Production
```
Frontend: vercel.app → Backend: onrender.com
                          ↓
                       Firebase
```

## Security Architecture

### Authentication
```
User → Google OAuth → Firebase Auth → JWT Token
                                         ↓
                                    Backend API
                                         ↓
                                    Verify Token
                                         ↓
                                    Access Granted
```

### API Security
- CORS: Whitelist frontend domains
- Auth: Firebase ID token verification
- HTTPS: Enforced on all connections
- Env Vars: Secrets stored securely

## Scaling Strategy

### Current (Free Tier)
- **Users**: ~100 concurrent
- **Requests**: Limited by cold starts
- **Storage**: 512 MB
- **Bandwidth**: Limited

### Upgrade Path

#### Small Scale ($32/month)
- Render: $7/month (always-on)
- Vercel: $20/month (Pro)
- Firebase: ~$5/month (Blaze)
- **Users**: ~1,000 concurrent
- **Requests**: Unlimited
- **Storage**: 1 GB

#### Medium Scale ($100+/month)
- Render: $25/month (2 GB RAM)
- Vercel: $20/month (Pro)
- Firebase: ~$50/month (Blaze)
- CDN: Cloudflare (optional)
- **Users**: ~10,000 concurrent
- **Requests**: Unlimited
- **Storage**: 10 GB

## Monitoring & Observability

### Metrics to Track

**Frontend (Vercel)**
- Page load time
- Core Web Vitals
- Error rate
- Bandwidth usage

**Backend (Render)**
- Response time
- Error rate
- CPU/Memory usage
- Cold start frequency

**Database (Firebase)**
- Read/Write operations
- Storage usage
- Active connections
- Auth requests

### Logging

**Render Logs:**
```
Render Dashboard → Service → Logs
```

**Vercel Logs:**
```
Vercel Dashboard → Project → Logs
```

**Firebase Logs:**
```
Firebase Console → Usage and Billing
```

## Disaster Recovery

### Backup Strategy
- **Code**: Git repository (GitHub)
- **Database**: Firestore auto-backup
- **Env Vars**: Documented in `.env.example`
- **Models**: Stored in repository

### Rollback Procedure
1. Identify problematic deployment
2. Revert Git commit
3. Push to trigger redeploy
4. Verify functionality

### High Availability
- **Frontend**: Vercel global CDN (99.99% uptime)
- **Backend**: Render auto-restart on failure
- **Database**: Firebase multi-region replication

## Cost Optimization

### Free Tier Maximization
1. Use Vercel for frontend (better Next.js support)
2. Accept backend cold starts
3. Optimize images (WebP, compression)
4. Minimize API calls
5. Cache static data

### When to Upgrade
- Cold starts affecting UX (> 100 users)
- Hitting bandwidth limits
- Need guaranteed uptime
- Require analytics
- Production launch

## Performance Optimization

### Frontend
- Static generation where possible
- Image optimization
- Code splitting
- Lazy loading
- CDN caching

### Backend
- Database query optimization
- Response caching
- Async operations
- Connection pooling
- Model optimization

### Database
- Index frequently queried fields
- Limit query results
- Use pagination
- Batch operations
- Clean old data

## Compliance & Security

### Data Protection
- HTTPS everywhere
- Encrypted at rest (Firebase)
- Encrypted in transit (TLS)
- No sensitive data in logs
- Regular security updates

### Privacy
- Firebase Auth handles user data
- No PII in analytics
- GDPR compliant (Firebase)
- User data deletion support

## Support & Maintenance

### Regular Tasks
- [ ] Monitor error logs (weekly)
- [ ] Check usage metrics (weekly)
- [ ] Update dependencies (monthly)
- [ ] Review security alerts (as needed)
- [ ] Backup verification (monthly)

### Emergency Contacts
- Render Status: https://status.render.com
- Vercel Status: https://vercel-status.com
- Firebase Status: https://status.firebase.google.com

---

## 🎯 Quick Reference

| Component | Platform | Tier | URL |
|-----------|----------|------|-----|
| Frontend | Vercel | Free | https://chaitea.vercel.app |
| Backend | Render | Free | https://chaitea-backend.onrender.com |
| Database | Firebase | Spark | console.firebase.google.com |
| AI | Gemini | Pay-per-use | ai.google.dev |

---

**Last Updated:** 2026-02-02
**Architecture Version:** 1.0
**Deployment Status:** Ready for Production 🚀
