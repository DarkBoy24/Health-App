import { calculateBMI, getBMICategory, formatDate, getPercentage } from '@utils/calculations';

describe('Calculations', () => {
  describe('calculateBMI', () => {
    test('should calculate BMI correctly for cm', () => {
      const bmi = calculateBMI(70, 175, 'cm');
      expect(bmi).toBeCloseTo(22.9, 1);
    });

    test('should calculate BMI correctly for inches', () => {
      const bmi = calculateBMI(70, 69, 'ft-in'); // 69 inches = 5'9"
      expect(bmi).toBeCloseTo(23.9, 1);
    });

    test('should round to 1 decimal place', () => {
      const bmi = calculateBMI(70, 175, 'cm');
      expect(bmi.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(1);
    });
  });

  describe('getBMICategory', () => {
    test('should return Underweight for BMI < 18.5', () => {
      expect(getBMICategory(18)).toBe('Underweight');
    });

    test('should return Normal Weight for BMI 18.5-24.9', () => {
      expect(getBMICategory(22)).toBe('Normal Weight');
    });

    test('should return Overweight for BMI 25-29.9', () => {
      expect(getBMICategory(27)).toBe('Overweight');
    });

    test('should return Obese for BMI >= 30', () => {
      expect(getBMICategory(32)).toBe('Obese');
    });
  });

  describe('formatDate', () => {
    test('should format date to YYYY-MM-DD', () => {
      const date = new Date('2025-12-16');
      expect(formatDate(date)).toBe('2025-12-16');
    });

    test('should pad single digit month and day', () => {
      const date = new Date('2025-01-05');
      expect(formatDate(date)).toBe('2025-01-05');
    });
  });

  describe('getPercentage', () => {
    test('should calculate percentage correctly', () => {
      expect(getPercentage(50, 100)).toBe(50);
    });

    test('should cap at 100%', () => {
      expect(getPercentage(150, 100)).toBe(100);
    });

    test('should return 0 for target of 0', () => {
      expect(getPercentage(50, 0)).toBe(0);
    });

    test('should round to nearest integer', () => {
      expect(getPercentage(33, 100)).toBe(33);
      expect(getPercentage(66.6, 100)).toBe(67);
    });
  });
});
