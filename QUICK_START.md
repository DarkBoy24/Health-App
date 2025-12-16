# Expo Health Tracker - Quick Start Guide

## ✅ Prerequisites Verified

- Node.js: v24.11.1 ✅
- npm: v11.6.2 ✅

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your Firebase credentials
# Get these from Firebase Console > Project Settings
```

### 3. Start Development

```bash
# Start Expo development server
npm start
```

### 4. Run on Device/Emulator

**Option A: Physical Device (Easiest)**

1. Install Expo Go app on your phone
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
2. Scan the QR code from terminal

**Option B: Android Emulator**

```bash
npm run android
```

**Option C: iOS Simulator** (Mac only)

```bash
npm run ios
```

**Option D: Web Browser**

```bash
npm run web
```

## 📱 What You'll See

The app will start with a simple splash screen showing:

```
HealthTracker 🏥
Your Wellness Journey
```

## 🔧 Common Commands

```bash
npm start          # Start dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in browser
npm test           # Run tests
npm run tsc        # Type check
```

## 🔥 Firebase Setup

1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Copy config to `.env` file

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.

## ❓ Troubleshooting

**Can't connect to Metro?**

- Ensure phone and computer on same WiFi
- Try: `npm start -- --tunnel`

**Module errors?**

- Run: `npm install`
- Clear: `npm start -- --clear`

## 📚 Next Steps

After successful setup:

1. Configure Firebase (see FIREBASE_SETUP.md)
2. Fill in .env file
3. Start building UI screens
4. Test authentication flow

## 🎉 You're All Set!

Once dependencies are installed and Firebase is configured, you're ready to develop!

---

**Need Help?** Check README.md for detailed documentation
