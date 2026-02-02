# Quick Reference: Intelligent Action Plan System

## API Endpoints

### Generate Action Plan
```http
POST http://localhost:8000/api/action-plan/generate
Content-Type: application/json
```

**Response Fields:**
- `composite_score`: Overall farm performance (0-100)
- `environmental_data`: Sensor analysis with factor breakdown
- `leaf_scan_summary`: Crop health from today's scans
- `market_analysis`: Current market conditions and signals
- `recommended_actions`: Strategic recommendations by time horizon
- `projected_outcomes`: Expected yield, profit, risk, harvest timing
- `ai_insight`: Natural language executive summary

### Get Action Plan History
```http
GET http://localhost:8000/api/action-plan/history?limit=10
```

## Scoring System

### Composite Score Calculation
```
Composite = (Environmental × 0.40) + (Crop Health × 0.35) + (Market × 0.25)
```

### Environmental Score (40% weight)
- **Soil Moisture** (35%): Optimal 55-65%
- **Temperature** (25%): Optimal 18-26°C
- **Humidity** (20%): Optimal 65-75%
- **Rainfall** (20%): Optimal 40-80mm/week

### Crop Health Score (35% weight)
- Based on leaf scan grades: Healthy (100), Stressed (60), Diseased (30)
- Adjusted by confidence level and severity
- Tracks disease count and high-severity cases

### Market Opportunity Score (25% weight)
- **Opportunity** (85): High demand, stable prices
- **Neutral** (60): Moderate conditions
- **Watch** (50): Low demand, stable prices
- **Risk** (35): High volatility

## Recommendation Categories

### 1. Immediate Actions (0-3 days)
**Priority Levels:** Critical > High > Medium > Low

**Examples:**
- Irrigation adjustments (soil moisture < 50% or > 70%)
- Disease treatment (high-severity cases detected)
- Temperature management (> 28°C)

### 2. Short-term Strategy (1-2 weeks)
**Examples:**
- Intensive crop monitoring (health score < 70)
- Fertilization optimization (favorable conditions)

### 3. Market Timing (2-4 weeks)
**Examples:**
- Harvest delay (+7-10 days for price increase)
- Harvest acceleration (-3 days for high volatility)
- Flexible scheduling (low demand periods)

### 4. Long-term Planning (1-3 months)
**Examples:**
- Infrastructure investment (environmental score < 60)
- IPM program implementation (disease detected)
- Production expansion (market score ≥ 70)

## Projected Outcomes

### Composite Score → Outcomes Mapping

| Composite Score | Yield Change | Profit Change | Risk Level |
|----------------|--------------|---------------|------------|
| ≥ 80           | +8-12%       | +₹5,000-8,000 | Low        |
| 65-79          | +4-7%        | +₹2,500-4,500 | Low        |
| 50-64          | +1-3%        | +₹500-2,000   | Medium     |
| < 50           | -2-0%        | -₹1,000-0     | High       |

### Harvest Timing

| Market Signal | Adjustment |
|---------------|------------|
| Opportunity   | +7 days    |
| Risk          | -3 days    |
| Watch/Neutral | No change  |

## Data Sources

### Firestore Collections
```
farms/{farm_id}/sensors/sensors_root/readings
  - Latest sensor reading for environmental data

farms/{farm_id}/leaf_scans
  - Today's leaf scans (timestamp >= today 00:00 UTC)

farms/{farm_id}/action_plans
  - Historical action plans with timestamps
```

### Excel Data
```
teadata.xlsx
  - Market prices by location (Guwahati primary)
  - Weekly price trends and forecasts
```

## Frontend Integration

### Component: `farmer-action-simulator.tsx`

**Key State:**
```typescript
const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
```

**Data Mapping:**
```typescript
environmental_data → context display (soil, temp, humidity)
leaf_scan_summary → leaf quality metrics
market_analysis → market insights
recommended_actions → action cards
projected_outcomes → outcome projections
```

## Common Use Cases

### Use Case 1: Daily Farm Assessment
1. Call `/api/action-plan/generate`
2. Review composite score and status
3. Check immediate actions for critical issues
4. Review AI insight for strategic focus

### Use Case 2: Harvest Planning
1. Generate action plan
2. Check `market_analysis.signal`
3. Review `recommended_actions.market_timing`
4. Use `projected_outcomes.harvestTiming` for decision

### Use Case 3: Disease Response
1. Upload leaf scan via `/api/leaf-quality`
2. Generate action plan
3. Check `leaf_scan_summary.disease_count`
4. Review `recommended_actions.immediate_actions` for treatment

### Use Case 4: Performance Tracking
1. Call `/api/action-plan/history`
2. Compare composite scores over time
3. Analyze recommendation effectiveness
4. Identify trends in environmental/crop/market scores

## Troubleshooting

### No Sensor Data
- **Symptom:** `environmental_data.score = 50`, status = "unknown"
- **Solution:** Ensure sensor readings exist in Firestore
- **Check:** `/api/farm/averages` endpoint

### No Leaf Scans
- **Symptom:** `leaf_scan_summary.scans_analyzed = 0`
- **Solution:** Upload leaf scans via `/api/leaf-quality`
- **Note:** Only today's scans are included

### No Market Data
- **Symptom:** `market_analysis.status = "unknown"`
- **Solution:** Verify `teadata.xlsx` is loaded and has ≥3 rows
- **Check:** `/api/market/kpis` endpoint

### Generic Recommendations
- **Symptom:** Only default actions shown
- **Cause:** Insufficient data or all metrics in optimal range
- **Solution:** Normal behavior when no specific issues detected
