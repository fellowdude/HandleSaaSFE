export interface IDetailProduct {
    discount: number
    discount_price: number
    method_send: string
    price: number
    product_id: string
    quantity: number
}

export interface IOrderSave {
    address_id: string
    currency: string
    delivery_address: string
    delivery_department_id: string
    delivery_district_id: string
    delivery_name_customer: string
    delivery_phone_customer: string
    delivery_province_id: string
    delivery_reference: string
    delivery_type_address: string
    detail: Array<IDetailProduct>
    invoice_address: string
    invoice_business_name: string
    invoice_department: string
    invoice_district: string
    invoice_province: string
    invoice_ruc: string
    invoice_send: boolean
    user_phone: string
    order_id?: string

    shopping_cart_id?: string
    type_payment?: string
}

export interface IOrderReturn {
    amount_delivery: number
    amount_discount: number
    amount_subtotal: number
    amount_total: number
    code: string
    rangeMax: number
    rangeMin: number
    _id: string
}