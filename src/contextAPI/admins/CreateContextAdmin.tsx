import { createContext } from 'react';
import { ContextType } from './ContextAdmin.type';

export const adminContext = createContext<ContextType>({
  isLoggedIn: false,
  adminId: '',
  role: '',
  setIsLoggedIn: () => {},
  setAdminId: () => {},
  setRole: () => {},
  logout: () => {}
});
