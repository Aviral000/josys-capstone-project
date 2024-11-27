import React, { useState } from 'react';
import { customerContext } from './createContext';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [cartId, setCartId] = useState<string | undefined>(undefined);
  const [role, setRole] = useState('Customer');

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
      }}
    >
      {children}
    </customerContext.Provider>
  );
};
