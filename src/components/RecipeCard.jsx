import React, { useState, useCallback, useContext } from 'react';
import { ChefHat, Heart, Star, Clock } from 'lucide-react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { NavigationContext } from '../contexts/NavigationContext';

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const { navigateToRecipe } = useContext(NavigationContext);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  }, [recipe.id, toggleFavorite]);

  const handleCardClick = useCallback(() => {
    navigateToRecipe(recipe.id);
  }, [recipe.id, navigateToRecipe]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div 
      onClick={handleCardClick}
      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-400 border-2 border-gray-200 dark:border-gray-700 group overflow-hidden transform hover:scale-105"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative">
        <div className="h-48 md:h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
          {recipe.image && !imageError ? (
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat size={48} className="text-gray-500 md:hidden" />
              <ChefHat size={64} className="text-gray-500 hidden md:block" />
            </div>
          )}
          <div className="absolute top-3 md:top-4 left-3 md:left-4 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-black/90 to-gray-800/90 backdrop-blur-sm rounded-lg md:rounded-xl text-white text-xs md:text-sm font-bold shadow-lg">
            <Clock size={12} className="inline mr-1.5 md:mr-2" />
            {recipe.timeMinutes}min
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 md:top-4 right-3 md:right-4 p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-110
            focus:outline-none focus:ring-4 focus:ring-red-300/50 shadow-xl ${
            isFavorite(recipe.id)
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
              : 'bg-white/95 text-gray-700 hover:bg-gray-100 hover:text-red-500 border-2 border-gray-300'
          }`}
          aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="md:hidden" />
          <Heart size={20} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="hidden md:block" />
        </button>
      </div>
      
      <div className="p-4 md:p-6">
        <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-2 md:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
          <span className="capitalize font-bold text-sm md:text-base bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-2.5 md:px-3 py-1 rounded-lg md:rounded-xl">
            {recipe.difficulty}
          </span>
          <div className="flex items-center bg-gradient-to-r from-yellow-100 to-amber-200 dark:from-yellow-900/40 dark:to-amber-900/40 px-2.5 md:px-3 py-1 rounded-lg md:rounded-xl border border-yellow-300 dark:border-yellow-600 shadow-md">
            <Star size={14} className="text-yellow-600 dark:text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-bold text-yellow-800 dark:text-yellow-200 text-sm md:text-base">{recipe.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {recipe.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs font-bold bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-800 dark:text-gray-200 rounded-lg md:rounded-xl shadow-md"
            >
              {tag}
            </span>
          ))}
          {recipe.tags?.length > 3 && (
            <span className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-white rounded-lg md:rounded-xl shadow-md">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;