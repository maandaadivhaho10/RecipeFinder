import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Search, Timer, Tags, RotateCcw } from 'lucide-react';
import TagChip from './TagChip';

const SearchBar = ({ searchTerm, onSearchChange, maxTime, onMaxTimeChange, selectedTags, onTagToggle, onReset }) => {
  const searchRef = useRef(null);
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from public folder
  useEffect(() => {
    fetch('/recipes.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load recipes.json');
        return res.json();
      })
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    recipes.forEach(recipe => {
      recipe.tags?.forEach(tag => tagSet.add(tag));
      recipe.dietary?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [recipes]);

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 to-gray-100/90 dark:from-gray-900/95 dark:to-black/80 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-300 dark:border-gray-700 mb-6 md:mb-10">
      <div className="space-y-6 md:space-y-8">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 flex items-center">
            <Search size={18} className="mr-2 md:mr-3 text-gray-600 dark:text-gray-400" />
            Search recipes
          </label>
          <input
            ref={searchRef}
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, ingredients, or tags..."
            className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-400 dark:border-gray-600 rounded-xl md:rounded-2xl 
                       focus:outline-none focus:ring-4 focus:ring-gray-300/50 focus:border-gray-600 
                       dark:bg-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                       shadow-lg transition-all duration-300 text-base md:text-lg bg-white dark:bg-gray-800"
          />
        </div>

        {/* Max Time Filter */}
        <div>
          <label htmlFor="maxTime" className="block text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 flex items-center">
            <Timer size={18} className="mr-2 md:mr-3 text-gray-600 dark:text-gray-400" />
            Max cooking time (minutes)
          </label>
          <input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            placeholder="e.g. 30"
            min="1"
            className="w-full sm:w-48 px-4 md:px-6 py-3 md:py-4 border-2 border-gray-400 dark:border-gray-600 
                       rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-gray-300/50 
                       focus:border-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                       shadow-lg transition-all duration-300 text-base md:text-lg bg-white dark:bg-gray-800"
          />
        </div>

        {/* Tag Chips */}
        <div>
          <p className="block text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 flex items-center">
            <Tags size={18} className="mr-2 md:mr-3 text-gray-600 dark:text-gray-400" />
            Filter by tags
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {allTags.map(tag => (
              <TagChip
                key={tag}
                tag={tag}
                isSelected={selectedTags.includes(tag)}
                onToggle={() => onTagToggle(tag)}
              />
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {(searchTerm || maxTime || selectedTags.length > 0) && (
          <button
            onClick={onReset}
            className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white
                       bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900
                       rounded-xl md:rounded-2xl shadow-xl border-2 border-gray-600 hover:border-gray-500
                       flex items-center transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            <RotateCcw size={18} className="mr-2 md:mr-3" />
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
