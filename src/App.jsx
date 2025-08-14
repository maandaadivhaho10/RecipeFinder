import React, { useContext } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NavigationProvider, NavigationContext } from './contexts/NavigationContext';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';

// App Content Component
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="backdrop-blur-sm">
        <Header />
        <main className="p-2 md:p-4 lg:p-8">
          {getCurrentPageComponent()}
        </main>
      </div>
    </div>
  );
};

// Main App Component
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