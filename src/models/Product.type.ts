export interface Product {
    id: string;
    productName: string;
    productDesc: string;
    cost: number;
    vendorId: string;
    categoryId: string;
    subtypeId: string;
    images: string[];
    discount: number;
    stock: number;
    uploadedDate: string
}