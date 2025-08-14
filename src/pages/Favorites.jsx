import React, { useMemo, useContext } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { NavigationContext } from '../contexts/NavigationContext';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/recipes.json';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { navigateToHome } = useContext(NavigationContext);
  
  const favoriteRecipes = useMemo(() => {
    return recipes.filter(recipe => favorites.includes(recipe.id));
  }, [favorites]);

  if (favoriteRecipes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 flex items-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Your Favorite Recipes
          <Heart size={40} className="ml-4 text-red-500" fill="currentColor" />
        </h1>
        <div className="text-center py-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-2xl">
          <HeartCrack size={80} className="mx-auto text-gray-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            No favorite recipes yet
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Start browsing and save recipes you love!
          </p>
          <button
            onClick={navigateToHome}
            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-black text-white rounded-2xl 
                       hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gray-400 font-bold shadow-xl text-lg"
          >
            Browse recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 flex items-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
        Your Favorite Recipes ({favoriteRecipes.length})
        <Heart size={40} className="ml-4 text-red-500" fill="currentColor" />
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {favoriteRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;