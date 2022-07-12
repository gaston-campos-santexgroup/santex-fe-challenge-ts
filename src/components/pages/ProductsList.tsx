
import { useQuery } from '@apollo/client';
import { Product } from '..';
import { GET_PRODUCTS } from '../../graphql';
import { Item } from '../../interfaces';

export const ProductsList = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    return (
        <div className="productsList" role="list">
            {
                data.products.items.map((item: Item) => (
                    <Product key={item.id} item={item} />
                ))
            }
        </div>
    )
}
