export type RoleType = 'admin' | 'vendor' | 'customer';


export interface Role {
    id: string;
    type: RoleType
}
  