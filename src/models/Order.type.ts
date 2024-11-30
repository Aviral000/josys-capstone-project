export interface Order {
    id?: string,
    customerId: string,
    items: ItemListOrder[],
    status: string
}

export interface ItemListOrder {
    productId: string,
    quantity: number
}