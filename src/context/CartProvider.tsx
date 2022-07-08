import { FC, useState } from 'react';
import { CartContext, emptyOrder } from '.'
import { AddItemToOrder } from '../interfaces'

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
