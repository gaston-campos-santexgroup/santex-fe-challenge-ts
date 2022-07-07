import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER } from '../../graphql';
import { AddItemToOrderInputs } from '../../interfaces';

export const AddItemButton: React.FC<AddItemToOrderInputs> = ({ itemVariantId, quantity, addItemToCart }) => {

    const [addItem, { data, loading, error }] = useMutation(ADD_ITEM_TO_ORDER, { variables: { productVariantId: itemVariantId, quantity: quantity } });

    if (loading) return <button>Submitting...</button>;
    if (error) return <>`Submission error! ${error.message}`</>;
    if (data) {
        addItemToCart(data.addItemToOrder);
    }

    return (
        <button onClick={e => { e.preventDefault(); addItem(); }}>
            Add Item
        </button>
    );
}