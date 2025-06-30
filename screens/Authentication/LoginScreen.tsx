import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { FormInput, UniversalButton } from '../../components/atoms';

import { useAuth } from '../../hooks';
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
      <View style={styles.container}>
      
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your mindful journey</Text>
        </View>

        <View style={styles.card}>
          <View>
            <FormInput
              label="Email Address"
              labelColor="black"
              id="email"
              placeholder="george@mindful.com"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              // borderCostylor={errors.email ? 'red' : 'gray'}
              // backgroundColor="white"
              // color="black" 
              />

            <FormInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              inputType="password"
              error={errors.password}
              showPasswordToggle={true} />

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            <UniversalButton
              onPress={handleLogin}
              disabled={isLoading}
              loadingText='Signing In...'>
              Login
            </UniversalButton>
          </View>
        </View>

        <View style={styles.signupContainer}>
          <Text>Don't have an account?</Text>
          <Button
            title="Create Account"
            onPress={() => {}}
          />
        </View>
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;