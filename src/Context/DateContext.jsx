import React, { createContext, useState, useEffect } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDates, setSelectedDates] = useState(() => {
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
      // Parse and convert to Date object(s)
      const parsedDates = JSON.parse(storedDates);
      // Check if parsedDates is an array or single date, then convert to Date
      if (Array.isArray(parsedDates)) {
        return parsedDates.map(dateStr => new Date(dateStr));
      }
      return new Date(parsedDates);
    }
    return null;
  });

  useEffect(() => {
    if (selectedDates) {
      // Convert Date(s) to ISO string for storage
      const datesToStore = Array.isArray(selectedDates)
        ? selectedDates.map(date => date.toISOString())
        : selectedDates.toISOString();
      localStorage.setItem('selectedDates', JSON.stringify(datesToStore));
    } else {
      localStorage.removeItem('selectedDates');
    }
  }, [selectedDates]);

  return (
    <DateContext.Provider value={{ selectedDates, setSelectedDates }}>
      {children}
    </DateContext.Provider>
  );
};
