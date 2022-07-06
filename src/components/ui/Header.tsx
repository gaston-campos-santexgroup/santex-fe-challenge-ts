import React from 'react';
import { Link } from "react-router-dom";
import { Totals } from '../../interfaces';

export const Header: React.FC<Totals> = ({ totalPrice, totalQuantity }) => {
    return (
        <header className='header'>
            <Link to="/">
                <img className='logo' src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png" alt="logo" />
            </Link>
            <Link to="/cart">
                <div className='totals'>
                    <div className='amount'>precio total: ${totalPrice.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className='quantity'>cantidad: {totalQuantity} unidades</div>
                </div>
            </Link>
        </header>
    )
}
