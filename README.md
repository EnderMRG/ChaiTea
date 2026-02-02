# 🍃 CHAI-NET - Intelligent Tea Garden Management System

<div align="center">

**An AI-powered IoT platform revolutionizing tea cultivation through real-time monitoring, predictive analytics, and intelligent decision support.**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat&logo=python)](https://www.python.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=flat&logo=google)](https://ai.google.dev/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-endpoints) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

CHAI-NET is a comprehensive tea garden management platform designed specifically for Assam tea estates. It combines IoT sensor networks, computer vision, machine learning, and generative AI to provide actionable insights for optimizing cultivation, detecting diseases early, and maximizing profitability.

### 🎯 Problem Statement

Traditional tea cultivation relies on manual inspection and experience-based decision making, leading to:
- **Delayed disease detection** resulting in crop losses
- **Suboptimal irrigation** and resource management
- **Reactive rather than proactive** farm management
- **Limited market intelligence** for pricing decisions

### 💡 Our Solution

CHAI-NET provides a unified platform that:
- Monitors environmental conditions in real-time via IoT sensors
- Detects leaf diseases automatically using AI vision models
- Predicts crop health and pest risks using machine learning
- Generates actionable recommendations via Gemini AI
- Forecasts market prices for strategic selling decisions

---

## 🌟 Key Features

### 🌱 Cultivation Intelligence
- **Real-time IoT Monitoring**: Track soil moisture, temperature, humidity, and rainfall across your estate
- **Health Score Analytics**: AI-computed crop health scores (0-100) based on environmental stress factors
- **Smart Alerts**: Automated notifications for drought risk, pest threats, and suboptimal conditions
- **Predictive Insights**: Gemini AI generates contextual recommendations for irrigation, fertilization, and pest control
- **Historical Trends**: Visualize 7-day environmental patterns with interactive charts

### 🔬 AI Leaf Quality Scanner
- **Multi-Model Disease Detection**:
  - **YOLOv5 Object Detection**: Identifies disease regions with bounding boxes
  - **CNN Classification**: Detects Red Rust, Blister Blight, Algal Leaf Spot, and more
  - **HSV Surface Analysis**: Color-based health assessment
- **Confidence Scoring**: High/Medium/Low confidence levels for each prediction
- **Treatment Recommendations**: Gemini AI provides specific remediation steps
- **Severity Assessment**: Automatic grading of disease severity
- **Firestore Integration**: All scans are logged for historical analysis

### 📊 Farmer Action Simulator
- **What-If Scenario Planning**: Test different yield inputs and cultivation strategies
- **AI-Powered Projections**: Get financial forecasts, profit margins, and ROI estimates
- **PDF Report Generation**: Professional reports with charts and recommendations
- **Market Timing Insights**: Optimal selling windows based on price forecasts
- **Confidence Metrics**: Understand the reliability of each simulation

### 🔮 AI Consequence Mirror
- **Future Visualization**: Compare "Standard Practice" vs "AI-Optimized" approaches
- **Time-Lapse Simulation**: See predicted outcomes over 7, 14, and 30 days
- **Impact Metrics**:
  - Disease spread progression
  - Yield impact (kg/hectare)
  - Worker stress levels
  - Profit projections
- **Visual Transformations**: Animated leaf health changes and risk indicators

### 📈 Market Intelligence
- **Price Forecasting**: ML-based predictions for Guwahati auction prices
- **Demand Analytics**: Track market demand trends and volatility
- **Strategic Insights**: Gemini AI analyzes market conditions and suggests optimal selling strategies
- **Multi-Market Tracking**: Monitor prices across Kolkata, Siliguri, Cochin, Coonoor, and more
- **Historical Data**: 12+ months of price history with trend analysis

### 👥 Plucker Analytics
- **Daily Production Tracking**: Monitor individual plucker performance
- **Efficiency Metrics**: kg/hour, total harvest, quality grades
- **Schedule Management**: Assign pluckers to specific garden sections
- **Performance Trends**: Identify top performers and areas for improvement

### 🔐 Authentication & Security
- **Google Sign-In**: Secure OAuth2 authentication
- **Demo Mode**: Try the platform without registration
- **Role-Based Access**: Manager vs Worker permissions
- **Firebase Auth**: Industry-standard security

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **UI Components**: Custom component library
- **State Management**: React Hooks
- **API Client**: Custom fetch wrapper with error handling

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **AI/ML Stack**:
  - **Gemini 1.5 Flash**: Generative AI for recommendations and insights
  - **YOLOv5**: Object detection for disease localization
  - **TensorFlow/Keras**: CNN for leaf classification
  - **Scikit-learn**: Random Forest models for pest/drought prediction
- **Computer Vision**: OpenCV for image preprocessing
- **Data Processing**: Pandas, NumPy
- **PDF Generation**: ReportLab
- **Database**: Firebase Firestore (real-time sync)
- **Authentication**: Firebase Admin SDK

### DevOps & Tools
- **Version Control**: Git
- **Package Management**: pnpm (frontend), pip (backend)
- **Environment**: python-dotenv for configuration
- **API Documentation**: FastAPI automatic OpenAPI/Swagger docs

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │ Scanner  │  │Simulator │  │ Market   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
└───────┼─────────────┼─────────────┼─────────────┼──────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                          │
                    REST API (FastAPI)
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │ Gemini  │      │   ML    │      │Firebase │
   │   AI    │      │ Models  │      │Firestore│
   └─────────┘      └─────────┘      └─────────┘
                          │
                    ┌────▼────┐
                    │   IoT   │
                    │ Sensors │
                    └─────────┘
```

### Project Structure

```
ChaiTea/
├── backend/                      # FastAPI Backend
│   ├── main.py                   # Core API logic (3000+ lines)
│   ├── requirements.txt          # Python dependencies
│   ├── .env                      # Environment variables (gitignored)
│   ├── models/                   # ML Models
│   │   ├── best.pt              # YOLOv5 disease detection model
│   │   ├── leaf_model.h5        # CNN leaf classifier
│   │   ├── pest_model.pkl       # Pest risk predictor
│   │   ├── drought_model.pkl    # Drought risk predictor
│   │   └── price_model.pkl      # Price forecasting model
│   └── test_*.py                # Testing utilities
│
├── frontend/                     # Next.js Frontend
│   ├── app/                     # App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── login/              # Authentication
│   │   └── dashboard/          # Main application
│   ├── components/              # React Components
│   │   ├── dashboard/          # Dashboard modules
│   │   │   ├── cultivation-intelligence.tsx
│   │   │   ├── leaf-quality-scanner.tsx
│   │   │   ├── farmer-action-simulator.tsx
│   │   │   ├── market-intelligence.tsx
│   │   │   └── chatbot-bubble.tsx
│   │   └── ui/                 # Reusable UI components
│   ├── lib/                    # Utilities
│   │   ├── firebase.ts         # Firebase config
│   │   └── api.ts              # API client
│   └── public/                 # Static assets
│
├── mock-iot/                    # IoT Simulator
│   ├── generator.js            # Sensor data generator
│   └── package.json
│
└── Documentation
    ├── README.md               # This file
    ├── AUTH_IMPLEMENTATION.md  # Authentication guide
    ├── YOLO_INTEGRATION.md     # YOLOv5 setup guide
    └── AI_RECOMMENDATIONS_DEBUG.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python**: 3.10 or higher
- **Node.js**: 18 or higher
- **pnpm**: Latest version (`npm install -g pnpm`)
- **Google Cloud Account**: For Firebase and Gemini API
- **Git**: For version control

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd ChaiTea
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3️⃣ Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Demo Account
DEMO_EMAIL=demo@chaitea.com

# Firebase Service Account
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your_client_cert_url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

**How to get credentials:**
1. **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Firebase**: Go to Firebase Console → Project Settings → Service Accounts → Generate New Private Key

### 4️⃣ Start the Backend

```bash
python -m uvicorn main:app --reload
```

Backend will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

### 5️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Frontend will be available at: `http://localhost:3000`

### 6️⃣ IoT Simulator (Optional)

To generate realistic sensor data:

```bash
cd mock-iot
npm install
node generator.js
```

This will populate Firestore with simulated sensor readings every 30 seconds.

---

## 📡 API Endpoints

### Cultivation Intelligence

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/cultivation` | Analyze environmental data | ❌ |
| `GET` | `/api/cultivation/latest` | Get latest IoT-based analysis | ✅ |
| `POST` | `/api/cultivation/aggregate` | Aggregate sensor readings | ❌ |
| `GET` | `/api/cultivation/smart-alert` | Check for crop stress alerts | ✅ |
| `GET` | `/api/farm/averages` | Get average sensor values | ✅ |
| `GET` | `/api/farm/soil-moisture-series` | 24h soil moisture data | ✅ |
| `GET` | `/api/farm/temperature-series` | 24h temperature data | ✅ |
| `GET` | `/api/farm/daily-metrics` | 7-day aggregated metrics | ✅ |

### Leaf Quality Analysis

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/leaf-quality` | Upload image for disease detection | ✅ |

**Request**: Multipart form data with image file

**Response**:
```json
{
  "grade": "Diseased",
  "disease_type": "Red Rust",
  "confidence": 0.94,
  "confidence_level": "High",
  "severity": "Moderate",
  "surface_analysis": {
    "green": 0.65,
    "yellow": 0.12,
    "brown": 0.18,
    "dark": 0.05
  },
  "yolo_detections": [
    {
      "disease_name": "red_rust",
      "confidence": 0.89,
      "bbox": {"xmin": 120, "ymin": 80, "xmax": 200, "ymax": 160}
    }
  ],
  "ai_recommendations": [
    "Apply copper-based fungicide immediately",
    "Improve air circulation by pruning",
    "Monitor adjacent plants for spread"
  ]
}
```

### Market Intelligence

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/market/kpis` | Current market KPIs | ❌ |
| `GET` | `/api/market/price-series` | Historical price data | ❌ |
| `GET` | `/api/market/demand-volatility` | Market trends | ❌ |
| `POST` | `/api/price-forecast` | Forecast future prices | ❌ |

### Farmer Simulator

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/simulate` | Run yield simulation | ❌ |
| `POST` | `/api/generate-pdf` | Generate PDF report | ❌ |

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Test Gemini API
python test_gemini.py

# Test AI recommendations
python test_ai_recs.py

# Test cultivation endpoint
python test_api.py

# Test all models
python test_models.py
```

### Manual Testing

1. **Login**: Use demo@chaitea.com or your Google account
2. **Cultivation Intelligence**: 
   - Switch to Manual mode
   - Enter: Moisture=45, Temp=22, Humidity=70, Rainfall=30
   - Click "Analyze Field Data"
   - Verify AI recommendations appear
3. **Leaf Scanner**:
   - Upload a tea leaf image
   - Check disease detection results
4. **Market Intelligence**:
   - View price forecasts and trends

---

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication → Google Sign-In
4. Create the following Firestore structure:

```
farms/
  └── demo_farm/
      ├── sensors/
      │   └── sensors_root/
      │       └── readings/
      │           └── {auto-id}
      ├── leaf_scans/
      │   └── {auto-id}
      └── pluckers/
          └── {auto-id}
```

### Model Files

Ensure these files exist in `backend/models/`:
- `best.pt` - YOLOv5 disease detection model
- `leaf_model.h5` - CNN leaf classifier
- `pest_model.pkl` - Pest risk model
- `drought_model.pkl` - Drought risk model
- `price_model.pkl` - Price forecasting model
- `class_labels.pkl` - Label mappings

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.10+

# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

**Frontend build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

**AI recommendations not showing:**
- Check browser console for errors
- Verify `GEMINI_API_KEY` in `.env`
- See `AI_RECOMMENDATIONS_DEBUG.md` for detailed debugging

**Firebase authentication errors:**
- Verify all Firebase credentials in `.env`
- Check Firebase Console for enabled auth methods
- Ensure Firestore rules allow read/write

**YOLOv5 model errors:**
- Ensure `best.pt` exists in `backend/models/`
- Install PyTorch: `pip install torch torchvision`
- Check model was trained with compatible YOLOv5 version

---

## 📊 Performance Metrics

- **API Response Time**: < 500ms (average)
- **Gemini AI Response**: 2-5 seconds
- **Image Analysis**: 3-7 seconds (includes YOLOv5 + CNN + HSV)
- **Real-time Updates**: 30-second intervals (IoT mode)
- **Concurrent Users**: Tested up to 50 simultaneous connections

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core cultivation intelligence
- ✅ AI leaf quality scanner
- ✅ Market intelligence
- ✅ Farmer simulator
- ✅ Basic authentication

### Phase 2 (Planned)
- [ ] Mobile app (React Native)
- [ ] WhatsApp bot for alerts
- [ ] Multi-language support (Assamese, Hindi)
- [ ] Weather API integration
- [ ] Drone imagery analysis
- [ ] Blockchain-based supply chain tracking

### Phase 3 (Future)
- [ ] Predictive maintenance for machinery
- [ ] Automated irrigation control
- [ ] Soil testing integration
- [ ] Cooperative marketplace
- [ ] Carbon credit tracking

---

## 🤝 Contributing

This is a proprietary project. For collaboration inquiries, please contact the development team.

---

## 📄 License

**Proprietary** - All rights reserved.

This software is the property of the CHAI-NET development team. Unauthorized copying, distribution, or modification is strictly prohibited.

---

## 👥 Team

Developed with ❤️ for the tea cultivation community of Assam.

---

## 📞 Support

For technical support or feature requests:
- Check the documentation in the `/docs` folder
- Review `AI_RECOMMENDATIONS_DEBUG.md` for debugging
- See `AUTH_IMPLEMENTATION.md` for authentication issues
- Consult `YOLO_INTEGRATION.md` for model setup

---

## 🙏 Acknowledgments

- **Google Gemini AI** for generative insights
- **Firebase** for real-time database and authentication
- **Ultralytics YOLOv5** for object detection
- **FastAPI** for the excellent Python web framework
- **Next.js** for the powerful React framework
- **Tea Research Association** for domain knowledge

---

<div align="center">

**Built for the future of sustainable tea cultivation** 🍃

</div>
