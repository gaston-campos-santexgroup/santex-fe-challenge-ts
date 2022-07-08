import { AddItemToOrder } from '../interfaces';
import { CartContext } from './CartContext';
import { CartProvider } from './CartProvider';

export const emptyOrder: AddItemToOrder = {
    totalQuantity: 0,
    total: 0,
    id: '0',
    lines: []
};

export { CartContext, CartProvider }