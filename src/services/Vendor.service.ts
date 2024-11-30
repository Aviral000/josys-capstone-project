import { Vendor } from "../models/Vendor.type";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/vendors`;

export const getAllVendors = async (): Promise<Vendor[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all vendors: ${error}`);
    }
};

export const getVendorById = async (id: string): Promise<Vendor> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch vendor with id ${id}: ${error}`);
    }
};

export const createVendor = async (vendor: Omit<Vendor, "id">): Promise<Vendor> => {
    try {
        const newVendor = { ...vendor, id: uuidv4() };
        const response = await axios.post(BASE_URL, newVendor);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create vendor: ${error}`);
    }
};

export const updateVendor = async (id: string, updates: Partial<Vendor>): Promise<Vendor> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update vendor with id ${id}: ${error}`);
    }
};

export const deleteVendor = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete vendor with id ${id}: ${error}`);
    }
};
