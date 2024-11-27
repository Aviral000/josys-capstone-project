import axios from "axios";
import { AdBanner } from "../models/AdBanner.type";
import { config } from "../utils/config"

const BASE_URL = `${config.BASE_URL}/banner`;

export const getBannerDetails = async (): Promise<AdBanner> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error("Server Error from fetching Banner");
    }
}

export const replaceBanner = async (id: number = 1, userObj: Omit<AdBanner, 'id'>): Promise<void> => {
    try {
        const url = `${BASE_URL}/${id}`;
        await axios.put(url, userObj);
    } catch (error) {
        throw new Error(`Server Error from updating Banner: ${error}`);
    }
}

const resetObj = {
    description: "",
    discount: ""
}

export const resetBanner = async (): Promise<void> => {
    try {
        const url = `${BASE_URL}/1`;
        await axios.put(url, resetObj);
    } catch (error) {
        throw new Error(`Server Error from updating Banner: ${error}`);
    }
}