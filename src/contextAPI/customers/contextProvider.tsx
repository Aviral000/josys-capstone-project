import React, { useState } from 'react';
import { customerContext } from './createContext';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [cartId, setCartId] = useState<string>('');
  const [role, setRole] = useState('');
  
  const logout = (): void => {
    setIsLoggedIn(false);
    setUserId('');
    setCartId('');
    setRole('');
    localStorage.clear();
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
