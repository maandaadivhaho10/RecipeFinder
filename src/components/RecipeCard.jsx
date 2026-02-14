import React, { useState, useCallback, useContext } from 'react';
import { ChefHat, Heart, Star, Clock, Flame } from 'lucide-react';
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'medium': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'hard': return 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        {recipe.image && !imageError ? (
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
            <ChefHat size={48} />
          </div>
        )}
        
        {/* Time Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg text-gray-900 dark:text-gray-100 text-xs font-bold shadow-sm flex items-center border border-gray-200/50">
          <Clock size={14} className="mr-1.5 text-primary" />
          {recipe.timeMinutes} min
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-lg
            ${isFavorite(recipe.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 backdrop-blur-md border border-gray-200/50'
            }`}
          aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Difficulty Badge - Distinct from Tags */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <div className="flex items-center text-accent font-bold text-sm">
            <Star size={14} className="mr-1" fill="currentColor" />
            {recipe.rating}
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3 leading-tight group-hover:text-primary transition-colors duration-200">
          {recipe.title}
        </h3>
        
        {/* Tags Section */}
        <div className="mt-auto flex flex-wrap gap-2">
          {recipe.tags?.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
            >
              {tag}
            </span>
          ))}
          {recipe.tags?.length > 2 && (
            <span className="px-2.5 py-1 text-xs font-medium text-gray-400">
              +{recipe.tags.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
