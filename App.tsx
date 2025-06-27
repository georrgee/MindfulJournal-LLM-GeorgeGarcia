import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, YStack, Text, H1, Button, XStack } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation';
import { ThemeProvider, AuthProvider } from './providers';
import { useTheme } from './hooks';
import config from './tamagui.config';

export const ThemeToggle: React.FC = () => {

  const { theme, toggleTheme } = useTheme()

  return (
    <XStack space="$2" alignItems="center">
      <Text>Theme: {theme}</Text>
      <Button
        onPress={toggleTheme}
        backgroundColor="$backgroundHover"
        borderColor="$borderColor"
        color="$color"
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </Button>
    </XStack>
  )
}

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar style='light' />
              <RootNavigator />
            </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </TamaguiProvider>
  )
}