import React, { createContext, useState, useCallback } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedRecipeId(null);
  }, []);

  const navigateToRecipe = useCallback((recipeId) => {
    setCurrentPage('recipe');
    setSelectedRecipeId(recipeId);
  }, []);

  const navigateToFavorites = useCallback(() => {
    setCurrentPage('favorites');
    setSelectedRecipeId(null);
  }, []);

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      selectedRecipeId, 
      navigateToHome, 
      navigateToRecipe, 
      navigateToFavorites 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext };
export default NavigationContext;