import { createContext } from 'react';
import { AddItemToOrder } from '../interfaces';
import { emptyOrder } from '.';


interface IAddItemToOrder {
    order: AddItemToOrder;
    updateOrder?: (orderData: AddItemToOrder) => void;
}

export const CartContext = createContext<IAddItemToOrder>({ order: emptyOrder });