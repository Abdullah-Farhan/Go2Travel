import React, { createContext, useState, useEffect } from 'react';

// Create a context for hotel data
export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(() => {
    // Initialize state with data from localStorage, if available
    const storedHotel = localStorage.getItem('selectedHotel');
    return storedHotel ? JSON.parse(storedHotel) : null;
  });

  useEffect(() => {
    // Store hotel data in localStorage whenever selectedHotel changes
    if (selectedHotel) {
      localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
    } else {
      localStorage.removeItem('selectedHotel'); // Cleanup if no hotel is selected
    }
  }, [selectedHotel]);

  return (
    <HotelContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
