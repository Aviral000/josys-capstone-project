import axios from 'axios';
import { config } from '../utils/config';

const BASE_URL = `${config.BASE_URL}/auth`;

interface AuthResponse {
    token: string;
    userId: string;
    role: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error(`Login failed: ${error}`);
    }
};

export const logout = async (): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/logout`);
    } catch (error) {
        throw new Error(`Logout failed: ${error}`);
    }
};
