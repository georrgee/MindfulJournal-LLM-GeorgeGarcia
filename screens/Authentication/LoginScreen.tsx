import React, { useState } from 'react';
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
} from 'tamagui';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { FormInput, UniversalButton } from '../../components/atoms';

import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/ui/useFormValidation';

/**
 * @author George Garcia
 * @description Login screen component for user authentication
 */
const LoginScreen: React.FC = () => {
  // * MARK - Variables & Hooks
  const { handleUserSignIn, isLoading, error, clearError } = useAuth();
  const { errors, validate, clearErrors } = useFormValidation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // * MARK - Functions
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearErrors();
    }
    if (error) {
      clearError();
    }
  };

  const handleLogin = async () => {
    const isValid = validate(formData, {
      email: true,
      password: true,
    });

    if (!isValid) return;

    try {
      await handleUserSignIn(formData.email, formData.password);
    } catch (err) {
      // Error is handled by AuthProvider
      console.log('Login failed:', err);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    Alert.alert(
      'Reset Password',
      'Password reset functionality will be implemented next.',
      [{ text: 'OK' }]
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <YStack
        flex={1}
        backgroundColor="$background"
        padding="$4"
        justifyContent="center"
        space="$4">
      {/*
        <YStack alignItems="center" space="$2">
          <H1 color="$color" textAlign="center">
            Welcome Back
          </H1>
          <Text color="$colorPress" textAlign="center">
            Sign in to continue your mindful journey
          </Text>
        </YStack> */}

        {/* <Card
          elevate
          size="$4"
          bordered
          backgroundColor="$backgroundHover"
          padding="$4">

          <Form onSubmit={handleLogin}>
            <FormInput
              label="Email Address"
              labelColor="$color"
              id="email"
              placeholder="george@mindful.com"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              borderColor={errors.email ? '$red10' : '$borderColor'}
              backgroundColor="$background"
              color="$color" />

            <FormInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              inputType="password"
              error={errors.password}
              showPasswordToggle={true} />

            {/* Auth Error Display
            {error && (
              <YStack
                backgroundColor="$red2"
                padding="$3"
                borderRadius="$4"
                borderWidth={1}
                borderColor="$red7"
              >
                <Text color="$red11" textAlign="center">
                  {error}
                </Text>
              </YStack>
            )}

            <UniversalButton
              onPress={handleLogin}
              disabled={isLoading}
              loadingText='Signing In...'>
              Login
            </UniversalButton>
          </Form>

        </Card> */}


        {/* Sign Up Link */}
        {/* <YStack alignItems="center" space="$2">
          <Text color="$colorPress">Don't have an account?</Text>
          <Button
            variant="outlined"
            size="$3"
            backgroundColor="transparent"
            borderColor="$green8">
            <Text color="$green10" fontWeight="600">
              Create Account
            </Text>
          </Button>
        </YStack> */}
        
      </YStack>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;