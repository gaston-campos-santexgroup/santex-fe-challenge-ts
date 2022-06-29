import { ItemCard } from '../interfaces/product.interface'

export const Product: React.FC<ItemCard> = ({ item, buyItem }) => {

    return (
        <div className='product'>
            <img src={item.assets[0].source} alt={item.name} />
            <div className="name-slug">
                <div className="name">{item.name}</div>
                <div className="slug">{item.slug}</div>
                <div className="price">${item.variantList.items[0].price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
            </div>
            <div className="description">{item.description}</div>
            <button onClick={(e) => {
                e.preventDefault();
                buyItem(item);
            }} >Agregar al Carrito</button>
        </div>
    )
}
