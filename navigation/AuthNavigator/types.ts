import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * @author George Garcia
 * @param { undefined } Login
 * @param { undefined } Onboarding
 * @param { undefined } Registration
 * @description Auth stack param list
 */
export type AuthStackParamList = {
  Login:        undefined;
  Onboarding:   undefined;
  Registration: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;