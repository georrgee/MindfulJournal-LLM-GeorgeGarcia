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
  ScrollView,
} from 'tamagui';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useFormValidation } from '../../hooks/ui/useFormValidation';

/**
 * @author George Garcia
 * @description Registration screen component for new user signup
 */
const RegistrationScreen: React.FC = () => {
  // * MARK - Variables & Hooks
  const { handleUserSignUp, isLoading, error, clearError } = useAuth();
  const { errors, validate, clearErrors } = useFormValidation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

  const handleRegistration = async () => {
    const isValid = validate(formData, {
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!isValid) return;

    try {
      await handleUserSignUp(formData.email, formData.password);
      setRegistrationSuccess(true);

      Alert.alert(
        'Registration Successful!',
        'Please check your email to verify your account before signing in.',
        [{ text: 'OK' }]
      );
    } catch (err) {
      // Error is handled by AuthProvider
      console.log('Registration failed:', err);
    }
  };

  const getPasswordStrengthColor = () => {
    if (!formData.password) return '$gray8';
    if (formData.password.length < 6) return '$red8';
    if (!/(?=.*[A-Z])/.test(formData.password)) return '$orange8';
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) return '$yellow8';
    return '$green8';
  };

  const getPasswordStrengthText = () => {
    if (!formData.password) return 'Enter a password';
    if (formData.password.length < 6) return 'Too short';
    if (!/(?=.*[A-Z])/.test(formData.password)) return 'Add uppercase letter';
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) return 'Add special character';
    return 'Strong password!';
  };

  if (registrationSuccess) {
    return (
      <YStack
        flex={1}
        backgroundColor="$background"
        padding="$4"
        justifyContent="center"
        alignItems="center"
        space="$4"
      >
        <YStack alignItems="center" space="$4">
          <Text fontSize="$8">✅</Text>
          <H1 color="$color" textAlign="center">
            Check Your Email
          </H1>
          <Text color="$colorPress" textAlign="center" maxWidth={300}>
            We've sent a verification link to {formData.email}. Please verify your email before signing in.
          </Text>
        </YStack>

        <Button
          size="$4"
          backgroundColor="$blue10"
          color="white"
          onPress={() => setRegistrationSuccess(false)}
        >
          <Text color="white" fontWeight="600">
            Back to Sign In
          </Text>
        </Button>
      </YStack>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        flex={1}
        backgroundColor="$background"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <YStack
          flex={1}
          padding="$4"
          justifyContent="center"
          space="$4"
        >
          <YStack alignItems="center" space="$2">
            <H1 color="$color" textAlign="center">
              Create Account
            </H1>
            <Text color="$colorPress" textAlign="center">
              Start your mindful journaling journey
            </Text>
          </YStack>

          <Card
            elevate
            size="$4"
            bordered
            backgroundColor="$backgroundHover"
            padding="$4"
          >
            <Form onSubmit={handleRegistration}>
              <YStack space="$4">
                {/* Email Input */}
                <YStack space="$2">
                  <Label htmlFor="email" color="$color">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    borderColor={errors.email ? '$red10' : '$borderColor'}
                    backgroundColor="$background"
                    color="$color"
                  />
                  {errors.email && (
                    <Text color="$red10" fontSize="$2">
                      {errors.email}
                    </Text>
                  )}
                </YStack>

                {/* Password Input */}
                <YStack space="$2">
                  <Label htmlFor="password" color="$color">
                    Password
                  </Label>
                  <XStack space="$2" alignItems="center">
                    <Input
                      id="password"
                      flex={1}
                      placeholder="Create a password"
                      value={formData.password}
                      onChangeText={(text) => handleInputChange('password', text)}
                      secureTextEntry={!showPassword}
                      borderColor={errors.password ? '$red10' : '$borderColor'}
                      backgroundColor="$background"
                      color="$color"
                    />
                    <Button
                      size="$3"
                      variant="outlined"
                      onPress={() => setShowPassword(!showPassword)}
                      backgroundColor="$backgroundHover"
                    >
                      <Text color="$color">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </Button>
                  </XStack>

                  {/* Password Strength Indicator */}
                  <XStack space="$2" alignItems="center">
                    <Text color={getPasswordStrengthColor()} fontSize="$2">
                      {getPasswordStrengthText()}
                    </Text>
                  </XStack>

                  {errors.password && (
                    <Text color="$red10" fontSize="$2">
                      {errors.password}
                    </Text>
                  )}
                </YStack>

                {/* Confirm Password Input */}
                <YStack space="$2">
                  <Label htmlFor="confirmPassword" color="$color">
                    Confirm Password
                  </Label>
                  <XStack space="$2" alignItems="center">
                    <Input
                      id="confirmPassword"
                      flex={1}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChangeText={(text) => handleInputChange('confirmPassword', text)}
                      secureTextEntry={!showConfirmPassword}
                      borderColor={errors.confirmPassword ? '$red10' : '$borderColor'}
                      backgroundColor="$background"
                      color="$color"
                    />
                    <Button
                      size="$3"
                      variant="outlined"
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      backgroundColor="$backgroundHover"
                    >
                      <Text color="$color">
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </Button>
                  </XStack>
                  {errors.confirmPassword && (
                    <Text color="$red10" fontSize="$2">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </YStack>

                {/* Auth Error Display */}
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

                {/* Registration Button */}
                <Button
                  size="$4"
                  backgroundColor="$green10"
                  color="white"
                  onPress={handleRegistration}
                  disabled={isLoading}
                  opacity={isLoading ? 0.7 : 1}
                >
                  {isLoading ? (
                    <XStack space="$2" alignItems="center">
                      <Spinner size="small" color="white" />
                      <Text color="white">Creating Account...</Text>
                    </XStack>
                  ) : (
                    <Text color="white" fontWeight="600">
                      Create Account
                    </Text>
                  )}
                </Button>
              </YStack>
            </Form>
          </Card>

          <Separator />

          {/* Sign In Link */}
          <YStack alignItems="center" space="$2">
            <Text color="$colorPress">Already have an account?</Text>
            <Button
              variant="outlined"
              size="$3"
              backgroundColor="transparent"
              borderColor="$blue8"
            >
              <Text color="$blue10" fontWeight="600">
                Sign In
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;