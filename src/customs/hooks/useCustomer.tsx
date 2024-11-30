import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/Customer.service";
import { Customer } from "../../models/Customer.type";

export const useCustomer = (customerId?: string) => {
  const queryClient = useQueryClient();

  const {
    data: customers,
    error: fetchError,
    isLoading: isFetchingCustomers,
    isError: isFetchError,
  } = useQuery<Customer[], Error>({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  const {
    data: customer,
    error: fetchErrorId,
    isLoading: isFetchingCustomer,
    isError: isFetchErrorId,
  } = useQuery<Customer, Error>({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId as string),
    enabled: !!customerId,
  });

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Omit<Customer, 'id'> }) =>
      updateCustomer(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return {
    customers,
    isFetchingCustomers,
    isFetchError,
    fetchError,
    customer,
    isFetchingCustomer,
    isFetchErrorId,
    fetchErrorId,
    createCustomer: createCustomerMutation,
    updateCustomer: updateCustomerMutation,
    deleteCustomer: deleteCustomerMutation,
  };
};
