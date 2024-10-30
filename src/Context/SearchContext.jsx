import React, { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    return storedQuery ? JSON.parse(storedQuery) : '';
  });

  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    } else {
      localStorage.removeItem('searchQuery'); 
    }
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
