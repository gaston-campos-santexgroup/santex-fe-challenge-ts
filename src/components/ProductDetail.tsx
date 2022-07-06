import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PRODUCTBYID } from '../graphql/queries';
import { Item } from '../interfaces/product.interface';

export const ProductDetail = () => {
    let params = useParams();
    const { loading, error, data } = useQuery(PRODUCTBYID, { variables: { id: params.productId } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;

    const productData: Item = data.product;
    return (
        <div className="product-detail">
            <div className="groped-data-1">
                <div className="name">{productData.name} ID: {productData.id}</div>
                <div className="slug">{productData.slug}</div>
                <div className="price">${productData.variantList.items[0].price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
            </div>
            <div className="groped-data-2">
                <img src={productData.assets[0].source} alt={productData.name} />
                <div className="description">{productData.description}</div>
            </div>
        </div>
    )
}
