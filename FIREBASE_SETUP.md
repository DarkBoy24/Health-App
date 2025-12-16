# FIREBASE_SETUP_INSTRUCTIONS

## Complete Firebase Setup Guide

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a project"
3. Enter project name: `HealthTracker` (or your preferred name)
4. **Optional**: Enable Google Analytics (recommended)
5. Click "Create project"

---

### 2. Add Mobile Apps to Firebase

#### For Android:
1. In Firebase Console, click "Add app" → Android icon
2. **Android package name**: `com.healthtracker` (or your chosen name)
3. **App nickname**: HealthTracker Android
4. Click "Register app"
5. Download `google-services.json`
6. Place it in `android/app/` directory
7. Follow the Firebase SDK setup steps (already done in our project)

#### For iOS:
1. In Firebase Console, click "Add app" → iOS icon
2. **iOS bundle ID**: `com.healthtracker` (must match Xcode project)
3. **App nickname**: HealthTracker iOS
4. Click "Register app"
5. Download `GoogleService-Info.plist`
6. Add it to your Xcode project (drag into Xcode)
7. Follow the Firebase SDK setup steps (already done in our project)

---

### 3. Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click "Get Started"
3. Go to **Sign-in method** tab
4. Click **Email/Password**
5. **Enable** both options:
   - Email/Password
   - Email link (passwordless sign-in) - Optional
6. Click "Save"

#### Optional: Add Google Sign-In
1. Still in Sign-in method, click **Google**
2. Enable and configure
3. Add your support email
4. Click "Save"

---

### 4. Create Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click "Create database"
3. **Select starting mode**: 
   - Choose **"Start in test mode"** for development
   - We'll deploy proper security rules later
4. **Choose location**: Select closest to your users
   - `us-central1` (US)
   - `europe-west1` (Europe)
   - `asia-southeast1` (Asia)
5. Click "Enable"

---

### 5. Get Firebase Configuration

1. In Firebase Console, click **Project Settings** (⚙️ gear icon)
2. Scroll down to "Your apps" section
3. Select your Web app (or create one if needed)
4. In "SDK setup and configuration", select **Config**
5. Copy the `firebaseConfig` object

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "healthtracker-xxxxx.firebaseapp.com",
  projectId: "healthtracker-xxxxx",
  storageBucket: "healthtracker-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx",
  measurementId: "G-XXXXXXXXXX"
};
```

---

### 6. Configure Environment Variables

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your Firebase credentials:
   ```
   FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   FIREBASE_AUTH_DOMAIN=healthtracker-xxxxx.firebaseapp.com
   FIREBASE_PROJECT_ID=healthtracker-xxxxx
   FIREBASE_STORAGE_BUCKET=healthtracker-xxxxx.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789012
   FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
   FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Important**: Never commit `.env` to version control!

---

### 7. Deploy Firestore Security Rules

1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   
4. Select:
   - ☑ Firestore: Configure security rules and indexes files
   - Choose "Use an existing project"
   - Select your HealthTracker project
   - **Firestore rules file**: `firebase/firestore.rules` (default or custom path)
   - **Firestore indexes file**: `firebase/firestore.indexes.json`

5. Deploy security rules and indexes:
   ```bash
   firebase deploy --only firestore
   ```

You should see:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/healthtracker-xxxxx/overview
```

---

### 8. Verify Setup

#### Test Authentication:
1. Run your app: `npm run ios` or `npm run android`
2. Try to sign up with email/password
3. Check Firebase Console → Authentication → Users
4. New user should appear

#### Test Firestore:
1. Log a health entry in the app
2. Check Firebase Console → Firestore Database
3. You should see:
   ```
   users/
     └── {userId}/
         └── healthLogs/
             └── {logId}
   ```

---

### 9. Production Security (Before Launch)

1. Update Firestore rules to remove test mode:
   ```javascript
   // Remove this from firestore.rules:
   allow read, write: if request.time < timestamp.date(2024, 3, 1);
   
   // Our custom rules will handle security
   ```

2. Deploy updated rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

3. Enable App Check (protection against abuse):
   - Go to Firebase Console → App Check
   - Register your app
   - Enable reCAPTCHA for web
   - Enable App Attest (iOS) / Play Integrity (Android)

---

### 10. Optional: Enable Firebase Analytics

1. Already enabled if you chose it during project creation
2. View analytics: Firebase Console → Analytics
3. Track custom events in your app:
   ```typescript
   import { analytics } from '@config/firebase';
   import { logEvent } from 'firebase/analytics';
   
   logEvent(analytics, 'health_log_created');
   ```

---

### 11. Troubleshooting

#### "Firebase: Error (auth/configuration-not-found)"
- Check `.env` file exists and has correct values
- Restart Metro bundler: `npm start -- --reset-cache`

#### "Firestore: Missing or insufficient permissions"
- Verify security rules are deployed
- Check user is authenticated
- Ensure userId matches Firebase Auth UID

#### "Cannot read property 'initializeApp'"
- Clear cache: `npm start -- --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`

#### iOS: "Pod install failed"
- Update CocoaPods: `sudo gem install cocoapods`
- Clean and reinstall: `cd ios && pod deintegrate && pod install`

#### Android: "google-services.json not found"
- Ensure file is in `android/app/`
- Clean build: `cd android && ./gradlew clean`

---

### 12. Useful Firebase CLI Commands

```bash
# View current project
firebase projects:list

# Switch project
firebase use healthtracker-xxxxx

# Deploy specific services
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only functions

# View logs
firebase functions:log

# Open Firebase Console
firebase open
```

---

### 13. Monitoring & Limits

#### Free Tier (Spark Plan):
- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1GB storage

#### Upgrade to Blaze (Pay-as-you-go):
- Unlimited reads/writes
- First 50K reads free/day
- $0.06 per 100K reads
- $0.18 per 100K writes

**Monitor usage**: Firebase Console → Usage and billing

---

## Quick Reference

| Task | Command |
|------|---------|
| Install Firebase CLI | `npm install -g firebase-tools` |
| Login | `firebase login` |
| Init project | `firebase init` |
| Deploy rules | `firebase deploy --only firestore` |
| View console | [console.firebase.google.com](https://console.firebase.google.com/) |

---

## Security Checklist

- [x] Firestore security rules deployed
- [x] User data isolated by UID
- [x] Input validation in rules
- [x] Email verification enabled
- [ ] App Check enabled (before production)
- [ ] Monitoring alerts set up
- [ ] Usage limits configured

---

**Your Firebase backend is now ready! 🎉**

Next: Run `npm install` and start building the UI!
