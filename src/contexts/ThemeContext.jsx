import React, { createContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('app-theme');
      return savedTheme || 'light';
    } catch (error) {
      console.warn('Could not access localStorage:', error);
      return 'light';
    }
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    try {
      // Apply theme class to document
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save theme preference to localStorage
      localStorage.setItem('app-theme', theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Set specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  }, []);

  // Get current theme
  const getCurrentTheme = useCallback(() => theme, [theme]);

  const value = {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    getCurrentTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy theme access
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };
export default ThemeContext;