import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { CartContext } from '../../context';
import { GET_ACTIVE_ORDER } from '../../graphql';

export const Header: React.FC = () => {
    const { loading, error, data } = useQuery(GET_ACTIVE_ORDER);
    const { order, updateOrder } = useContext(CartContext);

    useEffect(() => {
        if (data?.activeOrder) {
            updateOrder?.(data.activeOrder);
        }
    }, [data, updateOrder])

    if (loading) return <p>Loading ORDER...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;


    return (
        <header className='header'>
            <Link to="/">
                <img className='logo' src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png" alt="logo" />
            </Link>
            <Link to="/cart">
                <div className='totals'>
                    <div className='amount'>precio total: ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className='quantity'>cantidad: <span data-testid="total-quantity">{order.totalQuantity}</span> unidades</div>
                </div>
            </Link>
        </header>
    )
}
