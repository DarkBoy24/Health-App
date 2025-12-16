import CryptoJS from 'crypto-js';
import * as SecureStore from 'expo-secure-store';

const ENCRYPTION_KEY = 'health_app_encryption_key';

// Generate encryption key (do this once per user)
export const generateEncryptionKey = async (): Promise<string> => {
  const key = CryptoJS.lib.WordArray.random(256 / 8).toString();
  await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
  return key;
};

// Get stored encryption key
export const getEncryptionKey = async (): Promise<string | null> => {
  try {
    const key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
    return key;
  } catch (error) {
    console.error('Failed to get encryption key:', error);
    return null;
  }
};

// Encrypt data
export const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

// Decrypt data
export const decryptData = (encrypted: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Encrypt object
export const encryptObject = async <T>(obj: T): Promise<string> => {
  const key = await getEncryptionKey();
  if (!key) {
    throw new Error('Encryption key not found');
  }
  const jsonString = JSON.stringify(obj);
  return encryptData(jsonString, key);
};

// Decrypt object
export const decryptObject = async <T>(encrypted: string): Promise<T> => {
  const key = await getEncryptionKey();
  if (!key) {
    throw new Error('Encryption key not found');
  }
  const jsonString = decryptData(encrypted, key);
  return JSON.parse(jsonString) as T;
};

