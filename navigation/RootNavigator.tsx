
import React from 'react';
import { useAuth } from '../hooks';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const { user } = useAuth();
  return user ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
