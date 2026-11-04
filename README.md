# Uganda Gold Expedition — Cloud Run & Firestore Deployment Guide

**App Context:** An executive due diligence, metallurgical assay verification, and anti-fraud intelligence portal for East African physical gold supply chains.

---

## 1. Required Environment Variables

Copy `.env.example` to `.env` for local development, or configure the following variables in **Google Cloud Run** (Variables & Secrets) and your build pipeline:

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `API_KEY` | Server (`server.ts`) | Google Gemini API key used by `new GoogleGenAI({ apiKey: process.env.API_KEY })` for AI Forensic Document Verification and multi-turn advisory. |
| `GEMINI_API_KEY` | Server (`server.ts`) | Alias for `API_KEY` (automatically mapped to `process.env.API_KEY` at startup). |
| `VITE_FIREBASE_API_KEY` | Client (`Vite`) | Firebase Web API key. |
| `VITE_FIREBASE_AUTH_DOMAIN` | Client (`Vite`) | Firebase Auth domain (`<project-id>.firebaseapp.com`). |
| `VITE_FIREBASE_PROJECT_ID` | Client (`Vite`) | Google Cloud / Firebase Project ID (`siz-football-academy-4bae6`). |
| `VITE_FIREBASE_STORAGE_BUCKET` | Client (`Vite`) | Firebase Storage bucket (`<project-id>.firebasestorage.app`). |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Client (`Vite`) | Firebase Cloud Messaging sender ID. |
| `VITE_FIREBASE_APP_ID` | Client (`Vite`) | Firebase Web App ID. |
| `VITE_FIREBASE_DATABASE_ID` | Client (`Vite`) | Firestore Database ID (defaults to `(default)` or provisioned named database). |
| `RELWORX_API_KEY` | Server (`server.ts`) | Relworx Visa & Mastercard gateway Bearer token. |
| `RELWORX_ACCOUNT_NO` | Server (`server.ts`) | Relworx merchant account number. |
| `WABA_PHONE_NUMBER_ID` | Server (`server.ts`) | Meta WhatsApp Business Cloud API Phone Number ID. |
| `WABA_ACCESS_TOKEN` | Server (`server.ts`) | Meta WhatsApp Business Cloud API Access Token. |

---

## 2. Firebase Console Setup (Firestore & Authentication)

1. **Enable Firestore Database:**
   - Open the [Firebase Console](https://console.firebase.google.com/) and select your project (`siz-football-academy-4bae6`).
   - Navigate to **Build → Firestore Database** and ensure the database is created in **Production mode**.
2. **Enable Google Authentication:**
   - Navigate to **Build → Authentication → Sign-in method**.
   - Enable the **Google** provider and configure your support email.
   - Under **Authentication → Settings → Authorized domains**, add your Cloud Run service domain (e.g. `*.run.app` and your custom domain).
3. **Deploy Firestore Security Rules & Composite Indexes:**
   ```bash
   # Install Firebase CLI if not already installed
   npm install -g firebase-tools

   # Authenticate and verify project alias in .firebaserc
   firebase login
   firebase use siz-football-academy-4bae6

   # Deploy production security rules and composite indexes
   firebase deploy --only firestore:rules,firestore:indexes
   ```

---

## 3. Deploying to Google Cloud Run

Build and deploy the multi-stage container (`Dockerfile`) directly to Cloud Run:

```bash
# 1. Set your GCP project and region
export PROJECT_ID="siz-football-academy-4bae6"
export REGION="europe-west2"
export SERVICE_NAME="uganda-gold-expedition"

gcloud config set project $PROJECT_ID

# 2. Build and deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars="API_KEY=YOUR_GEMINI_API_KEY,VITE_FIREBASE_PROJECT_ID=$PROJECT_ID"
```

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Start full-stack Express + Vite development server on port 3000
npm run dev

# Type-check and build production bundle
npm run lint
npm run build
```
