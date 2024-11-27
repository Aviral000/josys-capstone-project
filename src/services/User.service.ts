import { User } from "../models/User.type";
import axios from 'axios';
import crypto from 'crypto';
import { config } from '../utils/config';

const BASE_URL: string = `${config.BASE_URL}/users`;

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all users data: ${error}`);
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user with id ${id}: ${error}`);
    }
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    try {
        const newUser = { ...user, id: crypto.randomUUID() };
        const response = await axios.post(`${BASE_URL}`, newUser);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
    }
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user with id ${id}: ${error}`);
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete user with id ${id}: ${error}`);
    }
};

export const getUsersByRole = async (roleId: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${BASE_URL}?roleId=${roleId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch users with roleId ${roleId}: ${error}`);
    }
};
