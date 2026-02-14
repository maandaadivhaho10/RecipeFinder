import React, { useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NavigationProvider, NavigationContext } from './contexts/NavigationContext';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';

const AppContent = () => {
  const { currentPage } = useContext(NavigationContext);

  const getCurrentPageComponent = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'recipe':
        return <RecipeDetails />;
      case 'favorites':
        return <Favorites />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {getCurrentPageComponent()}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
