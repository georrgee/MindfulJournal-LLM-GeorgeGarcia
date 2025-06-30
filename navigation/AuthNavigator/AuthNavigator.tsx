
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, OnboardingScreen, RegistrationScreen } from '../../screens';
import { AuthStackParamList } from './types';
import { NavBackButton } from '../../components/atoms';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerBackVisible: false,
        headerTintColor: 'white', // Adjust color as needed
        headerShadowVisible: false,
        headerLeft: () => <NavBackButton />
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
