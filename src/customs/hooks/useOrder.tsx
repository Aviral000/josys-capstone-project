import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from '../../services/Order.service';
import { Order } from '../../models/Order.type';

const useOrder = (orderId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: orders,
    error: fetchError,
    isLoading: isFetchingOrders,
    isError: isFetchError,
  } = useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  const {
    data: order,
    error: fetchErrorId,
    isLoading: isFetchingOrder,
    isError: isFetchErrorId,
  } = useQuery<Order, Error>({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderById(orderId as string),
    enabled: !!orderId,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Omit<Order, 'id'> }) =>
      updateOrder(id, updates),
    onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  return {
    orders,
    isFetchingOrders,
    isFetchError,
    fetchError,
    order,
    isFetchingOrder,
    isFetchErrorId,
    fetchErrorId,
    createOrder: createOrderMutation,
    updateOrder: updateOrderMutation,
    deleteOrder: deleteOrderMutation,
  };
};

export { useOrder };
