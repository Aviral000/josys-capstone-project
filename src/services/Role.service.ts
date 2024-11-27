import { Role } from "../models/Role.type";
import axios from "axios";
import crypto from "crypto";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/roles`;

export const getAllRoles = async (): Promise<Role[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all roles: ${error}`);
    }
};

export const getRoleById = async (id: string): Promise<Role> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch role with id ${id}: ${error}`);
    }
};

export const createRole = async (role: Omit<Role, "id">): Promise<Role> => {
    try {
        const newRole = { ...role, id: crypto.randomUUID() };
        const response = await axios.post(BASE_URL, newRole);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create role: ${error}`);
    }
};

export const updateRole = async (id: string, updates: Partial<Role>): Promise<Role> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update role with id ${id}: ${error}`);
    }
};

export const deleteRole = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete role with id ${id}: ${error}`);
    }
};
