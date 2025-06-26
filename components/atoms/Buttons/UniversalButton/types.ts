import { ReactNode, ComponentType } from "react";
import { ButtonProps as TamaguiButtonProps} from "tamagui";

export type UniversalButtonSize   = '$1' | '$2' | '$3' | '$4' | '$5' | '$6';
export type UniversalSpinnerStyle = string | 'primary' | 'secondary' | 'accent';
/**
 * @param { ReactNode } children the component's children
 * @param { boolean } isLoading when true, the button will display the loading indicator
 * @param { string } loadingText when loading, the loading text that will display for the user to see 
 * @param { ComponentType<any> } icon a small icon placed BEFORE the button text
 * @param { ComponentType<any> } iconAfter a small icon placed AFTER the button text
 * @param { UniversalButtonSize } size The size of the button; ('$1' | '$2' | '$3' | '$4' | '$5' | '$6')
 * @param { string } spinnerColor The color of the loading spinner icon
 * @param { string } textColor  The color of the text inside the button
 * @description Props for the Atom Component: **UniversalButton.tsx**
 */
export interface UniversalButtonProps extends Omit<TamaguiButtonProps, 'children'> {
  children?:     ReactNode;
  isLoading?:    boolean;
  loadingText?:  string;
  icon?:         ComponentType<{ size?: number; color?: string }>;
  iconAfter?:    ComponentType<{ size?: number; color?: string }>;
  size?:         UniversalButtonSize;
  spinnerColor?: UniversalSpinnerStyle;
  textColor?:    string;
};