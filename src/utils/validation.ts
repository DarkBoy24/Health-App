import { HealthLog } from '@models/types';

// Validate health log inputs
export const validateHealthLog = (log: Partial<HealthLog>): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Steps validation
  if (log.steps !== undefined) {
    if (log.steps < 0) {
      errors.push('Steps cannot be negative');
    }
    if (log.steps > 100000) {
      errors.push('Steps seems unrealistic (max 100,000)');
    }
  }

  // Heart rate validation
  if (log.heartRate !== undefined) {
    if (log.heartRate < 30 || log.heartRate > 250) {
      errors.push('Heart rate must be between 30-250 BPM');
    }
  }

  // Sleep duration validation
  if (log.sleepDuration !== undefined) {
    if (log.sleepDuration < 0 || log.sleepDuration > 24) {
      errors.push('Sleep duration must be between 0-24 hours');
    }
  }

  // Calories validation
  if (log.caloriesConsumed !== undefined && log.caloriesConsumed < 0) {
    errors.push('Calories consumed cannot be negative');
  }

  if (log.caloriesBurned !== undefined && log.caloriesBurned < 0) {
    errors.push('Calories burned cannot be negative');
  }

  // Water intake validation
  if (log.waterIntake !== undefined && (log.waterIntake < 0 || log.waterIntake > 10000)) {
    errors.push('Water intake must be between 0-10,000 ml');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate age
export const validateAge = (age: number): boolean => {
  return age >= 13 && age <= 120;
};

// Validate height
export const validateHeight = (height: number, unit: 'cm' | 'ft-in'): boolean => {
  if (unit === 'cm') {
    return height >= 50 && height <= 300;
  } else {
    // Inches
    return height >= 20 && height <= 120;
  }
};

// Validate weight
export const validateWeight = (weight: number, unit: 'kg' | 'lbs'): boolean => {
  if (unit === 'kg') {
    return weight >= 20 && weight <= 300;
  } else {
    return weight >= 44 && weight <= 660;
  }
};
