export interface IAddressInfo {
    user_id: string;
    name: string;
    cellphone: string;
    type_address: string;
    department: string;
    province: string;
    district: string;
    address: string;
    reference: string;
    deleted: boolean;
    ubigeo?: string;
    create_date?: Date;
    update_date?: Date;
    create_by?: string;
    update_by?: string;
    type_address_ERP?;
}