import { Link, Outlet } from 'react-router-dom';
import { Item } from '../../interfaces';
import { AddItemButton } from './AddItemButton';

interface IFuncProd {
    item: Item;
}

export const Product: React.FC<IFuncProd> = ({ item }) => {
    const { price, id } = item.variantList.items[0];
    const { source } = item.assets[0];
    return (
        <>
            <div className='product' role="listitem">
                <img src={source} alt={item.name} />
                <div className="name-slug">
                    <Link
                        style={{ display: "block", margin: "0" }}
                        to={`/product/${item.id}`}
                        key={item.id}
                    >
                        <h3 className="name">{item.name}</h3>
                    </Link>

                    <div className="slug">{item.slug}</div>
                    <div className="price">${price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
                </div>
                <div className="description">{item.description}</div>
                <AddItemButton key={item.id} itemVariantId={id} quantity={1}></AddItemButton>
            </div>
            <Outlet />
        </>
    )
}
