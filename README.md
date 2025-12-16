# HealthTracker - Expo Health Tracking App

A cross-platform mobile application built with **Expo** and **React Native** for tracking daily health metrics including steps, calories, water intake, sleep, and heart rate.

## Features

- 🔐 **Secure Authentication**: Email/password authentication with Firebase
- 👤 **User Profiles**: Personal health information and preferences
- 📊 **Daily Tracking**: Log steps, calories, water, sleep, and heart rate
- 📈 **Analytics**: Visual charts and progress tracking
- 📅 **Historical Records**: View and edit past entries
- 🎯 **Goal Setting**: Set and track health goals
- 🔒 **Privacy First**: AES-256 encryption for sensitive data
- 🌙 **Dark Mode**: Support for light and dark themes
- 📱 **Cross-Platform**: iOS, Android, and Web support

## Why Expo?

✅ **Easier Setup** - No Xcode or Android Studio needed for development  
✅ **Instant Testing** - Use Expo Go app on your phone to test instantly  
✅ **Built-in Libraries** - Secure storage, crypto, and more included  
✅ **Better DX** - Hot reload, debugging, and development tools  
✅ **Easy Deployment** - Build and deploy with EAS (Expo Application Services)

## Tech Stack

- **Framework**: Expo SDK 52 + React Native
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Charts**: React Native Chart Kit
- **UI Components**: React Native Paper
- **Encryption**: CryptoJS + Expo SecureStore

## Prerequisites

- **Node.js** (v18 or later) ✅ You have v24.11.1
- **npm** (v7 or later) ✅ You have v11.6.2
- **Expo Go App** (Optional for testing on device)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing
3. Enable **Authentication** (Email/Password)
4. Create a **Firestore Database**
5. Get your config from Project Settings

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Start Development Server

```bash
npm start
```

This will open Expo Dev Tools in your browser. From there you can:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan QR code with Expo Go app to test on your phone

## Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Open on Android
npm run ios        # Open on iOS
npm run web        # Open in web browser
npm test           # Run tests
npm run tsc        # TypeScript type checking
npm run lint       # Run ESLint
```

## Project Structure

```
health-tracker/
├── App.tsx               # Main app entry point
├── app.json             # Expo configuration
├── src/
│   ├── screens/          # UI screens
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   │   ├── auth.service.ts
│   │   └── health.service.ts
│   ├── store/            # Redux store
│   ├── models/           # TypeScript interfaces
│   │   └── types.ts
│   ├── utils/            # Utility functions
│   │   ├── encryption.ts    (Expo SecureStore)
│   │   ├── calculations.ts
│   │   └── validation.ts
│   ├── constants/        # App constants
│   │   └── index.ts
│   └── config/           # Configuration
│       └── firebase.ts
├── firebase/             # Firebase configuration
│   ├── firestore.rules
│   └── firestore.indexes.json
└── assets/              # Images, fonts, etc.
```

## Testing on Device

### Using Expo Go (Easiest)

1. Install **Expo Go** on your phone
2. Run `npm start`
3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app
4. App loads instantly on your device!

### Using Emulator/Simulator

**Android**:

```bash
npm run android
```

**iOS** (Mac only):

```bash
npm run ios
```

## Building for Production

### Using EAS Build (Recommended)

1. Install EAS CLI:

```bash
npm install -g eas-cli
```

2. Login to Expo:

```bash
eas login
```

3. Configure build:

```bash
eas build:configure
```

4. Build for Android:

```bash
eas build --platform android
```

5. Build for iOS:

```bash
eas build --platform ios
```

## Firebase Setup

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase configuration instructions.

## Key Features Implementation

### Authentication

```typescript
import authService from "@services/auth.service";

// Sign up
const user = await authService.signUp(email, password);

// Sign in
const user = await authService.signIn(email, password);
```

### Health Data Tracking

```typescript
import healthService from "@services/health.service";

// Save health log
await healthService.saveHealthLog(userId, {
  date: "2025-12-16",
  steps: 10000,
  caloriesConsumed: 2000,
  waterIntake: 2500,
  sleepDuration: 8,
  heartRate: 72,
});
```

### Encryption (Expo SecureStore)

```typescript
import { encryptObject, decryptObject } from "@utils/encryption";

// Encrypt sensitive data
const encrypted = await encryptObject({ ssn: "123-45-6789" });

// Decrypt data
const decrypted = await decryptObject(encrypted);
```

## Privacy & Security

- **Data Encryption**: AES-256 encryption for sensitive data
- **Secure Storage**: Expo SecureStore for encryption keys
- **Firebase Security**: Strict Firestore security rules
- **GDPR Compliant**: Privacy-first architecture

## Troubleshooting

### "Expo Go cannot connect to Metro"

- Make sure your phone and computer are on the same WiFi network
- Try running with tunnel: `npm start -- --tunnel`

### Firebase not connecting

- Verify `.env` file has correct credentials
- Check Firebase project settings
- Ensure Firestore is enabled

### Module not found errors

- Run `npm install` again
- Clear cache: `npm start -- --clear`
- Delete `node_modules` and reinstall

## Development Roadmap

### MVP (Current Phase)

- ✅ Expo setup
- ✅ Firebase integration
- ✅ Authentication backend
- ✅ Health tracking backend
- 🔄 UI screens (Next)

### Phase 2

- Advanced visualizations
- Goal tracking
- Push notifications
- Dark mode refinement

### Phase 3

- AI health insights
- Wearable device integration
- Social features
- Premium features

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Medical Disclaimer

⚠️ **IMPORTANT**: This app is for general wellness tracking only. It is NOT a medical device and should not be used for medical diagnosis or treatment. Always consult healthcare professionals for medical advice.

## License

MIT License - See LICENSE file for details

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/health-tracker/issues)
- **Email**: support@healthtracker.com
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)

---

**Built with ❤️ using Expo + React Native + Firebase**
