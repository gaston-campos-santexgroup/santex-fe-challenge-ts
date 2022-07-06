import { CartProduct } from '../../interfaces'
interface FuncProps {
    cart: CartProduct[];
}
export const Cart: React.FC<FuncProps> = ({ cart }) => {
    return (
        <>
            <div>Cart</div>    
            <div className="product-cart">
                    <div className="name">Nombre Producto</div>
                    <div className="price">Precio</div>
                    <div className="quantity">Cantidad</div>
                </div>        
            {cart.map((product) => (
                <div className="product-cart">
                    <div className="name">{product.name}</div>
                    <div className="price">${product.variantList.items[0].price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                    <div className="quantity">{product.quantity}</div>
                </div>
            ))}

        </>
    )
}
