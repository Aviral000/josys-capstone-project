import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/Customer.service";
import { Customer } from "../../models/Customer.type";

const useCustomer = (customerId?: string) => {
  const queryClient = useQueryClient();

  // Fetch all customers
  const {
    data: customers,
    error: fetchError,
    isLoading: isFetchingCustomers,
    isError: isFetchError,
  } = useQuery<Customer[], Error>({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  // Fetch a single customer by ID
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

  // Mutation to create a customer
  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] }); // Refetch customers
    },
  });

  // Mutation to update a customer
  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Customer> }) =>
      updateCustomer(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
    },
  });

  // Mutation to delete a customer
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

export { useCustomer };
