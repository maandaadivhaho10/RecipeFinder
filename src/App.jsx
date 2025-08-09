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
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
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
      setFavorites(JSON.parse(savedFavorites));
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
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => navigate('home')}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-2 py-1"
            >
              Recipe Finder
            </button>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('home')}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-2 py-1 ${
                  currentPage === 'home' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('favorites')}
                className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-2 py-1 ${
                  currentPage === 'favorites' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Favorites
              </button>
            </nav>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
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
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search recipes..."
          className="w-full px-4 py-3 pl-10 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="maxTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Max time (minutes):
          </label>
          <input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) => onMaxTimeChange(e.target.value)}
            placeholder="60"
            min="0"
            className="w-20 px-2 py-1 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
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
      className={`px-3 py-1 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isSelected
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {tag}
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

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {showFavoriteToggle && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {recipe.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.time}m
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              {recipe.rating}
            </span>
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                +{recipe.tags.length - 3}
              </span>
            )}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Delicious Recipes
          </h1>
          
          <SearchBar
            searchText={searchText}
            onSearchChange={onSearchChange}
            maxTime={maxTime}
            onMaxTimeChange={onMaxTimeChange}
          />
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by tags:</h3>
            <div className="flex flex-wrap gap-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.678-4.29-3.75 0-.178.012-.355.037-.53A7.96 7.96 0 016 12C6 8.686 8.686 6 12 6s6 2.686 6 6c0 1.657-.672 3.158-1.757 4.243" />
              </svg>
              <p className="text-lg">No recipes match your search</p>
              <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
            </div>
            <button
              onClick={resetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Reset Filters
            </button>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Recipe not found</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm px-2 py-1"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to recipes
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {recipe.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.time} minutes
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {recipe.rating}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {recipe.servings} servings
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {recipe.difficulty}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm font-medium rounded-full flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Your Favorite Recipes
          </h1>
          
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-lg">No favorite recipes yet</p>
              <p className="text-sm mt-1">Start exploring and add some recipes to your favorites!</p>
            </div>
            <button
              onClick={() => navigate('home')}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Browse Recipes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Your Favorite Recipes ({favoriteRecipes.length})
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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