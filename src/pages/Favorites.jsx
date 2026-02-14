import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { NavigationContext } from '../contexts/NavigationContext';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { navigateToHome } = useContext(NavigationContext);
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

  const favoriteRecipes = useMemo(() => {
    return recipes.filter(recipe => favorites.includes(recipe.id));
  }, [favorites, recipes]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading recipes…</p>;

  if (favoriteRecipes.length === 0) {
    return (
      <div className="py-12">
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <HeartCrack size={64} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            No favorites yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Save your favorite recipes to find them easily next time.
          </p>
          <button
            onClick={navigateToHome}
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all duration-200 shadow-lg shadow-primary/20"
          >
            Explore Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center">
          My Favorites
          <span className="ml-3 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {favoriteRecipes.length}
          </span>
        </h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {favoriteRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
