import { useContext } from 'react';
import { CartContext } from '../../context';

export const Cart: React.FC = () => {

    const { order } = useContext(CartContext);

    return (
        <>
            <div>Cart</div>
            <div className="product-cart">
                <div className="name">Nombre Producto</div>
                <div className="price">Precio</div>
                <div className="quantity">Cantidad</div>
            </div>
            {order.lines.map((product) => (
                <div className="product-cart" key={`prod-${product.productVariant.id}`}>
                    <div className="name">{product.productVariant.name}</div>
                    <div className="price">${product.productVariant.price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className="quantity">{product.quantity}</div>
                </div>
            ))}

        </>
    )
}
