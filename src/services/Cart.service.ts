import { Cart } from "../models/Cart.type";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";

const BASE_URL: string | undefined = `${config.BASE_URL}/carts`;

export const getAllCarts = async (): Promise<Cart[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch all carts: ${error}`);
    }
};

export const getCartById = async (id: string): Promise<Cart> => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch cart with id ${id}: ${error}`);
    }
};

export const createCart = async (cart: Omit<Cart, "id">): Promise<Cart> => {
    try {
        const newCart = { ...cart, id: uuidv4() };
        const response = await axios.post(BASE_URL, newCart);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create cart: ${error}`);
    }
};

export const updateCart = async (id: string, updates: Omit<Cart, 'id'>): Promise<Cart> => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update cart with id ${id}: ${error}`);
    }
};

export const deleteCart = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete cart with id ${id}: ${error}`);
    }
};

export const deleteCartItem = async (
    cartId: string,
    productId: string
  ): Promise<Cart> => {
    try {
      const cart = await getCartById(cartId);
      const updatedItems = cart.items.filter((item) => item.productId !== productId);
      const updatedCart = { ...cart, items: updatedItems };
      const response = await axios.put(`${BASE_URL}/${cartId}`, updatedCart);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete item from cart: ${error}`);
    }
  };