import React from 'react';
import { Totals } from '../interfaces/totals.interface';

export const Header: React.FC<Totals> = ({ totalPrice, totalQuantity }) => {
    return (
        <header className='header'>
            <img className='logo' src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png" alt="logo" />
            <div className='totals'>
                <div className='amount'>precio total: ${totalPrice}</div>
                <div className='quantity'>cantidad: {totalQuantity} unidades</div>
            </div>
        </header>
    )
}
