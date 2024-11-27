import axios from 'axios';
import { config } from '../utils/config';

const BASE_URL = `${config.BASE_URL}/users`;

export const getUserRole = async (userId: string): Promise<string> => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data.role;
    } catch (error) {
      throw new Error(`Failed to fetch user role: ${error}`);
    }
};

export const hasPermission = async (userId: string, requiredRole: string): Promise<boolean> => {
    try {
      const role = await getUserRole(userId);
      return role === requiredRole;
    } catch (error) {
      throw new Error(`Permission check failed: ${error}`);
    }
};
