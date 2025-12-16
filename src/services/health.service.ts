import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  Firestore,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { HealthLog, UserProfile } from '@models/types';
import { calculateBMI, formatDate } from '@utils/calculations';

class HealthService {
  private db: Firestore;

  constructor() {
    this.db = db;
  }

  // Create or update health log
  async saveHealthLog(
    userId: string,
    logData: Partial<HealthLog>
  ): Promise<string> {
    try {
      const logId = logData.logId || `${userId}_${logData.date}`;
      const logRef = doc(this.db, 'users', userId, 'healthLogs', logId);

      // Get user profile for BMI calculation
      const profile = await this.getUserProfile(userId);
      let bmi = 0;
      
      if (profile) {
        bmi = calculateBMI(profile.weight, profile.height, profile.heightUnit);
      }

      const now = new Date();
      const healthLog: Partial<HealthLog> = {
        logId,
        userId,
        date: logData.date!,
        steps: logData.steps || 0,
        caloriesConsumed: logData.caloriesConsumed || 0,
        caloriesBurned: logData.caloriesBurned || 0,
        waterIntake: logData.waterIntake || 0,
        sleepDuration: logData.sleepDuration || 0,
        heartRate: logData.heartRate || 0,
        bmi,
        notes: logData.notes,
        dataSource: logData.dataSource || 'manual',
        updatedAt: now,
      };

      // Add createdAt only for new logs
      if (!logData.logId) {
        (healthLog as any).createdAt = now;
      }

      await setDoc(logRef, {
        ...healthLog,
        createdAt: logData.createdAt ? Timestamp.fromDate(logData.createdAt) : Timestamp.fromDate(now),
        updatedAt: Timestamp.fromDate(now),
      });

      return logId;
    } catch (error: any) {
      console.error('Failed to save health log:', error);
      throw new Error(`Failed to save health log: ${error.message}`);
    }
  }

  // Get health log by date
  async getHealthLogByDate(
    userId: string,
    date: string
  ): Promise<HealthLog | null> {
    try {
      const logsRef = collection(this.db, 'users', userId, 'healthLogs');
      const q = query(logsRef, where('date', '==', date), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return null;

      const docData = querySnapshot.docs[0].data();

      return {
        ...docData,
        createdAt: docData.createdAt.toDate(),
        updatedAt: docData.updatedAt.toDate(),
      } as HealthLog;
    } catch (error: any) {
      console.error('Failed to get health log:', error);
      throw new Error(`Failed to get health log: ${error.message}`);
    }
  }

  // Get recent health logs
  async getRecentHealthLogs(
    userId: string,
    limitCount: number = 30
  ): Promise<HealthLog[]> {
    try {
      const logsRef = collection(this.db, 'users', userId, 'healthLogs');
      const q = query(logsRef, orderBy('date', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnapshot.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as HealthLog;
      });
    } catch (error: any) {
      console.error('Failed to get health logs:', error);
      throw new Error(`Failed to get health logs: ${error.message}`);
    }
  }

  // Get health logs by date range
  async getHealthLogsByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<HealthLog[]> {
    try {
      const logsRef = collection(this.db, 'users', userId, 'healthLogs');
      const q = query(
        logsRef,
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
        const data = docSnapshot.data();
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as HealthLog;
      });
    } catch (error: any) {
      console.error('Failed to get health logs by date range:', error);
      throw new Error(`Failed to get health logs: ${error.message}`);
    }
  }

  // Delete health log
  async deleteHealthLog(userId: string, logId: string): Promise<void> {
    try {
      const logRef = doc(this.db, 'users', userId, 'healthLogs', logId);
      await setDoc(logRef, { deleted: true, deletedAt: new Date() }, { merge: true });
    } catch (error: any) {
      console.error('Failed to delete health log:', error);
      throw new Error(`Failed to delete health log: ${error.message}`);
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(this.db, 'users', userId, 'profile', 'main');
      const profileDoc = await getDoc(profileRef);

      if (!profileDoc.exists()) {
        return null;
      }

      const data = profileDoc.data();
      return {
        ...data,
        updatedAt: data.updatedAt.toDate(),
      } as UserProfile;
    } catch (error: any) {
      console.error('Failed to get user profile:', error);
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }

  // Create or update user profile
  async saveUserProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<void> {
    try {
      const profileRef = doc(this.db, 'users', userId, 'profile', 'main');

      const profile: Partial<UserProfile> = {
        ...profileData,
        uid: userId,
        updatedAt: new Date(),
      };

      await setDoc(profileRef, {
        ...profile,
        updatedAt: Timestamp.fromDate(profile.updatedAt!),
      }, { merge: true });
    } catch (error: any) {
      console.error('Failed to save profile:', error);
      throw new Error(`Failed to save profile: ${error.message}`);
    }
  }

  // Get today's log (convenience method)
  async getTodayLog(userId: string): Promise<HealthLog | null> {
    const today = formatDate(new Date());
    return this.getHealthLogByDate(userId, today);
  }
}

export default new HealthService();
