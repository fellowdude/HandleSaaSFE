export interface ISupplierLocalInfo {
    name: string;
    department: string;
    province: string;
    district: string;
    address: string;
    phone: string;
    email: string;
    supplier_id: string;
    /* deleted: boolean; */
    create_date?: Date;
    update_date?: Date;
    create_by?: string;
    update_by?: string;
}