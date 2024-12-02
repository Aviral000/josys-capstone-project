import { Product } from "../models/Product.type";
import axios from "axios";
import { config } from "../utils/config";
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from "../utils/formatData";

const BASE_URL: string | undefined = `${config.BASE_URL}/products`;

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all products: ${error}`);
    }
};

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${id}: ${error}`);
    }
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
    try {
        const date = formatDate(new Date());
        const newProduct: Product = {
            ...product,
            id: uuidv4(),
            uploadedDate: date
        };
        const response = await axios.post(BASE_URL, newProduct);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create product: ${error}`);
    }
};

export const updateProduct = async (id: string, updates: Omit<Product, 'id'>): Promise<Product> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update product with id ${id}: ${error}`);
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete product with id ${id}: ${error}`);
    }
};
