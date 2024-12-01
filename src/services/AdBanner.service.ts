import axios from "axios";
import { AdBanner } from "../models/AdBanner.type";
import { config } from "../utils/config"

const BASE_URL = `${config.BASE_URL}/banner`;

export const getBannerDetails = async (): Promise<AdBanner[]> => {
    try {
        const response = await axios.get(BASE_URL);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return [];
    } catch (error) {
        throw new Error("Server Error from fetching Banners");
    }
};

export const replaceBanner = async (id: string, userObj: Omit<AdBanner, 'id'>): Promise<void> => {
    try {
        const url = `${BASE_URL}/${id}`;
        await axios.put(url, userObj);
    } catch (error) {
        throw new Error(`Server Error from updating Banner: ${error}`);
    }
}

type resetTpye = {
    heading ?: string;
    description : string,
    discount: string,
    image?: string
}

const resetObj: resetTpye = {
    heading: "",
    description: "",
    discount: "",
    image: ""
}

export const resetBanner = async (): Promise<void> => {
    try {
        const bannerIds = [1, 2, 3];
        const resetPromises = bannerIds.map((id) => {
            const url = `${BASE_URL}/${id}`;
            return axios.put(url, resetObj);
        });

        await Promise.all(resetPromises);
    } catch (error) {
        throw new Error(`Server Error from resetting Banners: ${error}`);
    }
};
