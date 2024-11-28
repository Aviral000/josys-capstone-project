import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart, deleteCart, getAllCarts, getCartById, updateCart } from '../../services/Cart.service';
import { Cart } from '../../models/Cart.type';
import { Variable } from 'lucide-react';

const useCart = (cartId?: string) => {
  const queryClient = useQueryClient();

  // Fetch all carts
  const {
    data: carts,
    error: fetchError,
    isLoading: isFetchingCarts,
    isError: isFetchError,
  } = useQuery<Cart[], Error>({
    queryKey: ['carts'],
    queryFn: getAllCarts,
  });

  // Fetch a single cart by ID
  const {
    data: cart,
    error: fetchErrorId,
    isLoading: isFetchingCart,
    isError: isFetchErrorId,
  } = useQuery<Cart, Error>({
    queryKey: ['cart', cartId],
    queryFn: () => getCartById(cartId as string),
    enabled: !!cartId,
  });

  // Mutation to create a cart
  const createCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] }); // Invalidate cache to refetch carts
    },
  });

  // Mutation to update a cart
  const updateCartMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Cart> }) =>
      updateCart(id, updates),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['carts'] });
        queryClient.invalidateQueries({ queryKey: ['cart', variables.id] });
    },
  });

  // Mutation to delete a cart
  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
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
  };
};

export { useCart };
