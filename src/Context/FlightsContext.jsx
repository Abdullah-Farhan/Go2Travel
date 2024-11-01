import React, { createContext, useState, useEffect } from 'react';

export const FlightsContext = createContext();

export const FlightsProvider = ({ children }) => {
  // State for selected dates
  const [selectedDates, setSelectedDates] = useState(() => {
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
      const parsedDates = JSON.parse(storedDates);
      return Array.isArray(parsedDates)
        ? parsedDates.map(dateStr => new Date(dateStr))
        : new Date(parsedDates);
    }
    return null;
  });

  // State for guest information
  const [guest, setGuest] = useState(() => {
    const storedGuest = localStorage.getItem('guest');
    return storedGuest ? JSON.parse(storedGuest) : null;
  });

  // State for selected hotel
  const [selectedHotel, setSelectedHotel] = useState(() => {
    const storedHotel = localStorage.getItem('selectedHotel');
    return storedHotel ? JSON.parse(storedHotel) : null;
  });

  // State for search query
  const [searchQuery, setSearchQuery] = useState(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    return storedQuery ? JSON.parse(storedQuery) : '';
  });

  // State for to destination query
  const [toQuery, setToQuery] = useState(() => {
    const storedQuery = localStorage.getItem('toQuery');
    return storedQuery ? JSON.parse(storedQuery) : '';
  });

  // State for trip type
  const [tripType, setTripType] = useState(() => {
    const storedTripType = localStorage.getItem('tripType');
    return storedTripType ? JSON.parse(storedTripType) : 'roundTrip';
  });

  // Persist selectedDates to localStorage
  useEffect(() => {
    if (selectedDates) {
      const datesToStore = Array.isArray(selectedDates)
        ? selectedDates.map(date => date.toISOString())
        : selectedDates.toISOString();
      localStorage.setItem('selectedDates', JSON.stringify(datesToStore));
    } else {
      localStorage.removeItem('selectedDates');
    }
  }, [selectedDates]);

  // Persist guest information to localStorage
  useEffect(() => {
    if (guest) {
      localStorage.setItem('guest', JSON.stringify(guest));
    } else {
      localStorage.removeItem('guest');
    }
  }, [guest]);

  // Persist selectedHotel to localStorage
  useEffect(() => {
    if (selectedHotel) {
      localStorage.setItem('selectedHotel', JSON.stringify(selectedHotel));
    } else {
      localStorage.removeItem('selectedHotel');
    }
  }, [selectedHotel]);

  // Persist searchQuery to localStorage
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    } else {
      localStorage.removeItem('searchQuery');
    }
  }, [searchQuery]);

  // Persist toQuery to localStorage
  useEffect(() => {
    if (toQuery) {
      localStorage.setItem('toQuery', JSON.stringify(toQuery));
    } else {
      localStorage.removeItem('toQuery');
    }
  }, [toQuery]);

  // Persist tripType to localStorage
  useEffect(() => {
    localStorage.setItem('tripType', JSON.stringify(tripType));
  }, [tripType]);

  // Reset guest data when on the homepage
  useEffect(() => {
    if (window.location.pathname === '/') {
      setGuest(null);
    }
  }, []);

  return (
    <FlightsContext.Provider
      value={{
        selectedDates,
        setSelectedDates,
        guest,
        setGuest,
        selectedHotel,
        setSelectedHotel,
        searchQuery,
        setSearchQuery,
        toQuery,
        setToQuery,
        tripType,
        setTripType
      }}
    >
      {children}
    </FlightsContext.Provider>
  );
};
