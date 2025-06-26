import React, { ReactNode } from 'react';
import { Button as TamaguiButton, XStack, Text, Spinner } from 'tamagui';
import { UniversalButtonProps, UniversalButtonSize } from './types';
/**
 * @author George Garcia
 * @param { ReactNode } children the component's children
 * @param { boolean } isLoading when true, the button will display the loading indicator
 * @param { string } loadingText when loading, the loading text that will display for the user to see 
 * @param { ComponentType<any> } icon a small icon placed BEFORE the button text
 * @param { ComponentType<any> } iconAfter a small icon placed AFTER the button text
 * @param { UniversalButtonSize } size The size of the button; ('$1' | '$2' | '$3' | '$4' | '$5' | '$6')
 * @param { string } spinnerColor The color of the loading spinner icon
 * @param { string } textColor  The color of the text inside the button
 * @description **(ATOM)** button component with loading states and variants
 */
const UniversalButton: React.FC<UniversalButtonProps> = (props) => {

  const {
    backgroundColor = '$black4',
    children,
    isLoading = false,
    loadingText = 'Loading...',
    size = '$5',
    spinnerColor = 'white',
    disabled,
    textColor = 'white'
  } = props;

  const renderLoadingContent: React.FC = () => {
    return (
      <XStack space="$2" alignItems="center">
        <Spinner size="small" color={spinnerColor} />
        <Text color={textColor} fontWeight='900'>{loadingText}</Text>
      </XStack>
    )
  };

  const renderButtonContent: React.FC<ReactNode> = (children) => {
    return (
      <>
        {
          typeof children === 'string' ? 
          (
            <Text color={textColor} fontWeight='bold'>
              {children}
            </Text>
          ) : children
        }
      </>
    )
  };

  return (
    <TamaguiButton
      backgroundColor={backgroundColor}
      size={size}
      disabled={disabled || isLoading}
      opacity={isLoading || disabled ? 0.7 : 1}
      {...props}>
      { isLoading ? 
        (renderLoadingContent) : (renderButtonContent(children))}
    </TamaguiButton>
  );
};

export default UniversalButton;