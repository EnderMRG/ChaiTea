'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Upload, CheckCircle, AlertCircle, Leaf, TrendingUp, Lightbulb } from 'lucide-react';


const diseaseSeverityMap: Record<string, number> = {
  healthy: 5,
  'red leaf spot': 75,
  'brown blight': 65,
  anthracnose: 80,
  'bird eye spot': 60,
  'algal leaf': 55,
  'gray blight': 70,
  'white spot': 50,
};

const cleanGeminiText = (text: string) => {
  return text
    .replace(/\*\*/g, '')          // remove **
    .replace(/\s+/g, ' ')          // normalize spaces
    .replace(/Action:/gi, '')      // remove Action label if present
    .trim();
};

type LeafAIRec = {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
};

export function parseLeafAIRecommendations(recs: string[]): LeafAIRec[] {
  const results: LeafAIRec[] = [];
  let lastRec: LeafAIRec | null = null;

  recs.forEach((raw) => {
    const cleaned = raw.replace(/\*\*/g, '').trim();

    // Handle "Why:" lines → append to previous recommendation
    if (cleaned.toLowerCase().startsWith('why') && lastRec) {
      lastRec.description += ' ' + cleaned.replace(/^why:\s*/i, '');
      return;
    }

    const [titlePart, ...rest] = cleaned.split(':');
    const description = rest.join(':').trim();

    const lower = cleaned.toLowerCase();
    const priority: 'high' | 'medium' | 'low' =
      lower.includes('immediate') ||
      lower.includes('confirm') ||
      lower.includes('fungicide')
        ? 'high'
        : lower.includes('optimize') ||
          lower.includes('review')
        ? 'medium'
        : 'low';

    const rec: LeafAIRec = {
      title: titlePart.trim(),
      description,
      priority,
    };

    results.push(rec);
    lastRec = rec;
  });

  return results;
}



const inferPriority = (text: string) => {
  if (
    text.toLowerCase().includes('immediate') ||
    text.toLowerCase().includes('remove') ||
    text.toLowerCase().includes('fungicide') ||
    text.toLowerCase().includes('destroy')
  ) {
    return 'high';
  }

  if (
    text.toLowerCase().includes('monitor') ||
    text.toLowerCase().includes('improve') ||
    text.toLowerCase().includes('adjust')
  ) {
    return 'medium';
  }

  return 'low';
};



export default function LeafQualityScanner() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [recentScansState, setRecentScansState] = useState<any[]>([]);

  const totalScans = recentScansState.length;

  const latestScan = recentScansState[0];

  const avgGrade = latestScan
  ? latestScan.grade === 'diseased'
    ? latestScan.cnn_prediction ?? 'Disease Detected'
    : 'Healthy'
  : '--';

  const qualityScore = latestScan
    ? `${latestScan.confidence}%`
    : '--';

  const rejectionRate =
    totalScans === 0
      ? '--'
      : `${Math.round(
          (recentScansState.filter(
            (s) => s.grade !== 'healthy'
          ).length /
            totalScans) *
            100
        )}%`;
        

  const handleUpload = async (file: File) => {
    try {
      setScanning(true);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:8000/api/leaf-quality', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Inference failed');

      const data = await res.json();
      console.log('LEAF API RESPONSE:', data);
      setResult(data);

      const confidencePercent = Math.round(data.confidence * 100);

      const normalizedGrade = data.grade.toLowerCase();

      const newScan = {
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        location: 'Uploaded Sample',
        imageId: file.name,
            
        grade: normalizedGrade,                  // "diseased" | "healthy"
        disease_type: data.disease_type ?? null, // 👈 ADD THIS
        decision_source: data.decision_source,   // 👈 ADD THIS
        cnn_prediction: data.cnn_prediction?.toLowerCase() ?? null,
            
        confidence: confidencePercent,
            
        color: normalizedGrade === 'healthy'
          ? '#10b981'
          : '#ef4444',
            
        issues:
          normalizedGrade === 'healthy'
            ? []
            : [data.disease_type ?? 'Disease detected'],
      };



      console.log("🧾 FRONTEND newScan object:", newScan);

      

      setRecentScansState((prev) => [newScan, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Backend unavailable or ML error');
    } finally {
      setScanning(false);
    }
  };

  const severity = diseaseSeverityMap[latestScan?.grade] ?? 60;

  const conditionMetrics = latestScan
    ? [
        {
          metric: 'Color Uniformity',
          score: Math.max(40, 100 - severity),
        },
        {
          metric: 'Surface Integrity',
          score: Math.max(35, 95 - severity),
        },
        {
          metric: 'Disease Presence',
          score: severity,
        },
      ]
    : [];



  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Leaf Quality Scanner</h2>
        <p className="text-muted-foreground mt-1">
          AI-powered leaf analysis using Gemini Vision API for premium quality grading
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">

          {/* 🔁 CONDITIONAL CONTENT */}
          {!previewUrl ? (
            <>
              {/* Icon */}
              <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
          
              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Upload Leaf Images for Analysis
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Send leaf samples for instant AI-powered quality grading and disease detection
                </p>
              </div>
            </>
          ) : (
            /* ✅ IMAGE INSIDE THE BOX */
            <div className="relative w-full max-w-md">
              <img
                src={previewUrl}
                alt="Leaf preview"
                className="w-full rounded-xl border"
              />

              {scanning && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                  <p className="text-white font-medium animate-pulse">
                    Analyzing leaf…
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="leaf-upload"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setPreviewUrl(URL.createObjectURL(file));
                handleUpload(file);
              }
            }}
          />

          {/* ✅ BUTTON ALWAYS VISIBLE */}
          <Button
            onClick={() => document.getElementById('leaf-upload')?.click()}
            disabled={scanning}
            className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
          >
            <Upload className="h-4 w-4 mr-2" />
            {scanning ? 'Analyzing...' : 'Upload & Analyze'}
          </Button>
        </div>
      </Card>
          


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Leaf Health Status</p>

          <p
            className={`mt-2 text-2xl font-bold ${
              latestScan?.grade === 'healthy'
                ? 'text-green-600'
                : latestScan
                ? 'text-red-600'
                : 'text-muted-foreground'
            }`}
          >
            {latestScan
              ? latestScan.grade === 'healthy'
                ? 'Healthy'
                : 'Disease Detected'
              : '--'}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Latest Result</p>
                    
          <p className="text-2xl font-bold text-foreground mt-2 capitalize">
            {!latestScan
              ? '--'
              : latestScan.grade === 'healthy'
                ? 'Healthy'
                : latestScan.disease_type
                  ? latestScan.disease_type
                  : 'Disease Detected'}
          </p>
            
          {latestScan?.decision_source && (
            <p className="text-xs text-muted-foreground mt-1">
              Decision source: {latestScan.decision_source}
            </p>
          )}
        </Card>


        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Quality Score</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {qualityScore}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Rejection Rate</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {rejectionRate}
          </p>
        </Card>
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-foreground mb-4">
            Disease Confidence
          </h3>
                    
          <div className="relative w-40 h-40">
            <svg className="w-full h-full rotate-[-90deg]">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#16a34a"
                strokeWidth="12"
                fill="none"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={
                  (1 - (latestScan?.confidence ?? 0) / 100) *
                  2 *
                  Math.PI *
                  70
                }
                strokeLinecap="round"
              />
            </svg>
              
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-foreground">
                {latestScan ? `${latestScan.confidence}%` : '--'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Model Confidence
              </p>
            </div>
          </div>
              
          {/* Interpretation */}
          <p className="mt-4 text-sm font-medium text-green-600">
            {latestScan?.confidence > 85
              ? 'High Confidence Prediction'
              : 'Moderate Confidence Prediction'}
          </p>
        </Card>
            

        {/* Quality Metrics */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Leaf Condition Indicators
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              layout="vertical"
              data={conditionMetrics}
              margin={{ top: 12, right: 30, left: 24, bottom: 12 }}
            >
              {/* Light vertical guide lines */}
              <CartesianGrid
                stroke="#e5e7eb"
                strokeDasharray="3 3"
                horizontal={false}
              />

              {/* X Axis scale */}
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />

              {/* Y Axis labels aligned with thick bars */}
              <YAxis
                type="category"
                dataKey="metric"
                axisLine={false}
                tickLine={false}
                width={150}
                tick={{
                  fill: '#374151',
                  fontSize: 17,
                  dy: 0,        
                }}
              />

              {/* No hover noise */}
              <Tooltip cursor={false} />
        
              <Bar
                dataKey="score"
                fill="#34a853"
                barSize={35}                
                radius={[4, 4, 4, 4]}       
                background={{
                  fill: '#f3f4f6',
                  radius: 4,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>         

        
      </div>

      

      {/* AI Recommendations */}
      <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground text-lg">
            AI Recommendations for Quality Improvement
          </h3>
        </div>

        {!result && (
          <p className="text-sm text-muted-foreground">
            Run leaf analysis to generate AI-powered quality recommendations.
          </p>
        )}

        {scanning && (
          <p className="text-sm text-muted-foreground">
            Generating AI insights…
          </p>
        )}

        {Array.isArray(result?.ai_recommendations) && (
          <div className="space-y-4">
            {parseLeafAIRecommendations(result.ai_recommendations).map(
              (rec, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border bg-white p-4"
                >
                  {/* Header row */}
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-foreground">
                      Recommendation {idx + 1}
                    </p>
              
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        rec.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : rec.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                    
                  {/* Bold title */}
                  <p className="font-medium text-foreground">
                    <span className="font-semibold">
                      {rec.title}
                    </span>
                    :
                  </p>
                    
                  {/* Description */}
                  {rec.description && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        )}       
      </Card>
    </div>
  );
}
