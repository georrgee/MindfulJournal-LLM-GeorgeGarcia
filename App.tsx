import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, YStack, Text, H1, Button, XStack } from 'tamagui';
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

function AppContent() {

  const { theme } = useTheme()

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      space="$4"
      padding="$4">
      <H1 color="$color">Mindful Journal</H1>
      <Text color="$color">Welcome to your mindful journaling app!</Text>
      <ThemeToggle />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </YStack>
  )
}

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </TamaguiProvider>
  )
}