## Repository Structure

```
wandersecure/
├── README.md
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── package.json
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci-cd.yml
│       ├── mobile-build.yml
│       └── blockchain-deploy.yml
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── system-design/
│       ├── database-schema.md
│       ├── blockchain-design.md
│       └── api-specifications.md
├── frontend/
│   ├── web-dashboard/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── AuthorityDashboard.jsx
│   │   │   │   │   ├── TouristHeatmap.jsx
│   │   │   │   │   ├── IncidentManagement.jsx
│   │   │   │   │   └── RealTimeMonitor.jsx
│   │   │   │   ├── maps/
│   │   │   │   │   ├── GeofenceViewer.jsx
│   │   │   │   │   ├── LocationTracker.jsx
│   │   │   │   │   └── SafetyZones.jsx
│   │   │   │   └── alerts/
│   │   │   │       ├── AlertPanel.jsx
│   │   │   │       └── NotificationCenter.jsx
│   │   │   ├── services/
│   │   │   │   ├── api.js
│   │   │   │   ├── websocket.js
│   │   │   │   └── mapService.js
│   │   │   ├── utils/
│   │   │   │   ├── geospatial.js
│   │   │   │   └── auth.js
│   │   │   └── App.jsx
│   │   ├── package.json
│   │   └── vite.config.js
│   └── mobile-app/
│       ├── android/
│       ├── ios/
│       ├── src/
│       │   ├── screens/
│       │   │   ├── auth/
│       │   │   │   ├── Registration.tsx
│       │   │   │   └── DigitalIDSetup.tsx
│       │   │   ├── home/
│       │   │   │   ├── Dashboard.tsx
│       │   │   │   ├── SOSButton.tsx
│       │   │   │   └── SafetyScore.tsx
│       │   │   ├── location/
│       │   │   │   ├── LocationTracker.tsx
│       │   │   │   └── GeofenceAlert.tsx
│       │   │   └── emergency/
│       │   │       ├── EmergencyContact.tsx
│       │   │       └── IncidentReport.tsx
│       │   ├── services/
│       │   │   ├── LocationService.ts
│       │   │   ├── BlockchainService.ts
│       │   │   ├── GeofencingService.ts
│       │   │   └── NotificationService.ts
│       │   ├── components/
│       │   │   ├── maps/
│       │   │   │   ├── MapView.tsx
│       │   │   │   └── SafetyOverlay.tsx
│       │   │   └── common/
│       │   │       ├── Button.tsx
│       │   │       └── Alert.tsx
│       │   └── utils/
│       │       ├── crypto.ts
│       │       ├── location.ts
│       │       └── validation.ts
│       ├── package.json
│       └── react-native.config.js
├── backend/
│   ├── api-gateway/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── auth.js
│   │   │   │   ├── tourists.js
│   │   │   │   ├── locations.js
│   │   │   │   ├── alerts.js
│   │   │   │   └── dashboard.js
│   │   │   ├── middleware/
│   │   │   │   ├── auth.js
│   │   │   │   ├── rateLimit.js
│   │   │   │   └── validation.js
│   │   │   ├── services/
│   │   │   │   ├── blockchain.js
│   │   │   │   ├── notification.js
│   │   │   │   └── websocket.js
│   │   │   └── app.js
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── location-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   ├── locationController.js
│   │   │   │   └── geofenceController.js
│   │   │   ├── services/
│   │   │   │   ├── gpsService.js
│   │   │   │   ├── geofencingService.js
│   │   │   │   └── postgisService.js
│   │   │   ├── models/
│   │   │   │   ├── Location.js
│   │   │   │   └── Geofence.js
│   │   │   └── utils/
│   │   │       ├── spatialQueries.js
│   │   │       └── distanceCalculator.js
│   │   └── package.json
│   ├── identity-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   ├── registrationController.js
│   │   │   │   └── verificationController.js
│   │   │   ├── services/
│   │   │   │   ├── kycService.js
│   │   │   │   ├── digitalIdService.js
│   │   │   │   └── encryptionService.js
│   │   │   └── models/
│   │   │       ├── Tourist.js
│   │   │       └── DigitalID.js
│   │   └── package.json
│   ├── alert-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   ├── sosController.js
│   │   │   │   └── anomalyController.js
│   │   │   ├── services/
│   │   │   │   ├── fcmService.js
│   │   │   │   ├── smsService.js
│   │   │   │   └── emailService.js
│   │   │   └── utils/
│   │   │       ├── alertPriority.js
│   │   │       └── escalationMatrix.js
│   │   └── package.json
│   └── shared/
│       ├── database/
│       │   ├── migrations/
│       │   ├── seeds/
│       │   └── models/
│       ├── config/
│       │   ├── database.js
│       │   ├── redis.js
│       │   └── blockchain.js
│       └── utils/
│           ├── logger.js
│           ├── validation.js
│           └── constants.js
├── blockchain/
│   ├── contracts/
│   │   ├── TouristRegistry.sol
│   │   ├── EmergencyAlert.sol
│   │   ├── GeofenceManager.sol
│   │   └── EventLogger.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   ├── migrate.js
│   │   └── setup.js
│   ├── test/
│   │   ├── TouristRegistry.test.js
│   │   └── EmergencyAlert.test.js
│   ├── hardhat.config.js
│   └── package.json
├── ai-ml/
│   ├── anomaly-detection/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── location_anomaly.py
│   │   │   │   ├── behavior_analysis.py
│   │   │   │   └── isolation_forest.py
│   │   │   ├── preprocessing/
│   │   │   │   ├── data_cleaner.py
│   │   │   │   └── feature_engineer.py
│   │   │   └── inference/
│   │   │       ├── real_time_detector.py
│   │   │       └── batch_processor.py
│   │   ├── notebooks/
│   │   │   ├── exploratory_analysis.ipynb
│   │   │   └── model_training.ipynb
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── computer-vision/
│   │   ├── src/
│   │   │   ├── yolo/
│   │   │   │   ├── fire_smoke_detection.py
│   │   │   │   ├── crowd_counting.py
│   │   │   │   └── face_recognition.py
│   │   │   ├── preprocessing/
│   │   │   │   ├── image_processor.py
│   │   │   │   └── video_processor.py
│   │   │   └── models/
│   │   │       ├── csrnet/
│   │   │       ├── yolov8/
│   │   │       └── face_embeddings/
│   │   ├── weights/
│   │   ├── config/
│   │   └── requirements.txt
│   └── nlp-pipeline/
│       ├── src/
│       │   ├── social_media/
│       │   │   ├── twitter_scraper.py
│       │   │   ├── reddit_scraper.py
│       │   │   └── data_collector.py
│       │   ├── processing/
│       │   │   ├── vader_sentiment.py
│       │   │   ├── spacy_ner.py
│       │   │   ├── h3_grid.py
│       │   │   └── keyword_detector.py
│       │   ├── streaming/
│       │   │   ├── spark_processor.py
│       │   │   └── flink_processor.py
│       │   └── models/
│       │       ├── text_classifier.py
│       │       └── anomaly_scorer.py
│       ├── config/
│       │   ├── official_handles.json
│       │   ├── keywords.json
│       │   └── grid_config.json
│       └── requirements.txt
├── infrastructure/
│   ├── kubernetes/
│   │   ├── namespace.yaml
│   │   ├── configmaps/
│   │   ├── deployments/
│   │   │   ├── api-gateway.yaml
│   │   │   ├── location-service.yaml
│   │   │   ├── identity-service.yaml
│   │   │   └── alert-service.yaml
│   │   ├── services/
│   │   └── ingress/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── modules/
│   │       ├── vpc/
│   │       ├── rds/
│   │       ├── redis/
│   │       └── eks/
│   ├── monitoring/
│   │   ├── prometheus/
│   │   ├── grafana/
│   │   └── elk-stack/
│   └── scripts/
│       ├── setup-env.sh
│       ├── deploy.sh
│       └── backup.sh
├── databases/
│   ├── postgresql/
│   │   ├── schema/
│   │   │   ├── tourists.sql
│   │   │   ├── locations.sql
│   │   │   ├── geofences.sql
│   │   │   ├── alerts.sql
│   │   │   └── incidents.sql
│   │   ├── migrations/
│   │   └── seeds/
│   ├── redis/
│   │   └── config/
│   └── postgis/
│       ├── spatial-functions.sql
│       └── geofence-queries.sql
├── testing/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   │   ├── mobile/
│   │   └── web/
│   ├── performance/
│   └── security/
├── scripts/
│   ├── setup/
│   │   ├── init-project.sh
│   │   ├── install-dependencies.sh
│   │   └── setup-blockchain.sh
│   ├── deployment/
│   │   ├── build-mobile.sh
│   │   ├── deploy-services.sh
│   │   └── update-contracts.sh
│   └── maintenance/
│       ├── backup-db.sh
│       ├── cleanup-logs.sh
│       └── health-check.sh
└── configs/
    ├── environment/
    │   ├── development.env
    │   ├── staging.env
    │   └── production.env
    ├── nginx/
    ├── apache/
    └── ssl/
```

## Directory Descriptions

### Frontend (`/frontend`)
- **web-dashboard/**: React-based authority dashboard for real-time monitoring
- **mobile-app/**: React Native tourist mobile application

### Backend (`/backend`)
- **api-gateway/**: Main API gateway with authentication and routing
- **location-service/**: GPS tracking and geofencing service
- **identity-service/**: Digital ID management and KYC verification
- **alert-service/**: SOS and notification management
- **shared/**: Common utilities, database models, and configurations

### Blockchain (`/blockchain`)
- Smart contracts for tourist registry, emergency alerts, and event logging
- Deployment scripts and test files
- Uses Hardhat for development and testing

### AI/ML (`/ai-ml`)
- **anomaly-detection/**: Location and behavior anomaly detection models
- **computer-vision/**: YOLO models for fire/smoke detection, crowd counting, face recognition
- **nlp-pipeline/**: Social media monitoring with VADER sentiment analysis and H3 grid processing

### Infrastructure (`/infrastructure`)
- **kubernetes/**: Container orchestration configurations
- **terraform/**: Infrastructure as Code for cloud deployment
- **monitoring/**: Prometheus, Grafana, and ELK stack configurations

### Databases (`/databases`)
- **postgresql/**: Main database schemas and migrations
- **postgis/**: Geospatial functions and queries
- **redis/**: Caching configurations

### Component Mapping to Project Requirements

1. **Tourist Mobile App** → `/frontend/mobile-app`
2. **CCTV Networking** → `/ai-ml/computer-vision`
3. **PostGIS and GEE** → `/databases/postgis` & `/backend/location-service`
4. **Authority Dashboard** → `/frontend/web-dashboard`
5. **FCM/SMS Alerts** → `/backend/alert-service`
6. **AI Anomaly Detection** → `/ai-ml/anomaly-detection`
7. **Computer Vision** → `/ai-ml/computer-vision`
8. **NLP Pipeline** → `/ai-ml/nlp-pipeline`
9. **Event Correlation Engine** → `/backend/shared/utils`
10. **Trust and Verification Layer** → `/blockchain`
