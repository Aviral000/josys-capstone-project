import { Vendor } from "../models/Vendor.type";
import axios from "axios";
import { config } from "../utils/config";
import { hashPassword, verifyPassword } from "../utils/encryption";
import { v4 } from "uuid";

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

export const getVendorsByQuery = async (field: string, value: string): Promise<Vendor[]> => {
    try {
      const response = await axios.get(`${BASE_URL}?${field}=${value}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to query vendors by ${field}: ${error}`);
    }
};

export const verifyVendor = async (email: string, password: string): Promise<Vendor> => {
    try {
        const response = await axios.get(`${BASE_URL}?email=${email}`);

        if(await verifyPassword(password, response.data[0].password) === false) {
            throw new Error("Incorrect password");
        }

        if(response.data[0].verified === false) {
            throw new Error("Please wait! Unverified Seller");
        }
        
        return response.data;
    } catch (error) {
        throw new Error(`Please try again Later! ${error}`);
    }
}

export const createVendor = async (vendor: Omit<Vendor, 'id'>): Promise<Vendor> => {
    try {
        const existingEmailVendors = await getVendorsByQuery("email", vendor.email);
        if (existingEmailVendors.length > 0) {
            throw new Error("Email address is already in use. Please use a different email.");
        }
    
        const existingPhoneVendors = await getVendorsByQuery("phoneNumber", vendor.phoneNumber);
        if (existingPhoneVendors.length > 0) {
            throw new Error("Phone number is already in use. Please use a different phone number.");
        }
    
        const encryptedPwd = await hashPassword(vendor.password);
    
        const vendorObj = {
            ...vendor,
            id: v4(),
            password: encryptedPwd
        };
    
        const response = await axios.post<Vendor>(BASE_URL, vendorObj);
    
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create vendor: ${error}`);
    }
};

export const updateVendor = async (id: string, updates: Omit<Vendor, 'id'>): Promise<Vendor> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
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
