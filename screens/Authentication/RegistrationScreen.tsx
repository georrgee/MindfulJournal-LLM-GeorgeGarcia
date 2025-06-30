import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { FormInput, UniversalButton } from '../../components/atoms';

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
      <View>
        <View>
          <Text>✅</Text>
          <Text>
            Check Your Email
          </Text>
          <Text>
            We've sent a verification link to {formData.email}. Please verify your email before signing in.
          </Text>
        </View>

        <TouchableOpacity onPress={() => setRegistrationSuccess(false)}>
          <Text>
            Back to Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <LinearGradient
        colors={['#0e162a', '#121835', '#0e162a']}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }} />
        
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', alignItems: 'center' }}>

        <View>

          <View>
            <Text>Let's get started</Text>
            <Text>Fill the forms to create an account</Text>
          </View>

        </View>

        <View>
          <FormInput 
            label="Your email address"
            labelColor='white'
            placeholder="george@mindful.com"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            // borderColor={errors.email ? '$red10' : '$borderColor'}
            // backgroundColor="$background"
            // color="$color" 
            />

          <FormInput 
            label="Password"
            labelColor='white'
            placeholder="min. 6 characters"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry={!showPassword}
            // borderColor={errors.password ? '$red10' : '$borderColor'}
            // backgroundColor="$background"
            // size={'$5'}
            // color="$color" 
            />

        </View>

        <View>

          <View>

            <UniversalButton>
              Sign up
            </UniversalButton>

            <Text>OR</Text>

            <UniversalButton>
              Sign up with Google
            </UniversalButton>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;