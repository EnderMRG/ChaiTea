# CHAI-NET - Intelligent Tea Garden Management System 🍃

An intelligent IoT-powered platform for modern tea garden management that combines real-time sensor monitoring, AI-driven leaf quality analysis, and predictive analytics to optimize cultivation and maximize yields.

## 🌿 Key Features

### Core Intelligence
- **Cultivation Intelligence**: Real-time IoT monitoring of soil moisture, temperature, humidity, and rainfall with predictive health analysis.
- **AI Leaf Quality Scanner**: Advanced Computer Vision & Gemini AI analysis to detect disease (Red Rust, Blister Blight, etc.) and grade leaf quality automatically.
- **Farmer Simulator**: Interactive "What-If" scenario planning. Test different yield inputs and receive AI-generated financial projections and PDF reports.
- **AI Consequence Mirror**: A visual "Show Me the Future" tool. Compare "Standard" vs "AI-Optimized" approaches with predictive visualizations of profit, disease spread, and yield over 30 days.

### Operational Tools
- **Plucker Analytics**: Track daily production per plucker, efficiency metrics, and harvest schedules.
- **Smart Alerts**: Automated warnings for pest risks (e.g., Helopeltis), drought conditions, and fungal infections.
- **Market Intelligence**: AI-powered price forecasting and strategic market insights for the Guwahati auction center.

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, Recharts, Framer Motion
- **Backend**: FastAPI (Python), Pandas, NumPy, OpenCV, Google Gemini AI
- **Database**: Firebase Firestore (Real-time data syncing)
- **AI/ML**: Scikit-learn (Random Forest models), TensorFlow/Keras (Leaf CNN), Gemini 1.5 Flash (Generative insights)

### Project Structure
```
ChaiTea/
├── backend/                 # FastAPI backend server
│   ├── main.py             # Core API logic & AI integration
│   ├── requirements.txt    # Python dependencies
│   ├── .env                # Environment variables (gitignored)
│   └── models/             # ML models (PKL files)
├── frontend/               # Next.js web application
│   ├── app/                # App Router pages
│   ├── components/         # UI Components
│   └── lib/                # Config & Utilities
└── mock-iot/               # IoT Simulation
    └── generator.js        # Simulates sensor streams
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+ & pnpm
- Google Cloud Project (Firebase & Gemini API)

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Copy .env.example to .env and fill in your credentials
cp .env.example .env
# Edit .env with your Firebase credentials and Gemini API key

python -m uvicorn main:app --reload
```

**Environment Variables Required** (in `backend/.env`):
- `GEMINI_API_KEY`: Your Google Gemini API key
- `DEMO_EMAIL`: Demo account email (default: demo@chaitea.com)
- Firebase Service Account credentials (see `.env.example` for all required fields)

### 2. Frontend Setup
```bash
cd frontend
pnpm install
pnpm dev
```

### 3. IoT Simulator (Optional)
To generate fake sensor data:
```bash
cd mock-iot
node generator.js
```

## 📊 API & AI Services
- **POST /api/leaf-quality**: Upload an image -> Get disease classification & treatment advice.
- **POST /api/cultivation**: Send sensor data -> Get health score & risk alerts.
- **GET /api/farm/daily-metrics**: Historical aggregation of environmental data.
- **PDF Generation**: Automated PDF reports for yield scenarios.

## 🔐 Security & Privacy
- **Firebase Auth**: Secure user authentication.
- **RBAC**: Role-based access for Managers vs. Workers.
- **Data Encapsulation**: Private API endpoints.

---
**Status**: Active Development 🚧
**License**: Proprietary
