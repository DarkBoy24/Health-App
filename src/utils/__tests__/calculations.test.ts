import { calculateBMI, getBMICategory, formatDate, getPercentage } from '@utils/calculations';

describe('Calculations', () => {
  describe('calculateBMI', () => {
    it('should calculate BMI correctly for cm', () => {
      const bmi = calculateBMI(70, 175, 'cm');
      expect(bmi).toBeCloseTo(22.9, 1);
    });

    it('should calculate BMI correctly for inches', () => {
      const bmi = calculateBMI(70, 69, 'ft-in'); // 69 inches = 5'9"
      expect(bmi).toBeCloseTo(23.9, 1);
    });

    it('should round to 1 decimal place', () => {
      const bmi = calculateBMI(70, 175, 'cm');
      const decimalPlaces = bmi.toString().split('.')[1]?.length || 0;
      expect(decimalPlaces).toBeLessThanOrEqual(1);
    });
  });

  describe('getBMICategory', () => {
    it('should return Underweight for BMI < 18.5', () => {
      expect(getBMICategory(18)).toBe('Underweight');
    });

    it('should return Normal Weight for BMI 18.5-24.9', () => {
      expect(getBMICategory(22)).toBe('Normal Weight');
    });

    it('should return Overweight for BMI 25-29.9', () => {
      expect(getBMICategory(27)).toBe('Overweight');
    });

    it('should return Obese for BMI >= 30', () => {
      expect(getBMICategory(32)).toBe('Obese');
    });
  });

  describe('formatDate', () => {
    it('should format date to YYYY-MM-DD', () => {
      const date = new Date('2025-12-16');
      expect(formatDate(date)).toBe('2025-12-16');
    });

    it('should pad single digit month and day', () => {
      const date = new Date('2025-01-05');
      expect(formatDate(date)).toBe('2025-01-05');
    });
  });

  describe('getPercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(getPercentage(50, 100)).toBe(50);
    });

    it('should cap at 100%', () => {
      expect(getPercentage(150, 100)).toBe(100);
    });

    it('should return 0 for target of 0', () => {
      expect(getPercentage(50, 0)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(getPercentage(33, 100)).toBe(33);
      expect(getPercentage(66.6, 100)).toBe(67);
    });
  });
});

