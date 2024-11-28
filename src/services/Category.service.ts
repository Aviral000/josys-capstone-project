import { Category } from "../models/Category.type";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all products: ${error}`);
    }
};

export const getCategoryById = async (id: string): Promise<Category> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${id}: ${error}`);
    }
};

export const createCategory = async (category: Omit<Category, "id">): Promise<Category> => {
    try {
        const newCategory = { ...category, id: uuidv4() };
        const response = await axios.post(BASE_URL, newCategory);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create product: ${error}`);
    }
};

export const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update product with id ${id}: ${error}`);
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete product with id ${id}: ${error}`);
    }
};
