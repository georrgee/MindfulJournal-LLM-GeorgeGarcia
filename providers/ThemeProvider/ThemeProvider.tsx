import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeProviderProps } from './types';
import { ThemeContext } from '../../constants';

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  // * MARK - Variables & Hooks
  const systemColorScheme = useColorScheme();
  const colorSchemeText: 'light' | 'dark' = systemColorScheme === 'dark' ? 'dark' : 'light';
  const [theme, setThemeState] = useState<'light' | 'dark'>(colorSchemeText);

  // * MARK - Component LifeCycles
  useEffect(() => {
    /** @description Checks for any changes of the system's color scheme (light or dark mode) */
    if (systemColorScheme) setThemeState(systemColorScheme);
  }, [systemColorScheme]);

  // * MARK - Functions
  const toggleTheme = () => setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  const setTheme = (newTheme: 'light' | 'dark') => setThemeState(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )

};

export default ThemeProvider;