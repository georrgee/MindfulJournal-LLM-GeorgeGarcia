import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FormInputProps } from './types';
/**
 * @author George Garcia
 * @param { string } value The value of the input
 * @param { string } onChangeText The function to change the value of the input
 * @param { string } label The label of the input
 * @param { string } error The error of the input
 * @param { FormInputTypes } inputType The type of the input
 * @param { boolean } showPasswordToggle The show password toggle of the input
 * @param { string } placeholder The placeholder of the input
 * @param { boolean } required The required of the input
 * @param { any } containerProps The container props of the input
 * @param { string } labelColor The label color of the input
 * @param { string } errorColor The error color of the input
 * @param { TextInputProps } inputProps The input props of the input
 * @description
 */

const FormInput: React.FC<FormInputProps> = (props) => {

  // * MARK - Props 
  const {
    label,
    value,
    onChangeText,
    error,
    inputType = 'text',
    showPasswordToggle = true,
    placeholder,
    required = false,
    containerProps,
    labelColor = '#000000',
    errorColor = '#ff0000',
    id,
    ...inputProps
  } = props;

  // * MARK - Variables & Hooks
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordType = inputType === 'password';
  const shouldShowToggle = isPasswordType && showPasswordToggle;

  // * MARK - Functions 
  const getInputTypeProps = () => {
    switch (inputType) {
      case 'email':
        return {
          keyboardType: 'email-address' as const,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
        };
      case 'password':
        return {
          secureTextEntry: !showPassword,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
        };
      default:
        return {};
    }
  };

  return (
    <View style={[styles.container, containerProps?.style]}>
      {label && (
        <Text style={[styles.label, { color: labelColor }]}>
          {label}{required && ' *'}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...getInputTypeProps()}
          {...inputProps}
        />

        {shouldShowToggle && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleText}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  toggleButton: {
    padding: 12,
  },
  toggleText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormInput;