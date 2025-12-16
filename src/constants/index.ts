// Colors
export const Colors = {
  primary: '#4A90E2',
  secondary: '#50C878',
  accent: '#FF6B6B',
  background: '#F8F9FA',
  darkBackground: '#1A1A2E',
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  white: '#FFFFFF',
  black: '#000000',
  success: '#50C878',
  warning: '#FFA500',
  error: '#FF6B6B',
  info: '#4A90E2',
  border: '#E8E8E8',
  disabled: '#BDC3C7',
};

// Health metric targets
export const HealthTargets = {
  steps: 10000,
  caloriesBurned: 500,
  caloriesConsumed: 2000,
  waterIntake: 2500, // ml
  sleepDuration: 8, // hours
  heartRate: {
    min: 60,
    max: 100,
  },
};

// BMI Ranges
export const BMIRanges = {
  underweight: { max: 18.5, color: Colors.warning, label: 'Underweight' },
  normal: { min: 18.5, max: 25, color: Colors.success, label: 'Normal Weight' },
  overweight: { min: 25, max: 30, color: Colors.warning, label: 'Overweight' },
  obese: { min: 30, color: Colors.error, label: 'Obese' },
};

// App Constants
export const AppConstants = {
  appName: 'HealthTracker',
  version: '1.0.0',
  maxLogsToDisplay: 30,
  maxAgeLimit: 120,
  minAgeLimit: 13,
  privacyPolicyVersion: '1.0.0',
};

// Storage Keys
export const StorageKeys = {
  user: 'user',
  profile: 'profile',
  encryptionKey: 'encryption_key',
  theme: 'theme',
  onboardingComplete: 'onboarding_complete',
};

// Activity Levels
export const ActivityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Light (exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (exercise 3-5 days/week)' },
  { value: 'active', label: 'Active (exercise 6-7 days/week)' },
  { value: 'very-active', label: 'Very Active (intense exercise daily)' },
];

// Units
export const Units = {
  height: ['cm', 'ft-in'],
  weight: ['kg', 'lbs'],
  water: ['ml', 'L', 'oz', 'cups'],
  distance: ['km', 'mi'],
};

// Goal Types
export const GoalTypes = [
  { value: 'steps', label: 'Daily Steps', icon: '🚶', unit: 'steps' },
  { value: 'weight', label: 'Weight Loss/Gain', icon: '⚖️', unit: 'kg' },
  { value: 'calories', label: 'Calorie Intake', icon: '🔥', unit: 'kcal' },
  { value: 'water', label: 'Water Intake', icon: '💧', unit: 'ml' },
  { value: 'sleep', label: 'Sleep Duration', icon: '😴', unit: 'hours' },
  { value: 'custom', label: 'Custom Goal', icon: '🎯', unit: '' },
];

// Chart Colors
export const ChartColors = {
  steps: '#4A90E2',
  calories: '#FF6B6B',
  water: '#50C878',
  sleep: '#9B59B6',
  heartRate: '#E74C3C',
  weight: '#F39C12',
};
