import { Link, Outlet } from 'react-router-dom';
import { ItemCard } from '../../interfaces';
import { AddItemButton } from './AddItemButton';

export const Product: React.FC<ItemCard> = ({ item, addItemToCart }) => {

    return (
        <>
            <div className='product'>
                <img src={item.assets[0].source} alt={item.name} />
                <div className="name-slug">
                    <Link
                        style={{ display: "block", margin: "0" }}
                        to={`/product/${item.id}`}
                        key={item.id}
                    >
                        <div className="name">{item.name}</div>
                    </Link>

                    <div className="slug">{item.slug}</div>
                    <div className="price">${item.variantList.items[0].price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                </div>
                <div className="description">{item.description}</div>
                <AddItemButton key={item.id} addItemToCart={addItemToCart} itemVariantId={item.variantList.items[0].id} quantity={1}></AddItemButton>
            </div>
            <Outlet />
        </>

    )
}
