export interface Cart {
    id: string;
    customerId: string;
    items: CartItem[];
}
  
export interface CartItem {
    productId: string;
    quantity: number;
}