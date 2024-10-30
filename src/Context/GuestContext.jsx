import React, { createContext, useState, useEffect } from 'react';

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guest, setGuest] = useState(() => {
    const storedGuest = localStorage.getItem('guest');
    return storedGuest ? JSON.parse(storedGuest) : null;
  });

  useEffect(() => {
    if (guest) {
      localStorage.setItem('guest', JSON.stringify(guest));
    } else {
      localStorage.removeItem('guest');
    }
  }, [guest]);

  useEffect(() => {
    if (location.pathname === '/') {
      setGuest(null);
    }
  }, [location.pathname]);

  return (
    <GuestContext.Provider value={{ guest, setGuest }}>
      {children}
    </GuestContext.Provider>
  );
};
