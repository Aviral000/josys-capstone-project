import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";
import { Order } from "../models/Order.type";

const BASE_URL: string | undefined = `${config.BASE_URL}/orders`;

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all roles: ${error}`);
    }
};

export const getOrderById = async (id: string): Promise<Order> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch role with id ${id}: ${error}`);
    }
};

export const createOrder = async (role: Omit<Order, "id">): Promise<Order> => {
    try {
        const newRole = { ...role, id: uuidv4() };
        const response = await axios.post(BASE_URL, newRole);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create role: ${error}`);
    }
};

export const updateOrder = async (id: string, updates: Omit<Order, 'id'>): Promise<Order> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update role with id ${id}: ${error}`);
    }
};

export const deleteOrder = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete role with id ${id}: ${error}`);
    }
};
