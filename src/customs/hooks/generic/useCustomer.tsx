import { useEntity } from './useEntity';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../../services/Customer.service';
import { Customer } from '../../../models/Customer.type';

export const useCustomer = (customerId?: string) => {
  return useEntity<Customer>(
    'customers',
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    customerId
  );
};
