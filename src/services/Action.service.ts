import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";
import { Actions } from "../models/Action.type";
import { formatDate } from "../utils/formatData";

const BASE_URL: string | undefined = `${config.BASE_URL}/actions`;

export const getAllActions = async (): Promise<[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all products: ${error}`);
    }
};

export const getActionsByVendorId = async (VendorId: string): Promise<Actions[]> => {
    try {
        const response = await axios.get(`${BASE_URL}?vendorId=${VendorId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch product with id ${VendorId}: ${error}`);
    }
};

export const createAction = async (action: Omit<Actions, "id">): Promise<Actions> => {
    try {
        const getDate = formatDate(new Date());
        const newAction = { ...action, id: uuidv4(), uploadedDate: getDate, customerAction: false };
        const response = await axios.post(BASE_URL, newAction);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create product: ${error}`);
    }
};

export const updateAction = async (id: string, updates: Omit<Actions, 'id'>): Promise<Actions> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update product with id ${id}: ${error}`);
    }
};

export const deleteAction = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete action with id ${id}: ${error}`);
    }
};
