export type ThemeContextType = {
  theme:        'light' | 'dark'
  toggleTheme?: () => void;
  setTheme?:    (theme: 'light' | 'dark') => void;
};

export type ThemeProviderProps = {
  children: React.ReactNode
};