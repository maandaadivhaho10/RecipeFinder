import React from 'react';

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

export default TagChip;