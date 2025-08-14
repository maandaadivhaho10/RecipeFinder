import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } from 'react';
import { Moon, Sun, ChefHat, Heart, Star, Clock, Users, TrendingUp, Search, Frown, HeartCrack, ArrowLeft, Timer, Tags, RotateCcw, Utensils, Menu, X } from 'lucide-react';

// Recipe data with real images
const recipes = [
  {
    "id": "rec_001",
    "title": "One-Pot Creamy Tomato Pasta",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    navigateToHome();
    closeMobileMenu();
  }, [navigateToHome, closeMobileMenu]);

  const handleFavoritesClick = useCallback(() => {
    navigateToFavorites();
    closeMobileMenu();
  }, [navigateToFavorites, closeMobileMenu]);

  return (
    <>
      <header className="backdrop-blur-xl bg-gradient-to-r from-black via-gray-900 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900 shadow-2xl border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo / Title */}
            <button 
              onClick={navigateToHome}
              className="text-xl md:text-2xl font-bold text-white tracking-wide hover:text-gray-200 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-3 md:px-4 py-2 md:py-3 flex items-center group"
            >
              <Utensils size={24} className="mr-2 md:mr-3 text-gray-300 drop-shadow-lg group-hover:rotate-12 transition-transform duration-300" />
              <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-md hover:from-blue-800 hover:to-blue-400 transition-all duration-500 ease-in-out">
                SpoonSense
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={navigateToHome}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg ${
                  currentPage === 'home' 
                    ? 'text-black bg-gradient-to-r from-white to-gray-200 border border-gray-300 shadow-white/25'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/40 border border-gray-600 hover:border-gray-500'
                }`}
              >
                Home
              </button>
              <button 
                onClick={navigateToFavorites}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  currentPage === 'favorites'
                    ? 'text-black bg-gradient-to-r from-white to-gray-200 border border-gray-300 shadow-lg shadow-white/25'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/40 border border-gray-600 hover:border-gray-500'
                }`}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white border border-gray-600 hover:border-gray-500"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="fixed top-16 right-0 w-64 h-full bg-gradient-to-b from-black via-gray-900 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900 shadow-2xl border-l border-gray-700">
            <nav className="flex flex-col p-6 space-y-4">
              <button 
                onClick={handleHomeClick}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  currentPage === 'home' 
                    ? 'text-black bg-gradient-to-r from-white to-gray-200 border border-gray-300'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/40 border border-gray-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={handleFavoritesClick}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  currentPage === 'favorites'
                    ? 'text-black bg-gradient-to-r from-white to-gray-200 border border-gray-300'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/40 border border-gray-600'
                }`}
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute top-2 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
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
                className="transition-all duration-300"
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

// Tag Chip Component
const TagChip = ({ tag, isSelected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-bold rounded-xl md:rounded-2xl border-2 transition-all duration-300 transform
        focus:outline-none focus:ring-4 focus:ring-gray-400/50 shadow-lg
        ${
          isSelected
            ? 'bg-gradient-to-r from-gray-800 to-black text-white border-gray-600 shadow-gray-400/50 scale-105 hover:from-gray-900 hover:to-gray-800'
            : 'bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105'
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
      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-400 border-2 border-gray-200 dark:border-gray-700 group overflow-hidden transform hover:scale-105"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="relative">
        <div className="h-48 md:h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
          {recipe.image && !imageError ? (
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat size={48} className="text-gray-500 md:hidden" />
              <ChefHat size={64} className="text-gray-500 hidden md:block" />
            </div>
          )}
          <div className="absolute top-3 md:top-4 left-3 md:left-4 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-black/90 to-gray-800/90 backdrop-blur-sm rounded-lg md:rounded-xl text-white text-xs md:text-sm font-bold shadow-lg">
            <Clock size={12} className="inline mr-1.5 md:mr-2" />
            {recipe.timeMinutes}min
          </div>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 md:top-4 right-3 md:right-4 p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-110
            focus:outline-none focus:ring-4 focus:ring-red-300/50 shadow-xl ${
            isFavorite(recipe.id)
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
              : 'bg-white/95 text-gray-700 hover:bg-gray-100 hover:text-red-500 border-2 border-gray-300'
          }`}
          aria-label={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="md:hidden" />
          <Heart size={20} fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} className="hidden md:block" />
        </button>
      </div>
      
      <div className="p-4 md:p-6">
        <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-2 md:mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
          <span className="capitalize font-bold text-sm md:text-base bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-2.5 md:px-3 py-1 rounded-lg md:rounded-xl">
            {recipe.difficulty}
          </span>
          <div className="flex items-center bg-gradient-to-r from-yellow-100 to-amber-200 dark:from-yellow-900/40 dark:to-amber-900/40 px-2.5 md:px-3 py-1 rounded-lg md:rounded-xl border border-yellow-300 dark:border-yellow-600 shadow-md">
            <Star size={14} className="text-yellow-600 dark:text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-bold text-yellow-800 dark:text-yellow-200 text-sm md:text-base">{recipe.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {recipe.tags?.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs font-bold bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-800 dark:text-gray-200 rounded-lg md:rounded-xl shadow-md"
            >
              {tag}
            </span>
          ))}
          {recipe.tags?.length > 3 && (
            <span className="px-2.5 md:px-3 py-1.5 md:py-2 text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600 text-white rounded-lg md:rounded-xl shadow-md">
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
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 flex items-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Your Favorite Recipes
          <Heart size={40} className="ml-4 text-red-500" fill="currentColor" />
        </h1>
        <div className="text-center py-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 shadow-2xl">
          <HeartCrack size={80} className="mx-auto text-gray-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            No favorite recipes yet
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Start browsing and save recipes you love!
          </p>
          <button
            onClick={navigateToHome}
            className="px-8 py-4 bg-gradient-to-r from-gray-700 to-black text-white rounded-2xl 
                       hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-gray-400 font-bold shadow-xl text-lg"
          >
            Browse recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 flex items-center bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
        Your Favorite Recipes ({favoriteRecipes.length})
        <Heart size={40} className="ml-4 text-red-500" fill="currentColor" />
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="backdrop-blur-sm">
        <Header />
        <main className="p-2 md:p-4 lg:p-8">
          {getCurrentPageComponent()}
        </main>
      </div>
    </div>
  );
};

export default App;