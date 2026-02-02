# YOLOv5 Disease Detection Integration

## Overview
Successfully integrated a YOLOv5 object detection model for tea leaf disease detection alongside the existing CNN classification model.

## What Was Added

### Backend Changes (`backend/main.py`)

1. **New Import**
   - Added `import torch` for PyTorch support

2. **Model Loading**
   ```python
   yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path='models/best.pt', force_reload=False)
   yolo_model.conf = 0.25  # Confidence threshold
   yolo_model.iou = 0.45   # NMS IOU threshold
   ```

3. **New Function: `detect_disease_with_yolo()`**
   - Runs YOLOv5 inference on leaf images
   - Detects disease regions with bounding boxes
   - Returns list of detections with:
     - Disease name (Blister Blight, Brown Blight, Gray Blight, Red Rust)
     - Confidence score (0-1)
     - Bounding box coordinates (xmin, ymin, xmax, ymax)

4. **Updated `/api/leaf-quality` Endpoint**
   - Now runs YOLO detection on the original image before CNN classification
   - Returns `yolo_detections` in the response
   - Both models work together:
     - **CNN**: Overall leaf classification (Healthy/Diseased)
     - **YOLO**: Precise disease localization with bounding boxes

### Frontend Changes (`frontend/components/dashboard/leaf-quality-scanner.tsx`)

1. **New State**
   ```typescript
   const [yoloDetections, setYoloDetections] = useState<any[] | null>(null);
   ```

2. **Updated Upload Handler**
   - Extracts YOLO detections from API response
   - Stores them in state for display

3. **New UI Card: "Disease Detection (Object Detection Model)"**
   - Displays when YOLO detections are found
   - Shows for each detected disease region:
     - Disease name (capitalized)
     - Confidence percentage
     - Bounding box location and size
     - Severity indicator (High/Medium/Low based on confidence)
   - Color-coded severity bars:
     - Red (>80%): High severity
     - Orange (50-80%): Medium severity
     - Yellow (<50%): Low severity

### Dependencies (`backend/requirements.txt`)

Added:
```
torch>=2.0.0
torchvision>=0.15.0
```

## How It Works

### Detection Flow

1. **User uploads leaf image** → Frontend sends to `/api/leaf-quality`

2. **Backend processes image**:
   - YOLO runs on original image → Detects disease regions with bounding boxes
   - CNN runs on cropped image → Classifies overall leaf health
   - HSV analysis → Surface color analysis

3. **Backend returns**:
   ```json
   {
     "grade": "Diseased",
     "disease_type": "Brown Blight",
     "cnn_prediction": "brown blight",
     "confidence": 0.92,
     "yolo_detections": [
       {
         "disease_name": "Brown Blight",
         "confidence": 0.87,
         "bbox": {
           "xmin": 120,
           "ymin": 85,
           "xmax": 245,
           "ymax": 190
         }
       }
     ]
   }
   ```

4. **Frontend displays**:
   - Existing cards show CNN classification results
   - New card shows YOLO object detection results with bounding box info

## Supported Diseases (YOLO Model)

- **Blister Blight**
- **Brown Blight**
- **Gray Blight**
- **Red Rust**

## Installation

To use this feature, install the new dependencies:

```bash
cd backend
pip install torch>=2.0.0 torchvision>=0.15.0
```

The YOLOv5 model will be automatically downloaded from Ultralytics on first run.

## Benefits

1. **Dual Detection**: Combines classification (CNN) with localization (YOLO)
2. **Precise Localization**: Shows exactly where diseases are on the leaf
3. **Multiple Detections**: Can detect multiple disease regions in one image
4. **Confidence Scores**: Provides confidence for each detected region
5. **Better Diagnosis**: Helps farmers understand disease severity and location

## UI Features

- **Numbered regions**: Each detection is numbered for easy reference
- **Bounding box info**: Shows exact pixel coordinates and size
- **Severity visualization**: Color-coded progress bars
- **Responsive design**: Works on all screen sizes
- **Dark mode support**: Fully themed for dark mode

## Notes

- YOLO runs on the **original image** to preserve spatial information
- CNN runs on a **cropped and resized** image for classification
- If YOLO finds no diseases, the card won't be displayed
- The model uses a 25% confidence threshold (adjustable in code)
