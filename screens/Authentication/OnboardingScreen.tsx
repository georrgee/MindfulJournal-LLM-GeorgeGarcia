import React from "react";
import { YStack, H3, Image } from 'tamagui';

import { UniversalButton } from "../../components/atoms";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from "../../navigation/AuthNavigator";

const OnboardingScreen: React.FC = () => {
  
  const navigation = useNavigation<AuthNavigationProp>();

  const handleGetStarted = () => navigation.navigate('Registration');

  return (
    <YStack flex={1} position="relative">

      <LinearGradient
        colors={['#0e162a', '#121835', '#0e162a']}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }} />

      <YStack
        flex={0.7}
        width={'100%'}
        alignItems='center'
        justifyContent='center'>
        <Image
          source={require('../../assets/images/caring.png')}
          style={{ width: 200, height: 200, alignSelf: 'center' }} />
      </YStack>

      <YStack
        flex={0.3}
        alignItems='center'
        justifyContent='space-evenly'
        width={'100%'}>

        <H3 color='white' width='80%'>
          Your AI companion to help you live a more mindful life
        </H3>

        <UniversalButton
          onPress={handleGetStarted}
          backgroundColor="#4a73ff"
          textColor="white"
          size="$5"
          width={'80%'}
          borderRadius="$4"
          fontWeight="bold">
          Get Started
        </UniversalButton>
      </YStack>
    </YStack>
  )
};

export default OnboardingScreen;