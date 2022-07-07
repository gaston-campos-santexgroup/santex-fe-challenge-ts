export interface Totals {
    totalPrice: number;
    totalQuantity: number;
}

export interface AddItemToOrderInputs {
    itemVariantId: number;
    quantity: number;
    addItemToCart(updatedOrder: AddItemToOrder): void;
}

export interface AddItemToOrder {
    totalQuantity: number;
    total: number;
    createdAt: Date;
    id: string;
    code: string;
    orderPlacedAt?: any;
    state: string;
    lines: Line[];
}

export interface Line {
    quantity: number;
    productVariant: ProductVariant;
}
export interface ProductVariant {
    id: string;
    productId: string;
    name: string;
    price: number;
}


