import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";
import { Request } from "../models/Request.type";

const BASE_URL: string | undefined = `${config.BASE_URL}/requests`;

export const getAllRequest = async (): Promise<Request[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all requests: ${error}`);
    }
};

export const createRequest = async (request: Omit<Request, "id">): Promise<Request> => {
    try {
        const newRequest = { ...request, id: uuidv4() };
        const response = await axios.post(BASE_URL, newRequest);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create request: ${error}`);
    }
};

export const updateRequest = async (id: string, updates: Omit<Request, 'id'>): Promise<Request> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update Request with id ${id}: ${error}`);
    }
};

export const deleteRequest = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete Request with id ${id}: ${error}`);
    }
};
