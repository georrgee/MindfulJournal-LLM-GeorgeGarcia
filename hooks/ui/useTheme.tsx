import { useContext } from 'react';
import { ThemeContext } from '../../constants';

export const useTheme = () => {

  // * MARK - Variables & Hooks
  const context = useContext(ThemeContext);

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
};