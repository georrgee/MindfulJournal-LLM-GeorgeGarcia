import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { ThemeProvider, AuthProvider } from './providers';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
          <NavigationContainer>
            <StatusBar style='light' />
            <RootNavigator />
          </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}