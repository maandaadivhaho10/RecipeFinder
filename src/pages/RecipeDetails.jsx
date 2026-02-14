import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ChefHat, Heart, Star, Clock, Users, TrendingUp, ArrowLeft, Frown } from 'lucide-react';
import { NavigationContext } from '../contexts/NavigationContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

const RecipeDetails = () => {
  const { selectedRecipeId, navigateToHome } = useContext(NavigationContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const [imageError, setImageError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from public folder
  useEffect(() => {
    fetch('/recipes.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load recipes.json');
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const recipe = useMemo(() => {
    return recipes.find(r => r.id === selectedRecipeId);
  }, [selectedRecipeId, recipes]);

  const handleBack = useCallback(() => {
    navigateToHome();
  }, [navigateToHome]);

  const handleFavoriteClick = useCallback(() => {
    toggleFavorite(selectedRecipeId);
  }, [selectedRecipeId, toggleFavorite]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (loading) return <p className="text-center mt-20 text-lg">Loading recipe…</p>;

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
    <div className="max-w-5xl mx-auto py-6">
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Recipes
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-80 md:h-auto relative overflow-hidden bg-gray-100 dark:bg-gray-800">
            {recipe.image && !imageError ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ChefHat size={80} />
              </div>
            )}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-6 right-6 p-3 rounded-full shadow-xl transition-all duration-300
                ${isFavorite(recipe.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 backdrop-blur-md border border-gray-200/50'
                }`}
              aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={24} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-secondary/10 text-secondary rounded-full border border-secondary/20">
                {recipe.difficulty}
              </span>
              <div className="flex items-center text-accent font-bold">
                <Star size={18} className="mr-1" fill="currentColor" />
                {recipe.rating}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {recipe.title}
            </h1>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Time</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{recipe.timeMinutes} min</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <div className="bg-primary/10 p-2 rounded-lg mr-3">
                  <Users size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Servings</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{recipe.servings}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {recipe.tags?.map(tag => (
                <span key={tag} className="px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 border-t border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ingredients */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                Ingredients
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{ingredient.name}</span>
                    <span className="text-gray-400 font-bold text-sm bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Nutrition */}
              {recipe.nutrition && (
                <div className="mt-10 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 text-center">Nutrition per serving</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{recipe.nutrition.calories}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Calories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{recipe.nutrition.protein}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{recipe.nutrition.carbs}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Carbs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{recipe.nutrition.fat}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Fat</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-primary rounded-full mr-3"></span>
                Instructions
              </h2>
              <div className="space-y-8">
                {recipe.steps?.map((step, index) => (
                  <div key={index} className="flex group">
                    <div className="mr-6 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      {index !== recipe.steps.length - 1 && (
                        <div className="w-px h-full bg-gray-100 dark:bg-gray-800 my-2"></div>
                      )}
                    </div>
                    <div className="pb-8 group-last:pb-0">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
