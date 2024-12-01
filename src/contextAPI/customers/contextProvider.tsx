import React, { useState } from 'react';
import { customerContext } from './createContext';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [cartId, setCartId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState('');

  if(isLoggedIn || role) {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
  }

  const logout = (): void => {
    setIsLoggedIn(false);
    setUserId('');
    setCartId(undefined);
    setRole('');
  };

  return (
    <customerContext.Provider
      value={{
        isLoggedIn,
        userId,
        cartId,
        role,
        setIsLoggedIn,
        setUserId,
        setCartId,
        setRole,
        logout
      }}
    >
      {children}
    </customerContext.Provider>
  );
};
