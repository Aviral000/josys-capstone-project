import React from 'react';

export interface ContextType {
  isLoggedIn: boolean;
  userId: string;
  cartId?: string;
  role: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setCartId: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void
}
