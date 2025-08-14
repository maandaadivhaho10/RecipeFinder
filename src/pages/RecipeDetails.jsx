import React, { useState, useMemo, useCallback, useContext } from 'react';
import { ChefHat, Heart, Star, Clock, Users, TrendingUp, ArrowLeft, Frown } from 'lucide-react';
import { NavigationContext } from '../contexts/NavigationContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import recipes from "../data/recipess.json";

const RecipeDetails = () => {
  const { selectedRecipeId, navigateToHome } = useContext(NavigationContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const [imageError, setImageError] = useState(false);

  const recipe = useMemo(() => {
    return recipes.find(r => r.id === selectedRecipeId);
  }, [selectedRecipeId]);

  const handleBack = useCallback(() => {
    navigateToHome();
  }, [navigateToHome]);

  const handleFavoriteClick = useCallback(() => {
    toggleFavorite(selectedRecipeId);
  }, [selectedRecipeId, toggleFavorite]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-2xl">
          <Frown size={80} className="mx-auto text-gray-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Recipe not found
          </h2>
          <button
            onClick={handleBack}
            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-black text-white rounded-2xl 
                       hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gray-400 font-bold shadow-xl text-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-white bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:from-gray-600 hover:to-black border-2 border-gray-400 dark:border-gray-600 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400 shadow-xl"
        >
          <ArrowLeft size={18} className="mr-2 md:mr-3" />
          Back to recipes
        </button>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-64 md:h-80 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
            {recipe.image && !imageError ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat size={80} className="text-gray-500 md:hidden" />
                <ChefHat size={120} className="text-gray-500 hidden md:block" />
              </div>
            )}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 md:top-6 right-4 md:right-6 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300/50 shadow-2xl ${
              isFavorite(recipe.id)
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                : 'bg-white/95 text-gray-700 hover:bg-gray-100 hover:text-red-500 border-2 border-gray-300'
            }`}
            aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={24} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="md:hidden" />
            <Heart size={28} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="hidden md:block" />
          </button>
        </div>

        <div className="p-4 md:p-8">
          {/* Title and Meta */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {recipe.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-lg">
              <div className="flex items-center bg-gradient-to-r from-yellow-100 to-amber-200 dark:from-yellow-900/40 dark:to-amber-900/40 px-3 md:px-4 py-2 rounded-lg md:rounded-xl shadow-lg border border-yellow-300 dark:border-yellow-600">
                <Star size={16} className="text-yellow-600 dark:text-yellow-400 mr-1.5 md:mr-2" fill="currentColor" />
                <span className="font-bold text-yellow-800 dark:text-yellow-200">{recipe.rating}</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-3 md:px-4 py-2 rounded-lg md:rounded-xl shadow-lg">
                <Clock size={16} className="mr-1.5 md:mr-2 text-gray-600 dark:text-gray-400" />
                <span className="font-bold text-gray-800 dark:text-gray-200">{recipe.timeMinutes} min</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-3 md:px-4 py-2 rounded-lg md:rounded-xl shadow-lg">
                <Users size={16} className="mr-1.5 md:mr-2 text-gray-600 dark:text-gray-400" />
                <span className="font-bold text-gray-800 dark:text-gray-200">{recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-3 md:px-4 py-2 rounded-lg md:rounded-xl shadow-lg capitalize">
                <TrendingUp size={16} className="mr-1.5 md:mr-2 text-gray-600 dark:text-gray-400" />
                <span className="font-bold text-gray-800 dark:text-gray-200">{recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
              {recipe.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-800 dark:text-gray-200 rounded-lg md:rounded-xl shadow-lg"
                >
                  {tag}
                </span>
              ))}
              {recipe.dietary?.map(diet => (
                <span
                  key={diet}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-white rounded-lg md:rounded-xl shadow-lg"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Ingredients
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center py-2.5 md:py-3 px-3 md:px-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg md:rounded-xl border border-gray-300 dark:border-gray-600 shadow-md">
                    <span className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base">{ingredient.name}</span>
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-sm md:text-base">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Nutrition */}
              {recipe.nutrition && (
                <div className="mt-6 md:mt-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    Nutrition (per serving)
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-400 dark:border-gray-600 shadow-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {recipe.nutrition.calories}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">Calories</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-400 dark:border-gray-600 shadow-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {recipe.nutrition.protein}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">Protein</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-400 dark:border-gray-600 shadow-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {recipe.nutrition.carbs}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">Carbs</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl md:rounded-2xl border-2 border-gray-400 dark:border-gray-600 shadow-lg">
                      <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                        {recipe.nutrition.fat}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">Fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Instructions
              </h2>
              <ol className="space-y-4 md:space-y-6">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-600 to-black text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl flex items-center justify-center mr-4 md:mr-6 mt-1 shadow-xl">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200 leading-relaxed text-base md:text-lg font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-300 dark:border-gray-600 shadow-md flex-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;