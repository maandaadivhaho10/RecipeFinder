import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } from 'react';

// Sample data (replace with your recipes.json)
const recipesData = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    time: 45,
    difficulty: "Medium",
    rating: 4.8,
    servings: 4,
    tags: ["vegetarian", "italian"],
    ingredients: [
      "2 cups all-purpose flour",
      "1 tsp active dry yeast",
      "1 tsp salt",
      "3/4 cup warm water",
      "2 tbsp olive oil",
      "1/2 cup pizza sauce",
      "8 oz fresh mozzarella",
      "Fresh basil leaves"
    ],
    steps: [
      "Mix flour, yeast, and salt in a bowl",
      "Add warm water and olive oil, mix until dough forms",
      "Knead for 8-10 minutes until smooth",
      "Let rise for 1 hour",
      "Roll out dough and add toppings",
      "Bake at 475°F for 12-15 minutes"
    ]
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
    time: 25,
    difficulty: "Easy",
    rating: 4.9,
    servings: 24,
    tags: ["dessert", "vegetarian"],
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    steps: [
      "Preheat oven to 375°F",
      "Mix flour, baking soda, and salt",
      "Cream butter and sugars",
      "Beat in eggs and vanilla",
      "Gradually add flour mixture",
      "Stir in chocolate chips",
      "Drop onto baking sheets",
      "Bake 9-11 minutes"
    ]
  },
  {
    id: "3",
    title: "Quinoa Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    time: 30,
    difficulty: "Easy",
    rating: 4.6,
    servings: 2,
    tags: ["vegan", "gluten-free", "healthy"],
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 sweet potato, cubed",
      "1 cup chickpeas",
      "2 cups spinach",
      "1 avocado",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "Salt and pepper to taste"
    ],
    steps: [
      "Cook quinoa in vegetable broth",
      "Roast sweet potato at 400°F for 25 minutes",
      "Sauté chickpeas with spices",
      "Wilt spinach in pan",
      "Make tahini dressing",
      "Assemble bowls with all ingredients",
      "Drizzle with dressing"
    ]
  },
  {
    id: "4",
    title: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38174c68d3ba?w=400&h=300&fit=crop",
    time: 20,
    difficulty: "Easy",
    rating: 4.7,
    servings: 4,
    tags: ["mexican", "quick"],
    ingredients: [
      "1 lb ground beef",
      "8 taco shells",
      "1 packet taco seasoning",
      "1 cup shredded cheese",
      "1 tomato, diced",
      "1 cup lettuce, shredded",
      "1/2 cup sour cream",
      "1/4 cup onion, diced"
    ],
    steps: [
      "Brown ground beef in skillet",
      "Add taco seasoning and water",
      "Simmer for 5 minutes",
      "Warm taco shells",
      "Fill shells with meat",
      "Top with cheese, lettuce, tomato",
      "Serve with sour cream"
    ]
  },
  {
    id: "5",
    title: "Green Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
    time: 10,
    difficulty: "Easy",
    rating: 4.4,
    servings: 1,
    tags: ["vegan", "gluten-free", "healthy", "breakfast"],
    ingredients: [
      "1 frozen banana",
      "1 cup spinach",
      "1/2 avocado",
      "1/2 cup almond milk",
      "1 tbsp chia seeds",
      "1 tbsp honey or maple syrup",
      "Granola for topping",
      "Fresh berries for topping"
    ],
    steps: [
      "Blend banana, spinach, avocado, and almond milk",
      "Add chia seeds and sweetener",
      "Blend until smooth and thick",
      "Pour into bowl",
      "Top with granola and berries",
      "Serve immediately"
    ]
  },
  {
    id: "6",
    title: "Chicken Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    time: 15,
    difficulty: "Easy",
    rating: 4.5,
    servings: 3,
    tags: ["asian", "quick", "gluten-free"],
    ingredients: [
      "1 lb chicken breast, sliced",
      "2 cups mixed vegetables",
      "3 cloves garlic, minced",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sesame oil",
      "2 tbsp vegetable oil",
      "1 tsp ginger, minced"
    ],
    steps: [
      "Heat oil in wok or large skillet",
      "Add chicken and cook until done",
      "Add garlic and ginger",
      "Add vegetables and stir fry",
      "Mix sauces together",
      "Add sauce to pan and toss",
      "Serve over rice"
    ]
  }
];

// Navigation Context
const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const navigate = useCallback((page, recipeId = null) => {
    setCurrentPage(page);
    setSelectedRecipeId(recipeId);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentPage, selectedRecipeId, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Favorites Context
const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Header Component
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { navigate, currentPage } = useContext(NavigationContext);
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => navigate('home')}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-3 py-2"
            >
              Recipe Finder
            </button>
            <nav className="hidden md:flex space-x-1">
              <button 
                onClick={() => navigate('home')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  currentPage === 'home' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('favorites')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  currentPage === 'favorites' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
              >
                Favorites
              </button>
            </nav>
          </div>
          <button
            onClick={toggleTheme}
            className="relative p-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-label="Toggle theme"
          >
            <div className="relative w-6 h-6">
              <svg 
                className={`absolute inset-0 w-6 h-6 transform transition-all duration-500 ${theme === 'light' ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg 
                className={`absolute inset-0 w-6 h-6 transform transition-all duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

// Search Bar Component
const SearchBar = ({ searchText, onSearchChange, maxTime, onMaxTimeChange }) => {
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative">
          <input
            ref={searchRef}
            type="text"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for amazing recipes..."
            className="w-full px-6 py-4 pl-14 text-lg text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-700">
          <label htmlFor="maxTime" className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            Max time:
          </label>
          <input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            placeholder="60"
            min="0"
            className="w-16 px-2 py-1 text-gray-900 dark:text-white bg-transparent border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">min</span>
        </div>
      </div>
    </div>
  );
};

// Tag Chip Component
const TagChip = ({ tag, isSelected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(tag)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transform hover:scale-105 ${
        isSelected
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600'
      }`}
    >
      #{tag}
    </button>
  );
};

// Recipe Card Component
const RecipeCard = ({ recipe, showFavoriteToggle = true }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { navigate } = useContext(NavigationContext);
  const isFavorite = favorites.includes(recipe.id);

  const handleFavoriteClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  }, [recipe.id, toggleFavorite]);

  const handleCardClick = useCallback(() => {
    navigate('recipe', recipe.id);
  }, [navigate, recipe.id]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl transform transition-all duration-300 hover:scale-[1.02]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            {showFavoriteToggle && (
              <button
                onClick={handleFavoriteClick}
                className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group/heart"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-400 group-hover/heart:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
          </div>
        
          <div className="relative p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.time}m
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {recipe.rating}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                  #{tag}
                </span>
              ))}
              {recipe.tags.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{recipe.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const searchTimeoutRef = useRef(null);

  const onSearchChange = useCallback((value) => {
    setSearchText(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchText(value);
    }, 300);
  }, []);

  const onMaxTimeChange = useCallback((value) => {
    setMaxTime(value);
  }, []);

  const onTagToggle = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSearchText('');
    setDebouncedSearchText('');
    setMaxTime('');
    setSelectedTags([]);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    recipesData.forEach(recipe => {
      recipe.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipesData.filter(recipe => {
      const matchesSearch = !debouncedSearchText || 
        recipe.title.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(debouncedSearchText.toLowerCase()));
      
      const matchesTime = !maxTime || recipe.time <= parseInt(maxTime);
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => recipe.tags.includes(tag));

      return matchesSearch && matchesTime && matchesTags;
    }).slice(0, 12);
  }, [debouncedSearchText, maxTime, selectedTags]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">Recipes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world. Find your next favorite dish!
          </p>
        </div>
        
        <div className="mb-12">
          <SearchBar
            searchText={searchText}
            onSearchChange={onSearchChange}
            maxTime={maxTime}
            onMaxTimeChange={onMaxTimeChange}
          />
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-3">
              {allTags.map(tag => (
                <TagChip
                  key={tag}
                  tag={tag}
                  isSelected={selectedTags.includes(tag)}
                  onToggle={onTagToggle}
                />
              ))}
            </div>
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
              </div>
              <div className="relative text-gray-600 dark:text-gray-400 mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.678-4.29-3.75 0-.178.012-.355.037-.53A7.96 7.96 0 016 12C6 8.686 8.686 6 12 6s6 2.686 6 6c0 1.657-.672 3.158-1.757 4.243" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No recipes found</h3>
                <p className="text-lg mb-8">We couldn't find any recipes matching your search. Try adjusting your filters!</p>
              </div>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Recipe Details Page
const RecipeDetails = ({ recipeId }) => {
  const { navigate } = useContext(NavigationContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  const recipe = useMemo(() => 
    recipesData.find(r => r.id === recipeId), [recipeId]
  );

  const isFavorite = favorites.includes(recipeId);

  const handleFavoriteClick = useCallback(() => {
    toggleFavorite(recipeId);
  }, [recipeId, toggleFavorite]);

  const handleBack = useCallback(() => {
    navigate('home');
  }, [navigate]);

  useEffect(() => {
    if (recipe) {
      document.title = `${recipe.title} - Recipe Finder`;
    }
    return () => {
      document.title = 'Recipe Finder';
    };
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <svg className="h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recipe not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The recipe you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg px-3 py-2 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to recipes
          </button>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <button
              onClick={handleFavoriteClick}
              className="absolute top-6 right-6 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className={`w-7 h-7 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-400 group-hover:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {recipe.title}
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{recipe.time}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">minutes</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-yellow-600 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{recipe.rating}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">rating</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{recipe.servings}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">servings</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center p-4 rounded-2xl">
                  <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {recipe.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                  Ingredients
                </h2>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4"></span>
                      <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-3"></div>
                  Instructions
                </h2>
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full flex items-center justify-center mr-4 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Favorites Page
const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { navigate } = useContext(NavigationContext);
  
  const favoriteRecipes = useMemo(() => 
    recipesData.filter(recipe => favorites.includes(recipe.id)), 
    [favorites]
  );

  if (favoriteRecipes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Your Favorites
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Save your favorite recipes for quick access
            </p>
          </div>
          
          <div className="text-center py-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
              </div>
              <div className="relative text-gray-600 dark:text-gray-400 mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-16 w-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">No favorites yet</h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Start exploring our amazing recipes and save your favorites by clicking the heart icon!
                </p>
              </div>
              <button
                onClick={() => navigate('home')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-full font-semibold text-xl shadow-2xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                Explore Recipes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Your Favorites
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const { currentPage, selectedRecipeId } = useContext(NavigationContext);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'recipe':
        return <RecipeDetails recipeId={selectedRecipeId} />;
      case 'favorites':
        return <Favorites />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      {renderCurrentPage()}
    </div>
  );
};

// Root App with Providers
const AppWithProviders = () => {
  return (
    <NavigationProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
};

export default AppWithProviders;