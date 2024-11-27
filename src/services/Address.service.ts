import { Address } from "../models/Address.type";
import axios from "axios";
import crypto from "crypto";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/addresses`;

export const getAllAddresses = async (): Promise<Address[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all addresses: ${error}`);
    }
};

export const getAddressById = async (id: string): Promise<Address> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch address with id ${id}: ${error}`);
    }
};

export const createAddress = async (address: Omit<Address, "id">): Promise<Address> => {
    try {
        const newAddress = { ...address, id: crypto.randomUUID() };
        const response = await axios.post(BASE_URL, newAddress);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create address: ${error}`);
    }
};

export const updateAddress = async (id: string, updates: Partial<Address>): Promise<Address> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update address with id ${id}: ${error}`);
    }
};

export const deleteAddress = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete address with id ${id}: ${error}`);
    }
};
