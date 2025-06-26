import React from "react";
import {
  YStack,
  XStack,
  Text,
  H1,
  Input,
  Button,
  Spinner,
  Card,
  Form,
  Label,
  Separator,
  Image,
} from 'tamagui';
import { UniversalButton } from "../../components/atoms";
import { LinearGradient } from 'expo-linear-gradient';

const OnboardingScreen: React.FC = () => {
  const handleGetStarted = () => {
    // Navigation logic will be implemented later
    console.log('Get Started pressed');
  };

  return (
    <YStack flex={1} position="relative">
      {/* Gradient Background */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Main Content */}
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$6"
        space="$8"
      >
        {/* 3D Cube Icon Container */}
        <YStack alignItems="center" marginTop="$10">
          {/* Since we don't have the exact 3D cube asset, I'll create a placeholder */}
          <YStack
            width={200}
            height={200}
            alignItems="center"
            justifyContent="center"
            backgroundColor="rgba(255, 255, 255, 0.1)"
            borderRadius="$6"
            borderWidth={1}
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            {/* Cube representation using nested boxes */}
            <YStack position="relative">
              <YStack
                width={80}
                height={80}
                backgroundColor="rgba(0, 150, 255, 0.3)"
                borderRadius="$3"
                borderWidth={2}
                borderColor="rgba(0, 200, 255, 0.6)"
                transform={[{ rotateX: '15deg' }, { rotateY: '15deg' }]}
              />
              <YStack
                position="absolute"
                top={-10}
                left={10}
                width={60}
                height={60}
                backgroundColor="rgba(0, 200, 255, 0.4)"
                borderRadius="$2"
                borderWidth={1}
                borderColor="rgba(100, 220, 255, 0.8)"
                transform={[{ rotateX: '-15deg' }, { rotateY: '-15deg' }]}
              />
            </YStack>
          </YStack>
        </YStack>

        {/* Text Content */}
        <YStack alignItems="center" space="$4" maxWidth={300}>
          <Text
            color="white"
            fontSize="$7"
            fontWeight="600"
            textAlign="center"
            lineHeight="$7"
          >
            Searching is now easy with satisfied results and selection
          </Text>
        </YStack>

        {/* Spacer to push button to bottom */}
        <YStack flex={1} />

        {/* Get Started Button */}
        <YStack width="100%" paddingHorizontal="$4" paddingBottom="$8">
          <UniversalButton
            onPress={handleGetStarted}
            backgroundColor="$black12"
            textColor="white"
            size="$6"
            borderRadius="$4"
            fontWeight="bold"
          >
            Get Started For Free
          </UniversalButton>
        </YStack>
      </YStack>
    </YStack>
  )
};

export default OnboardingScreen;