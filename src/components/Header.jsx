import React, { useState, useCallback, useContext } from 'react';
import { Moon, Sun, Heart, Utensils, Menu, X, Home as HomeIcon } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { NavigationContext } from '../contexts/NavigationContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);
  const { currentPage, navigateToHome, navigateToFavorites } = useContext(NavigationContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    navigateToHome();
    closeMobileMenu();
  }, [navigateToHome, closeMobileMenu]);

  const handleFavoritesClick = useCallback(() => {
    navigateToFavorites();
    closeMobileMenu();
  }, [navigateToFavorites, closeMobileMenu]);

  return (
    <>
      <header className="backdrop-blur-xl bg-gradient-to-r from-black via-gray-900 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900 shadow-2xl border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo / Title */}
            <button 
              onClick={navigateToHome}
              className="flex items-center group focus:outline-none"
            >
              <div className="bg-primary p-2 rounded-xl mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                <Utensils size={24} className="text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Recipe<span className="text-primary">Finder</span>
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <button 
                onClick={navigateToHome}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                  currentPage === 'home' 
                    ? 'text-white bg-primary shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <HomeIcon size={18} className="mr-2" />
                Home
              </button>
              <button 
                onClick={navigateToFavorites}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 relative flex items-center ${
                  currentPage === 'favorites'
                    ? 'text-white bg-primary shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart size={18} className="mr-2" fill={favorites.length > 0 ? 'currentColor' : 'none'} />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-gray-600 hover:border-gray-500"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={closeMobileMenu} />
          <div className="fixed top-16 right-0 w-72 h-full bg-gray-900 shadow-2xl border-l border-white/10">
            <nav className="flex flex-col p-6 space-y-3">
              <button 
                onClick={handleHomeClick}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                  currentPage === 'home' 
                    ? 'text-white bg-primary shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <HomeIcon size={18} className="mr-3" />
                Home
              </button>
              <button 
                onClick={handleFavoritesClick}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 relative flex items-center ${
                  currentPage === 'favorites'
                    ? 'text-white bg-primary shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart size={18} className="mr-3" fill={favorites.length > 0 ? 'currentColor' : 'none'} />
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;