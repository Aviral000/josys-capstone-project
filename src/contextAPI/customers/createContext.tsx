import { createContext } from 'react';
import { ContextType } from './context.type';

export const customerContext = createContext<ContextType>({
  isLoggedIn: false,
  userId: '',
  cartId: '',
  role: 'Customer',
  setIsLoggedIn: () => {},
  setUserId: () => {},
  setCartId: () => {},
  setRole: () => {},
});
