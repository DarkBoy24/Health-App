import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  Auth Auth,
} from 'firebase/auth';
import { doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { auth, db } from '@config/firebase';
import { AuthUser } from '@models/types';

class AuthService {
  private auth: Auth;
  private db: Firestore;

  constructor() {
    this.auth = auth;
    this.db = db;
  }

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Create user document in Firestore
      await this.createUserDocument(userCredential.user);

      return userCredential.user;
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Update last login
      await this.updateLastLogin(userCredential.user.uid);

      return userCredential.user;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('Failed to sign out');
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Create user document in Firestore
  private async createUserDocument(user: User): Promise<void> {
    const userDoc: Partial<AuthUser> = {
      uid: user.uid,
      email: user.email!,
      emailVerified: user.emailVerified,
      agreedToTerms: false,
      dataRetentionConsent: false,
    };

    await setDoc(doc(this.db, 'users', user.uid), {
      ...userDoc,
      createdAt: new Date(),
      lastLogin: new Date(),
    });
  }

  // Update last login timestamp
  private async updateLastLogin(uid: string): Promise<void> {
    await setDoc(
      doc(this.db, 'users', uid),
      { lastLogin: new Date() },
      { merge: true }
    );
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  // Get user data from Firestore
  async getUserData(uid: string): Promise<AuthUser | null> {
    try {
      const userDoc = await getDoc(doc(this.db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as AuthUser;
      }
      return null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }

  // Update user consent
  async updateConsent(
    uid: string,
    agreedToTerms: boolean,
    dataRetentionConsent: boolean
  ): Promise<void> {
    await setDoc(
      doc(this.db, 'users', uid),
      {
        agreedToTerms,
        dataRetentionConsent,
        consentUpdatedAt: new Date(),
      },
      { merge: true }
    );
  }

  // Get user-friendly error messages
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export default new AuthService();
