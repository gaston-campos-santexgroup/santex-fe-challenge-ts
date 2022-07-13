import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CartContext } from '../../context';
import { ADD_ITEM_TO_ORDER } from '../../graphql';
import { AddItemToOrderInputs } from '../../interfaces';

export const AddItemButton: React.FC<AddItemToOrderInputs> = ({ itemVariantId, quantity }) => {

    const [addItem, { data, loading, error }] = useMutation(ADD_ITEM_TO_ORDER, { variables: { productVariantId: itemVariantId, quantity: quantity } });
    const { updateOrder } = useContext(CartContext);

    useEffect(() => {
        if (data && updateOrder) {
            updateOrder(data.addItemToOrder);
        }
    }, [data, updateOrder])

    if (loading) return <button>Submitting...</button>;
    if (error) return <>`Submission error! ${error.message}`</>;

    return (
        <button onClick={e => { e.preventDefault(); addItem(); }}>
            Add Item
        </button>
    );
}