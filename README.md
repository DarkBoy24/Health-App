# HealthTracker - Health Tracking Mobile Application

A cross-platform mobile application for tracking daily health metrics including steps, calories, water intake, sleep, and heart rate. Built with React Native, TypeScript, and Firebase.

## Features

- 🔐 **Secure Authentication**: Email/password authentication with Firebase
- 👤 **User Profiles**: Personal health information and preferences
- 📊 **Daily Tracking**: Log steps, calories, water, sleep, and heart rate
- 📈 **Analytics**: Visual charts and progress tracking
- 📅 **Historical Records**: View and edit past entries
- 🎯 **Goal Setting**: Set and track health goals
- 🔒 **Privacy First**: AES-256 encryption for sensitive data
- 🌙 **Dark Mode**: Support for light and dark themes

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **Charts**: React Native Chart Kit
- **UI Components**: React Native Paper
- **Encryption**: CryptoJS + React Native Keychain

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **For iOS**: 
  - macOS
  - Xcode (latest version)
  - CocoaPods: `sudo gem install cocoapods`
- **For Android**:
  - Android Studio
  - Android SDK (API level 31 or higher)
  - Java Development Kit (JDK 11)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/HealthTracker.git
cd HealthTracker
```

### 2. Install Dependencies

```bash
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

### 3. Firebase Configuration

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the steps
3. Enable **Authentication** (Email/Password provider)
4. Create a **Firestore Database** (Start in test mode)
5. Register your app (iOS and/or Android)

#### Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and fill in your Firebase credentials:
```
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

#### Deploy Firebase Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore (with existing firestore.rules and firestore.indexes.json)
# - Choose your Firebase project

# Deploy Firestore rules
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 4. Run the Application

#### iOS

```bash
npm run ios

# Or for a specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

#### Android

```bash
# Start Metro bundler in one terminal
npm start

# In another terminal, run Android
npm run android
```

## Project Structure

```
HealthTracker/
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
│   │   ├── encryption.ts
│   │   ├── calculations.ts
│   │   └── validation.ts
│   ├── constants/        # App constants
│   │   └── index.ts
│   └── config/           # Configuration files
│       └── firebase.ts
├── firebase/             # Firebase configuration
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── firebase.json
├── android/              # Android native code
├── ios/                  # iOS native code
└── package.json
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run ios` - Run iOS app
- `npm run android` - Run Android app
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run tsc` - TypeScript type checking

## Key Features Implementation

### Authentication

```typescript
import authService from '@services/auth.service';

// Sign up
const user = await authService.signUp(email, password);

// Sign in
const user = await authService.signIn(email, password);

// Sign out
await authService.signOut();
```

### Health Data Tracking

```typescript
import healthService from '@services/health.service';

// Save health log
await healthService.saveHealthLog(userId, {
  date: '2025-12-16',
  steps: 10000,
  caloriesConsumed: 2000,
  waterIntake: 2500,
  sleepDuration: 8,
  heartRate: 72,
});

// Get today's log
const todayLog = await healthService.getTodayLog(userId);

// Get recent logs
const logs = await healthService.getRecentHealthLogs(userId, 30);
```

### BMI Calculation

```typescript
import { calculateBMI, getBMICategory } from '@utils/calculations';

const bmi = calculateBMI(70, 175, 'cm'); // 22.9
const category = getBMICategory(bmi); // "Normal Weight"
```

## Privacy & Security

- **Data Encryption**: All sensitive health data is encrypted using AES-256
- **Secure Storage**: Encryption keys stored in device keychain
- **Firebase Security**: Strict Firestore security rules ensure data isolation
- **No Third-Party Sharing**: Your data is never shared or sold
- **GDPR Compliant**: Built with privacy regulations in mind

## Development Roadmap

### MVP (Completed)
- ✅ Authentication system
- ✅ User profile management
- ✅ Daily health tracking
- ✅ Basic analytics
- ✅ Historical records

### Phase 2 (Planned)
- 📊 Advanced visualizations
- 🎯 Goal tracking
- 🔔 Push notifications
- 🌙 Dark mode
- 📤 Data export

### Phase 3 (Future)
- 🤖 AI health insights
- ⌚ Wearable device integration
- 🍎 Apple Health / Google Fit sync
- 📱 Social features
- 💼 Premium features

## Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test auth.service.test.ts
```

## Troubleshooting

### iOS Build Issues

```bash
# Clean build
cd ios && xcodebuild clean && cd ..
rm -rf ios/build
pod install --repo-update

# Reset Metro cache
npx react-native start --reset-cache
```

### Android Build Issues

```bash
# Clean Gradle
cd android && ./gradlew clean && cd ..

# Reset cache
rm -rf android/.gradle
npx react-native start --reset-cache
```

### Firebase Connection Issues

- Verify `.env` file has correct Firebase credentials
- Check Firebase project settings match your configuration
- Ensure Firestore is enabled in Firebase Console
- Verify security rules are deployed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

⚠️ **IMPORTANT MEDICAL DISCLAIMER**

This application is designed for general wellness tracking and personal health monitoring purposes only. This app is NOT:
- A medical device
- A diagnostic tool
- A substitute for professional medical advice
- Intended to treat, cure, or prevent any disease

Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment. Do not rely solely on this app for health decisions.

## Support

For support, email [support@healthtracker.com](mailto:support@healthtracker.com) or open an issue in the GitHub repository.

## Acknowledgments

- Firebase for backend services
- React Native community for excellent tools and libraries
- All contributors who help improve this project

---

**Built with ❤️ for health and wellness**
