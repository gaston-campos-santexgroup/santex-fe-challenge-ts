import { createContext } from 'react';
import { AddItemToOrder } from '../interfaces';

const emptyOrder: AddItemToOrder = {
    totalQuantity: 0,
    total: 0,
    id: '0',
    lines: []
};

interface IAddItemToOrder {
    order: AddItemToOrder;
    updateOrder?: (orderData: AddItemToOrder) => void;
}

export const CartContext = createContext<IAddItemToOrder>({ order: emptyOrder });