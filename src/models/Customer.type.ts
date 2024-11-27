import { User } from "./User.type";

export interface Customer extends User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cartId?: string;
}
