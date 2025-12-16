// Calculate BMI
export const calculateBMI = (
  weight: number,
  height: number,
  heightUnit: 'cm' | 'ft-in'
): number => {
  let heightInMeters: number;

  if (heightUnit === 'cm') {
    heightInMeters = height / 100;
  } else {
    // Convert inches to meters
    heightInMeters = height * 0.0254;
  }

  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
};

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal Weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Get BMI category color
export const getBMIColor = (bmi: number): string => {
  if (bmi < 18.5) return '#FFA500'; // Orange
  if (bmi < 25) return '#50C878'; // Green
  if (bmi < 30) return '#FFA500'; // Orange
  return '#FF6B6B'; // Red
};

// Calculate daily calorie needs (Mifflin-St Jeor Equation)
export const calculateDailyCalories = (
  weight: number, // kg
  height: number, // cm
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active' = 'moderate'
): number => {
  let bmr: number;

  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9,
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

// Calculate water intake recommendation (ml)
export const calculateWaterIntake = (weight: number): number => {
  // Simple formula: 35ml per kg of body weight
  return Math.round(weight * 35);
};

// Format date to YYYY-MM-DD
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Parse YYYY-MM-DD to Date
export const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Get date range for analytics
export const getDateRange = (
  period: 'week' | 'month' | 'year'
): { startDate: string; endDate: string } => {
  const endDate = new Date();
  const startDate = new Date();

  switch (period) {
    case 'week':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case 'month':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case 'year':
      startDate.setDate(endDate.getDate() - 365);
      break;
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};

// Format display date
export const formatDisplayDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseDate(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Check if date is today
export const isToday = (date: string): boolean => {
  return date === formatDate(new Date());
};

// Get percentage
export const getPercentage = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};
