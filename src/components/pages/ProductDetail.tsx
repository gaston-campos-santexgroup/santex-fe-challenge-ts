import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PRODUCTBYID } from '../../graphql';
import { Item } from '../../interfaces';

export const ProductDetail = () => {

    const params = useParams();
    const { loading, error, data } = useQuery(PRODUCTBYID, { variables: { id: params.productId } });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;

    const productData: Item = data.product;
    const { price } = productData.variantList.items[0];
    const { source } = productData.assets[0];

    return (
        <div className="product-detail">
            <div className="groped-data-1">
                <div className="name">{productData.name} ID: {productData.id}</div>
                <div className="slug">{productData.slug}</div>
                <div className="price">${price.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</div>
            </div>
            <div className="groped-data-2">
                <img src={source} alt={productData.name} />
                <div className="description">{productData.description}</div>
            </div>
        </div>
    )
}
