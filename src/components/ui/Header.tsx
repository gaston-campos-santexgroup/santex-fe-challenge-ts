import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { CartContext } from '../../context';
import { GETACTIVEORDER } from '../../graphql';

export const Header: React.FC = () => {
    const { loading, error, data } = useQuery(GETACTIVEORDER);
    const { order, updateOrder } = useContext(CartContext);

    if (loading) return <p>Loading ORDER...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (data) {
        updateOrder?.(data.activeOrder);
    }

    return (
        <header className='header'>
            <Link to="/">
                <img className='logo' src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png" alt="logo" />
            </Link>
            <Link to="/cart">
                <div className='totals'>
                    <div className='amount'>precio total: ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className='quantity'>cantidad: {order.totalQuantity} unidades</div>
                </div>
            </Link>
        </header>
    )
}
