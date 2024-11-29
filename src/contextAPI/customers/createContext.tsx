import { createContext } from 'react';
import { ContextType } from './context.type';

export const customerContext = createContext<ContextType>({
  isLoggedIn: false,
  userId: '',
  cartId: '',
  role: '',
  setIsLoggedIn: () => {},
  setUserId: () => {},
  setCartId: () => {},
  setRole: () => {},
  logout: () => {}
});
