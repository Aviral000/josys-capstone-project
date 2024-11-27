import { Customer } from "../models/Customer.type";
import axios from "axios";
import { config } from "../utils/config";
import { hashPassword, verifyPassword } from "../utils/encryption";

const BASE_URL: string | undefined = `${config.BASE_URL}/customers`;

export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all customers: ${error}`);
    }
};

export const getCustomerById = async (id: string): Promise<Customer> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch customer with id ${id}: ${error}`);
    }
};

export const getCustomersByQuery = async (query: string, value: string): Promise<Customer[]> => {
    try {
        const response = await axios.get(`${BASE_URL}?${query}=${value}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch customers with ${query} ${value}: ${error}`);
    }
};

export const verifyCustomer = async (email: string, password: string): Promise<Customer> => {
    try {
        const response = await axios.get(`${BASE_URL}?email=${email}`);

        if(await verifyPassword(password, response.data[0].password) === false) {
            throw new Error("Incorrect password");
        }
        
        return response.data;
    } catch (error) {
        throw new Error(`Please try again Later! ${error}`);
    }
}

export const createCustomer = async (customer: Customer): Promise<Customer> => {
    try {
        const existingEmailCustomers = await getCustomersByQuery('email', customer.email);
        if (existingEmailCustomers.length > 0) {
            throw new Error('Email address is already in use. Please use a different email.');
        }

        const existingPhoneCustomers = await getCustomersByQuery('phoneNumber', customer.phoneNumber);
        if (existingPhoneCustomers.length > 0) {
            throw new Error('Phone number is already in use. Please use a different phone number.');
        }

        const encryptedPwd = await hashPassword(customer.password);

        const response = await axios.post(BASE_URL, { ...customer, password: encryptedPwd });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create customer: ${error}`);
    }
};

export const updateCustomer = async (id: string, updates: Partial<Customer>): Promise<Customer> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update customer with id ${id}: ${error}`);
    }
};

export const deleteCustomer = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete customer with id ${id}: ${error}`);
    }
};
