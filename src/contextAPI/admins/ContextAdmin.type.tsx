import React from 'react';

export interface ContextType {
  isLoggedIn: boolean;
  adminId: string;
  role: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAdminId: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void
}
