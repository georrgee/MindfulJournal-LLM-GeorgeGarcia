import React, { useState } from 'react';
import { YStack, XStack, Input, Label, Text, Button } from 'tamagui';
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
    labelColor = '$color',
    errorColor = '$red10',
    id,
    ...inputProps
  } = props;

  // * MARK - Variables & Hooks
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordType   = inputType === 'password';
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
      case 'number':
        return {
          keyboardType: 'numeric' as const,
        };
      case 'phone':
        return {
          keyboardType: 'phone-pad' as const,
        };
      default:
        return {};
    }
  };

  // * MARK - UI Functions
  const renderInputLabelTitle = () => {
    return (
      <Label htmlFor={id} color={labelColor}>
        {label}
        {/* { required && <Text color={errorColor}> *</Text> } */}
      </Label>
    )
  };

  const renderInputWithToggle = () => {
    return (
      <XStack space="$2" alignItems="center">
        <Input
          id={id}
          flex={1}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          borderColor={error ? errorColor : '$borderColor'}
          backgroundColor="$background"
          color="$color"
          {...getInputTypeProps}
          {...inputProps} />
        <Button
          size="$3"
          variant="outlined"
          onPress={() => setShowPassword(!showPassword)}
          backgroundColor="$backgroundHover">
          <Text color="$color">
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </Button>
      </XStack>
    )
  };

  const renderErrorMessage = () => {
    return (
      <Text color={errorColor} fontSize="$2">{error}</Text>
    )
  };

  // * MARK - Main
  return (
    <YStack space="$2" {...containerProps}>
      { label && renderInputLabelTitle() }
      { shouldShowToggle ? renderInputWithToggle() : 
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          borderColor={error ? errorColor : '$borderColor'}
          backgroundColor="$background"
          color="$color"
          {...getInputTypeProps}
          {...inputProps} />
      }
      { error && renderErrorMessage() }
    </YStack>
  )
};

export default FormInput;

/**
 * EXAMPLE:
 * <FormatInput 
 *    id={id}
 *    label="Email"
 *    value={email}
 *    onChangeText={setEmail}
 *    error={emailError}
 *    inputType="email"
 *    placeholder="george@mindful.com"
 *    required
 *    containerProps={{space: 2 }}
 *    labelColor="$red10"
 *    errorColor="$red10" />
 * 
 */