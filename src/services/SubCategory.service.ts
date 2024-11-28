import { SubType } from "../models/Category.type";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/sub_types`;

export const getAllSubCategories = async (): Promise<SubType[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all products: ${error}`);
    }
};

export const getSubCategoryById = async (id: string): Promise<SubType> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${id}: ${error}`);
    }
};

export const createSubCategory = async (subtype: Omit<SubType, "id">): Promise<SubType> => {
    try {
        const newSubCategory = { ...subtype, id: uuidv4() };
        const response = await axios.post(BASE_URL, newSubCategory);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create product: ${error}`);
    }
};

export const updateSubCategory = async (id: string, updates: Partial<SubType>): Promise<SubType> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update product with id ${id}: ${error}`);
    }
};

export const deleteSubCategory = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete product with id ${id}: ${error}`);
    }
};
