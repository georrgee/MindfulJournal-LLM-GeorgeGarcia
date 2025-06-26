import { InputProps as TamaguiInputProps } from 'tamagui';
import { TextInputProps } from 'react-native';

type FormInputTypes = 'text' | 'email' | 'password' | 'number' | 'phone';

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
 * @description Props for the FormInput Atom Component
 */
export interface FormInputProps extends Omit<TamaguiInputProps, 'onChangeText'> {
  value:               string;
  onChangeText:        (text: string) => void;
  label?:              string;
  error?:              string;
  inputType?:          FormInputTypes;
  showPasswordToggle?: boolean;
  placeholder?:        string;
  required?:           boolean;
  containerProps?:     any;
  labelColor?:         string;
  errorColor?:         string;
  inputProps?:         TextInputProps;
}

export type InputType = FormInputProps['inputType'];