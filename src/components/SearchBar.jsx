import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Search, Timer, Tags, RotateCcw, ChevronDown, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, maxTime, onMaxTimeChange, selectedTags, onTagToggle, onReset }) => {
  const searchRef = useRef(null);
  const [recipes, setRecipes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Search Input */}
        <div className="md:col-span-5">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Search size={16} className="mr-2 text-primary" />
            Search Recipes
          </label>
          <div className="relative">
            <input
              ref={searchRef}
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Title, ingredients, or tags..."
              className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                         dark:text-gray-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* Max Time Filter */}
        <div className="md:col-span-3">
          <label htmlFor="maxTime" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Timer size={16} className="mr-2 text-primary" />
            Max Time (min)
          </label>
          <input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            placeholder="e.g. 30"
            min="1"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       dark:text-gray-100 transition-all duration-200"
          />
        </div>

        {/* Tag Dropdown */}
        <div className="md:col-span-4 relative" ref={dropdownRef}>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Tags size={16} className="mr-2 text-primary" />
            Filter by Tags
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl
                       flex items-center justify-between text-gray-600 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-200"
          >
            <span className="truncate">
              {selectedTags.length > 0 
                ? `${selectedTags.length} tags selected` 
                : "Select tags..."}
            </span>
            <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
              <div className="p-2 grid grid-cols-1 gap-1">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150
                      ${selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20"
            >
              {tag}
              <button 
                onClick={() => onTagToggle(tag)}
                className="ml-2 hover:text-primary-hover focus:outline-none"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={onReset}
            className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center ml-2"
          >
            <RotateCcw size={14} className="mr-1" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
