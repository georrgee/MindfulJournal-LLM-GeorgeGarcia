import React, { useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebase';
import { AuthContext } from './AuthContext';
import { AuthProviderProps, AuthContextType } from './types';

const AuthProvider: React.FC<AuthProviderProps>= ({ children }) => {

  // * MARK - Variables & Hooks
  const [user, setUser]                     = useState<User | null>(null);
  const [isLoading, setIsLoading]           = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError]                   = useState<string | null>(null);

  // * MARK - (useEffects) Component Life Cycles

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      setUser(user);
      setIsInitializing(false);

      if (user) {
        await AsyncStorage.setItem('userToken', await user.getIdToken());
      } else {
        await AsyncStorage.removeItem('userToken');
      }
    });

    return unsubscribe;
  }, []);

  // * MARK - Functions

  const clearError = () => setError(null);

  const handleAuthError = (error: any) => {

    console.error('Firebase Auth Error (AuthProvider.tsx):', error);

    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password is too weak. Please choose a stronger password.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };

    const message = errorMessages[error.code] || 'An unexpected error occurred. Please try again.';
    setError(message);
  };

  const handleUserSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSignUp = async (email: string, password: string) => {

    try {
      setIsLoading(true);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCredential.user); // Sends an email verification
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSignOut = async () => {

    try {
      setIsLoading(true);
      setError(null);
      await firebaseSignOut(auth);

    } catch (error) {
      handleAuthError(error);
      throw error;

    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {  

    try {
      setIsLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);

    } catch (error) {
      handleAuthError(error);
      throw error;

    } finally {
      setIsLoading(false);
    }
  };


  const handleResendEmailVerification = async () => {
    
    try {
      if (!user) throw new Error('No user logged in');
      setIsLoading(true);
      setError(null);
      await sendEmailVerification(user);

    } catch (error) {
      handleAuthError(error);
      throw error;

    } finally {
      setIsLoading(false);
    }
  };

  // * MARK - Context Type
  const value: AuthContextType = {
    user,
    isLoading,
    isInitializing,
    handleUserSignIn,
    handleUserSignUp,
    handleUserSignOut,
    handleResetPassword,
    handleResendEmailVerification,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;