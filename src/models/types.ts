// User Profile
export interface UserProfile {
  uid: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  height: number;
  weight: number;
  heightUnit: 'cm' | 'ft-in';
  weightUnit: 'kg' | 'lbs';
  avatarUrl?: string;
  timezone?: string;
  updatedAt: Date;
}

// Health Log
export interface HealthLog {
  logId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  steps: number;
  caloriesConsumed: number;
  caloriesBurned: number;
  waterIntake: number; // ml
  sleepDuration: number; // hours
  heartRate: number; // BPM
  bmi: number;
  notes?: string;
  dataSource?: 'manual' | 'device' | 'imported';
  createdAt: Date;
  updatedAt: Date;
}

// User Goal
export interface UserGoal {
  goalId: string;
  userId: string;
  goalType: 'steps' | 'weight' | 'calories' | 'water' | 'sleep' | 'custom';
  targetValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  active: boolean;
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Auth User
export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  agreedToTerms: boolean;
  dataRetentionConsent: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Login: undefined;
  Signup: undefined;
  Onboarding: undefined;
  ProfileSetup: undefined;
  Main: undefined;
  Dashboard: undefined;
  TrackingInput: { date?: string };
  Analytics: undefined;
  History: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type BottomTabParamList = {
  Dashboard: undefined;
  Analytics: undefined;
  History: undefined;
  Profile: undefined;
};
