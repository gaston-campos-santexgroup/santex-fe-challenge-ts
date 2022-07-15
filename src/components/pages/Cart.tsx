import { useContext } from 'react';
import { CartContext } from '../../context';

export const Cart: React.FC = () => {

    const { order } = useContext(CartContext);

    return (
        <div role="list">
            <div className="title">Cart</div>
            <div className="product-cart">
                <div className="name">Product Name</div>
                <div className="price">Price</div>
                <div className="quantity">Quantity</div>
            </div>
            {order.lines.map((product) => (
                <div className="product-cart" role="listitem" key={`prod-${product.productVariant.id}`}>
                    <div className="name">{product.productVariant.name}</div>
                    <div className="price">${product.productVariant.price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className="quantity">{product.quantity}</div>
                </div>
            ))}
        </div>
    )
}
