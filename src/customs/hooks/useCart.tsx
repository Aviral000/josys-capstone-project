import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart, deleteCart, deleteCartItem, getAllCarts, getCartById, updateCart } from '../../services/Cart.service';
import { Cart } from '../../models/Cart.type';

const useCart = (cartId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: carts,
    error: fetchError,
    isLoading: isFetchingCarts,
    isError: isFetchError,
  } = useQuery<Cart[], Error>({
    queryKey: ['carts'],
    queryFn: getAllCarts,
  });

  const {
    data: cart,
    error: fetchErrorId,
    isLoading: isFetchingCart,
    isError: isFetchErrorId,
  } = useQuery<Cart, Error>({
    queryKey: ['carts', cartId],
    queryFn: () => getCartById(cartId as string),
    enabled: !!cartId,
  });

  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Omit<Cart, 'id'> }) =>
      updateCart(id, updates),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['carts'] });
        queryClient.invalidateQueries({ queryKey: ['cart', variables.id] });
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: ({ cartId, productId }: { cartId: string; productId: string }) =>
      deleteCartItem(cartId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });

  return {
    carts,
    isFetchingCarts,
    isFetchError,
    fetchError,
    cart,
    isFetchingCart,
    isFetchErrorId,
    fetchErrorId,
    createCart: createCartMutation,
    updateCart: updateCartMutation,
    deleteCart: deleteCartMutation,
    deleteCartItem: deleteCartItemMutation,
  };
};

export { useCart };
