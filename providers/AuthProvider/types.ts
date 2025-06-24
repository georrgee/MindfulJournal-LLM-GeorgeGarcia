import React from 'react';

import { User } from "firebase/auth";

export interface AuthContextType {
  user:                          User | null;
  isLoading:                     boolean;
  isInitializing:                boolean;
  handleUserSignIn:              (email: string, password: string) => Promise<void>;
  handleUserSignUp:              (email: string, password: string) => Promise<void>;
  handleUserSignOut:             () => Promise<void>;
  handleResetPassword:           (email: string) => Promise<void>;
  handleResendEmailVerification: () => Promise<void>;
  error:                         string | null;
  clearError:                     () => void;
};

export interface AuthProviderProps {
  children: React.ReactNode;
};