import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/recipess.json';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef(null);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleMaxTimeChange = useCallback((value) => {
    setMaxTime(value);
  }, []);

  const handleTagToggle = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm('');
    setMaxTime('');
    setSelectedTags([]);
    setDebouncedSearch('');
  }, []);

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(searchLower)) ||
        recipe.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        recipe.dietary?.some(diet => diet.toLowerCase().includes(searchLower))
      );
    }

    // Time filter
    if (maxTime) {
      const maxTimeNum = parseInt(maxTime);
      if (!isNaN(maxTimeNum)) {
        filtered = filtered.filter(recipe => recipe.timeMinutes <= maxTimeNum);
      }
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedTags.every(tag =>
          recipe.tags?.includes(tag) || recipe.dietary?.includes(tag)
        )
      );
    }

    return filtered.slice(0, 12); // Show first 12 results
  }, [debouncedSearch, maxTime, selectedTags]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        maxTime={maxTime}
        onMaxTimeChange={handleMaxTimeChange}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onReset={handleReset}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-2xl">
          <Search size={80} className="mx-auto text-gray-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            No recipes match your search
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-black text-white rounded-2xl 
                       hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gray-400 font-bold shadow-xl text-lg"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;