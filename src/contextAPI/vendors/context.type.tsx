import React from 'react';

export interface ContextType {
  isLoggedIn: boolean;
  vendorId: string;
  role: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setVendorId: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void
}
