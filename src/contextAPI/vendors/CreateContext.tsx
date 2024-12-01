import { createContext } from 'react';
import { ContextType } from './context.type';

export const VendorContext = createContext<ContextType>({
  isLoggedIn: false,
  vendorId: '',
  role: '',
  setIsLoggedIn: () => {},
  setVendorId: () => {},
  setRole: () => {},
  logout: () => {}
});
