import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';

import { UniversalButton } from "../../components/atoms";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from "../../navigation/AuthNavigator";

const OnboardingScreen: React.FC = () => {
  
  const navigation = useNavigation<AuthNavigationProp>();

  const handleGetStarted = () => navigation.navigate('Registration');

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#0e162a', '#121835', '#0e162a']}
        style={styles.gradient} />

      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/caring.png')}
          style={styles.image} />
      </View>

      <View style={styles.bottomContainer}>

        <Text style={styles.title}>
          Your AI companion to help you live a more mindful life
        </Text>

        <UniversalButton
          onPress={handleGetStarted}
          backgroundColor="#4a73ff"
          textColor="white"
          size={50}
          width={'80%'}
          borderRadius={8}
          fontWeight="bold">
          Get Started
        </UniversalButton>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  imageContainer: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  bottomContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  title: {
    color: 'white',
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;