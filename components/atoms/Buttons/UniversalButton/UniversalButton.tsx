import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { UniversalButtonProps } from './types';

/**
 * @author George Garcia
 * @param { ReactNode } children the component's children
 * @param { boolean } isLoading when true, the button will display the loading indicator
 * @param { string } loadingText when loading, the loading text that will display for the user to see 
 * @param { UniversalButtonSize } size The size of the button; ('$1' | '$2' | '$3' | '$4' | '$5' | '$6')
 * @param { string } spinnerColor The color of the loading spinner icon
 * @param { string } textColor  The color of the text inside the button
 * @description **(ATOM)** button component with loading states and variants
 */

const UniversalButton: React.FC<UniversalButtonProps> = (props) => {

  const {
    backgroundColor = '#333333',
    children,
    isLoading = false,
    loadingText = 'Loading...',
    spinnerColor = 'white',
    disabled,
    textColor = 'white',
    onPress,
    style,
    ...otherProps
  } = props;

  const renderLoadingContent = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={spinnerColor} />
        <Text style={[styles.text, { color: textColor }]}>{loadingText}</Text>
      </View>
    )
  };

  const renderButtonContent = (children: ReactNode) => {
    return (
      <>
        {
          typeof children === 'string' ?
            (
              <Text style={[styles.text, { color: textColor }]}>
                {children}
              </Text>
            ) : children
        }
      </>
    )
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        (isLoading || disabled) && styles.disabled,
        style
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
      {...otherProps}
    >
      {isLoading ? renderLoadingContent() : renderButtonContent(children)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UniversalButton;