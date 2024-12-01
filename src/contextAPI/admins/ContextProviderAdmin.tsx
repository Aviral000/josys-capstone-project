import React, { useState } from 'react';
import { adminContext } from './CreateContextAdmin';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [role, setRole] = useState('');

  const logout = (): void => {
    setIsLoggedIn(false);
    setAdminId('');
    setRole('');
  };

  return (
    <adminContext.Provider
      value={{
        isLoggedIn,
        adminId,
        role,
        setIsLoggedIn,
        setAdminId,
        setRole,
        logout
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
