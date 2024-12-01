import React, { useState } from 'react';
import { VendorContext } from './CreateContext';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [vendorId, setVendorId] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const logout = (): void => {
    setIsLoggedIn(false);
    setVendorId('');
    setRole('');
  };

  return (
    <VendorContext.Provider
      value={{
        isLoggedIn,
        vendorId,
        role,
        setIsLoggedIn,
        setVendorId,
        setRole,
        logout
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
