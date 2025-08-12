import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } from 'react';
import { Moon, Sun, ChefHat, Heart, Star, Clock, Users, TrendingUp, Search, Frown, HeartCrack, ArrowLeft, Timer, Tags, RotateCcw, Utensils } from 'lucide-react';

// Recipe data with real images
const recipes = [
  {
    "id": "rec_001",
    "title": "One-Pot Creamy Tomato Pasta",
    "image": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    "tags": ["vegetarian", "quick"],
    "difficulty": "easy",
    "timeMinutes": 25,
    "rating": 4.5,
    "servings": 2,
    "ingredients": [
      { "name": "Pasta", "quantity": "200g" },
      { "name": "Tomato sauce", "quantity": "1 cup" },
      { "name": "Cream", "quantity": "1/2 cup" },
      { "name": "Garlic", "quantity": "2 cloves" }
    ],
    "steps": [
      "Boil pasta until al dente.",
      "Simmer tomato sauce with cream and garlic.",
      "Combine pasta and sauce, season, and serve."
    ],
    "nutrition": { "calories": 520, "protein": "16g", "carbs": "72g", "fat": "18g" },
    "dietary": ["vegetarian"]
  },
  {
    "id": "rec_002",
    "title": "Grilled Lemon Herb Chicken",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
    "tags": ["grill", "protein"],
    "difficulty": "easy",
    "timeMinutes": 30,
    "rating": 4.6,
    "servings": 4,
    "ingredients": [
      { "name": "Chicken breasts", "quantity": "4" },
      { "name": "Lemon", "quantity": "1, juiced" },
      { "name": "Olive oil", "quantity": "2 tbsp" },
      { "name": "Mixed herbs", "quantity": "1 tbsp" }
    ],
    "steps": [
      "Marinate chicken with lemon, oil, herbs, salt, and pepper.",
      "Grill 6–7 minutes per side until cooked through.",
      "Rest 5 minutes and slice."
    ],
    "nutrition": { "calories": 320, "protein": "38g", "carbs": "2g", "fat": "16g" },
    "dietary": ["gluten-free", "dairy-free"]
  },
  {
    "id": "rec_003",
    "title": "Vegan Chickpea Curry",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    "tags": ["vegan", "spicy", "comfort"],
    "difficulty": "medium",
    "timeMinutes": 35,
    "rating": 4.7,
    "servings": 4,
    "ingredients": [
      { "name": "Chickpeas", "quantity": "2 cans" },
      { "name": "Coconut milk", "quantity": "1 can" },
      { "name": "Curry paste", "quantity": "2 tbsp" },
      { "name": "Onion", "quantity": "1" }
    ],
    "steps": [
      "Sauté onion; add curry paste and toast.",
      "Add chickpeas and coconut milk; simmer 15 minutes.",
      "Season and serve over rice."
    ],
    "nutrition": { "calories": 410, "protein": "14g", "carbs": "46g", "fat": "18g" },
    "dietary": ["vegan", "gluten-free", "dairy-free"]
  },
  {
    "id": "rec_004",
    "title": "Greek Salad",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    "tags": ["salad", "quick", "fresh"],
    "difficulty": "easy",
    "timeMinutes": 15,
    "rating": 4.3,
    "servings": 2,
    "ingredients": [
      { "name": "Cucumber", "quantity": "1" },
      { "name": "Tomatoes", "quantity": "2" },
      { "name": "Red onion", "quantity": "1/4" },
      { "name": "Feta", "quantity": "80g" }
    ],
    "steps": [
      "Chop vegetables and feta.",
      "Dress with olive oil, lemon, oregano, salt, and pepper.",
      "Toss and serve."
    ],
    "nutrition": { "calories": 260, "protein": "8g", "carbs": "18g", "fat": "18g" },
    "dietary": ["vegetarian", "gluten-free"]
  },
  {
    "id": "rec_006",
    "title": "Avocado Toast with Egg",
    "image": "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    "tags": ["breakfast", "quick"],
    "difficulty": "easy",
    "timeMinutes": 10,
    "rating": 4.2,
    "servings": 1,
    "ingredients": [
      { "name": "Bread", "quantity": "2 slices" },
      { "name": "Avocado", "quantity": "1/2" },
      { "name": "Egg", "quantity": "1" }
    ],
    "steps": [
      "Toast bread; mash avocado with salt and lemon.",
      "Fry or poach egg.",
      "Assemble and season."
    ],
    "nutrition": { "calories": 360, "protein": "13g", "carbs": "30g", "fat": "20g" },
    "dietary": ["vegetarian"]
  },
  {
    "id": "rec_007",
    "title": "Garlic Butter Shrimp",
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
    "tags": ["seafood", "quick"],
    "difficulty": "easy",
    "timeMinutes": 15,
    "rating": 4.6,
    "servings": 2,
    "ingredients": [
      { "name": "Shrimp", "quantity": "300g" },
      { "name": "Butter", "quantity": "2 tbsp" },
      { "name": "Garlic", "quantity": "3 cloves" },
      { "name": "Parsley", "quantity": "1 tbsp" }
    ],
    "steps": [
      "Sauté garlic in butter.",
      "Add shrimp; cook until pink.",
      "Finish with parsley and lemon."
    ],
    "nutrition": { "calories": 290, "protein": "28g", "carbs": "2g", "fat": "18g" },
    "dietary": ["gluten-free"]
  },
  {
    "id": "rec_008",
    "title": "Quinoa Buddha Bowl",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    "tags": ["vegan", "bowl", "healthy"],
    "difficulty": "easy",
    "timeMinutes": 30,
    "rating": 4.1,
    "servings": 2,
    "ingredients": [
      { "name": "Quinoa", "quantity": "1 cup" },
      { "name": "Roasted veggies", "quantity": "2 cups" },
      { "name": "Tahini", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Cook quinoa.",
      "Roast or prep veggies.",
      "Assemble with tahini dressing."
    ],
    "nutrition": { "calories": 480, "protein": "16g", "carbs": "66g", "fat": "16g" },
    "dietary": ["vegan", "gluten-free", "dairy-free"]
  },
  {
    "id": "rec_009",
    "title": "Margherita Pizza",
    "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    "tags": ["baking", "comfort"],
    "difficulty": "medium",
    "timeMinutes": 40,
    "rating": 4.5,
    "servings": 2,
    "ingredients": [
      { "name": "Pizza dough", "quantity": "1 ball" },
      { "name": "Tomato sauce", "quantity": "1/2 cup" },
      { "name": "Mozzarella", "quantity": "120g" },
      { "name": "Basil", "quantity": "handful" }
    ],
    "steps": [
      "Stretch dough; add sauce and cheese.",
      "Bake at high heat until bubbly.",
      "Top with basil and serve."
    ],
    "nutrition": { "calories": 620, "protein": "24g", "carbs": "78g", "fat": "22g" },
    "dietary": ["vegetarian"]
  },
  {
    "id": "rec_010",
    "title": "Tomato Basil Soup",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    "tags": ["soup", "comfort", "vegetarian"],
    "difficulty": "easy",
    "timeMinutes": 30,
    "rating": 4.0,
    "servings": 3,
    "ingredients": [
      { "name": "Tomatoes", "quantity": "800g canned" },
      { "name": "Onion", "quantity": "1" },
      { "name": "Basil", "quantity": "6 leaves" },
      { "name": "Cream", "quantity": "1/4 cup" }
    ],
    "steps": [
      "Sauté onion; add tomatoes and simmer.",
      "Blend smooth; add cream and basil.",
      "Season to taste."
    ],
    "nutrition": { "calories": 220, "protein": "6g", "carbs": "28g", "fat": "10g" },
    "dietary": ["vegetarian", "gluten-free"]
  },
  {
    "id": "rec_013",
    "title": "Caprese Sandwich",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    "tags": ["vegetarian", "quick", "lunch"],
    "difficulty": "easy",
    "timeMinutes": 10,
    "rating": 4.1,
    "servings": 1,
    "ingredients": [
      { "name": "Ciabatta", "quantity": "1 roll" },
      { "name": "Mozzarella", "quantity": "80g" },
      { "name": "Tomato", "quantity": "1" },
      { "name": "Basil", "quantity": "4 leaves" }
    ],
    "steps": [
      "Layer mozzarella, tomato, and basil.",
      "Drizzle with olive oil and balsamic.",
      "Press lightly and serve."
    ],
    "nutrition": { "calories": 420, "protein": "18g", "carbs": "46g", "fat": "16g" },
    "dietary": ["vegetarian"]
  },
  {
    "id": "rec_015",
    "title": "Pesto Zoodles",
    "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "tags": ["low-carb", "vegetarian", "quick"],
    "difficulty": "easy",
    "timeMinutes": 15,
    "rating": 3.9,
    "servings": 2,
    "ingredients": [
      { "name": "Zucchini", "quantity": "2, spiralized" },
      { "name": "Pesto", "quantity": "3 tbsp" },
      { "name": "Cherry tomatoes", "quantity": "1 cup" }
    ],
    "steps": [
      "Sauté zoodles briefly.",
      "Toss with pesto and tomatoes.",
      "Season and serve."
    ],
    "nutrition": { "calories": 260, "protein": "8g", "carbs": "16g", "fat": "18g" },
    "dietary": ["vegetarian", "gluten-free"]
  },
  {
    "id": "rec_021",
    "title": "Garlic Roasted Cauliflower",
    "image": "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop",
    "tags": ["vegan", "side", "quick"],
    "difficulty": "easy",
    "timeMinutes": 25,
    "rating": 4.3,
    "servings": 3,
    "ingredients": [
      { "name": "Cauliflower", "quantity": "1 head" },
      { "name": "Olive oil", "quantity": "2 tbsp" },
      { "name": "Garlic", "quantity": "3 cloves" }
    ],
    "steps": [
      "Toss florets with oil, garlic, salt, pepper.",
      "Roast until golden.",
      "Finish with lemon."
    ],
    "nutrition": { "calories": 160, "protein": "6g", "carbs": "16g", "fat": "8g" },
    "dietary": ["vegan", "gluten-free", "dairy-free"]
  },
  {
    "id": "rec_025",
    "title": "Berry Yogurt Parfait",
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    "tags": ["breakfast", "quick", "fresh"],
    "difficulty": "easy",
    "timeMinutes": 8,
    "rating": 4.1,
    "servings": 1,
    "ingredients": [
      { "name": "Yogurt", "quantity": "1 cup" },
      { "name": "Mixed berries", "quantity": "1 cup" },
      { "name": "Granola", "quantity": "1/3 cup" }
    ],
    "steps": [
      "Layer yogurt, berries, and granola.",
      "Drizzle honey if desired.",
      "Serve immediately."
    ],
    "nutrition": { "calories": 320, "protein": "14g", "carbs": "46g", "fat": "8g" },
    "dietary": ["vegetarian"]
  }
];

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('recipe-finder-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipe-finder-theme', theme);
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
    const savedFavorites = localStorage.getItem('recipe-finder-favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (e) {
        console.error('Error parsing favorites from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipe-finder-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  }, []);

  const isFavorite = useCallback((recipeId) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Navigation Context for simple routing
const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    setSelectedRecipeId(null);
  }, []);

  const navigateToRecipe = useCallback((recipeId) => {
    setCurrentPage('recipe');
    setSelectedRecipeId(recipeId);
  }, []);

  const navigateToFavorites = useCallback(() => {
    setCurrentPage('favorites');
    setSelectedRecipeId(null);
  }, []);

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      selectedRecipeId, 
      navigateToHome, 
      navigateToRecipe, 
      navigateToFavorites 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Header Component
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);
  const { currentPage, navigateToHome, navigateToFavorites } = useContext(NavigationContext);

  return (
    <header className="backdrop-blur-md bg-gradient-to-r from-fuchsia-900/80 via-purple-900/70 to-indigo-900/80 shadow-lg border-b border-white/10 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <button 
            onClick={navigateToHome}
            className="text-xl font-bold text-white tracking-wide hover:text-pink-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md px-3 py-2 flex items-center"
          >
            <Utensils size={24} className="mr-2 text-pink-400 drop-shadow" />
            Recipe Finder
          </button>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button 
              onClick={navigateToHome}
              className={`px-4 py-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                currentPage === 'home' 
                  ? 'text-white bg-pink-500/30 border border-pink-400/40 shadow-md'
                  : 'text-pink-200 hover:text-white hover:bg-pink-400/20'
              }`}
            >
              Home
            </button>
            <button 
              onClick={navigateToFavorites}
              className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                currentPage === 'favorites'
                  ? 'text-white bg-pink-500/30 border border-pink-400/40 shadow-md'
                  : 'text-pink-200 hover:text-white hover:bg-pink-400/20'
              }`}
            >
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                  {favorites.length}
                </span>
              )}
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-pink-200 hover:text-white hover:bg-pink-400/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange, maxTime, onMaxTimeChange, selectedTags, onTagToggle, onReset }) => {
  const searchRef = useRef(null);

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
  }, []);

  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-white/80 to-slate-50/70 dark:from-gray-900/70 dark:to-gray-800/70 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700 mb-8">
      <div className="space-y-6">

        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
           <Search size={16} className="mr-2 text-sky-600 dark:text-sky-400" />

            Search recipes
          </label>
          <input
  ref={searchRef}
  id="search"
  type="text"
  value={searchTerm}
  onChange={(e) => onSearchChange(e.target.value)}
  placeholder="Search by title, ingredients, or tags..."
  className="w-full px-4 py-3 border border-sky-400 dark:border-sky-900 rounded-xl 
             focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 
             dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-sky-300 
             shadow-sm transition-all"
/>
        </div>

        {/* Max Time Filter */}
        <div>
          <label htmlFor="maxTime" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
           <Timer size={16} className="mr-2 text-sky-600 dark:text-sky-400" />
            Max cooking time (minutes)
          </label>
          <input
  id="maxTime"
  type="number"
  value={maxTime}
  onChange={(e) => onMaxTimeChange(e.target.value)}
  placeholder="e.g. 30"
  min="1"
  className="w-36 px-4 py-3 border border-sky-400 dark:border-sky-600 
             rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 
             focus:border-sky-500 dark:bg-gray-800 text-black dark:text-sky-200 
             shadow-sm transition-all"
 />
        </div>

        {/* Tag Chips */}
        <div>
          <p className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Tags size={16} className="mr-2 text-emerald-600" />
            Filter by tags
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <TagChip
                key={tag}
                tag={tag}
                isSelected={selectedTags.includes(tag)}
                onToggle={() => onTagToggle(tag)}
                className="transition-all duration-200"
              />
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {(searchTerm || maxTime || selectedTags.length > 0) && (
         <button
  onClick={onReset}
  className="px-5 py-2.5 text-sm font-medium text-black dark:text-sky-200 hover:text-white
             bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700
             rounded-xl shadow-md border border-sky-400 dark:border-sky-600
             flex items-center transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-sky-500"
>
  <RotateCcw size={16} className="mr-2" />
  Reset filters
</button>
        )}
      </div>
    </div>
  );
};


// Tag Chip Component
const TagChip = ({ tag, isSelected, onToggle }) => {
  return (
 <button
  onClick={onToggle}
  className={`
    px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 transform
    focus:outline-none focus:ring-2 focus:ring-sky-500
    ${
      isSelected
        ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105 hover:bg-sky-700'
        : 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700 hover:bg-sky-100 dark:hover:bg-sky-800 hover:scale-105'
    }
  `}
>
  {tag}
</button>

  );
};


// Recipe Card Component
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-200 dark:border-gray-700 group overflow-hidden"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
          {recipe.image && !imageError ? (
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat size={48} className="text-slate-400" />
            </div>
          )}
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/75 backdrop-blur-sm rounded-md text-white text-xs font-medium">
            <Clock size={12} className="inline mr-1" />
            {recipe.timeMinutes}min
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-sky-400 ${
            
            isFavorite(recipe.id)
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg'
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-rose-500 shadow-md'
          }`}
          aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="capitalize font-medium">{recipe.difficulty}</span>
          <div className="flex items-center">
            <Star size={14} className="text-amber-500 mr-1" fill="currentColor" />
            <span className="font-medium">{recipe.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags?.slice(0, 3).map(tag => (
           <span
  key={tag}
  className="px-2 py-1 text-xs font-medium bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full"
>
  {tag}
</span>

          ))}
          {recipe.tags?.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 rounded-full">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Home Page
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
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Search size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No recipes match your search
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
  onClick={handleReset}
  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg 
             hover:from-sky-600 hover:to-sky-800 transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium shadow-sm"
>
  Clear all filters
</button>

        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

// Recipe Details Page
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
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Frown size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Recipe not found
          </h2>
          <button
  onClick={handleBack}
  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg 
             hover:from-sky-600 hover:to-sky-800 transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium shadow-sm"
>
  Back to Home
</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-white bg-emerald-50 dark:bg-emerald-900/20 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 border border-emerald-200 dark:border-emerald-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to recipes
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-64 bg-gray-100 dark:bg-gray-700 overflow-hidden">
            {recipe.image && !imageError ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat size={96} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFavorite(recipe.id)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
            aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={24} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-6">
          {/* Title and Meta */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {recipe.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                <span className="font-medium">{recipe.rating}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock size={16} className="mr-1" />
                <span>{recipe.timeMinutes} minutes</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users size={16} className="mr-1" />
                <span>{recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 capitalize">
                <TrendingUp size={16} className="mr-1" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {recipe.dietary?.map(diet => (
                <span
                  key={diet}
                  className="px-3 py-1.5 text-sm font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">{ingredient.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-medium">{ingredient.quantity}</span>
                  </li>
                ))}
              </ul>

              {/* Nutrition */}
              {recipe.nutrition && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Nutrition (per serving)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                      <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                        {recipe.nutrition.calories}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {recipe.nutrition.protein}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-100 dark:border-amber-800">
                      <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                        {recipe.nutrition.carbs}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-lg border border-rose-100 dark:border-rose-800">
                      <div className="text-lg font-bold text-rose-700 dark:text-rose-300">
                        {recipe.nutrition.fat}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-300 to-teal-600 text-white text-sm font-bold rounded-full flex items-center justify-center mr-4 mt-0.5 shadow-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
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

// Favorites Page
const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const { navigateToHome } = useContext(NavigationContext);
  
  const favoriteRecipes = useMemo(() => {
    return recipes.filter(recipe => favorites.includes(recipe.id));
  }, [favorites]);

  if (favoriteRecipes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          Your Favorite Recipes
          <Heart size={32} className="ml-3 text-red-500" fill="currentColor" />
        </h1>
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <HeartCrack size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No favorite recipes yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start browsing and save recipes you love!
          </p>
          <button
  onClick={navigateToHome}
  className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg 
             hover:from-blue-800 hover:to-blue-600 transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-sm"
>
  Browse recipes
</button>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
        Your Favorite Recipes ({favoriteRecipes.length})
        <Heart size={32} className="ml-3 text-red-500" fill="currentColor" />
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

// App Content Component
const AppContent = () => {
  const { currentPage } = useContext(NavigationContext);

  const getCurrentPageComponent = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'recipe':
        return <RecipeDetails />;
      case 'favorites':
        return <Favorites />;
      default:
        return <Home />;
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-black-900 via-blue-50/50 to-emerald-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors">
    {/* Optional: add a subtle backdrop blur for cohesion */}
    <div className="backdrop-blur-sm">
      <Header />
      <main className="p-4 md:p-8">
        {getCurrentPageComponent()}
      </main>
    </div>
  </div>
);

};

export default App;