import { FC, useState } from 'react';
import { CartContext } from '.'
import { AddItemToOrder } from '../interfaces'

const emptyOrder: AddItemToOrder = {
    totalQuantity: 0,
    total: 0,
    id: '0',
    lines: []
};

export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [order, setOrder] = useState(emptyOrder);

    const updateOrder = (newOrder:AddItemToOrder) => {        
         setOrder(newOrder);
    }

    return (
        <CartContext.Provider value={{ order, updateOrder }}>
            {children}
        </CartContext.Provider>
    )
}
