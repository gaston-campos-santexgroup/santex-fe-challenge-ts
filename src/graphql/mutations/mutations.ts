import { gql } from '@apollo/client';

// Define mutation
export const ADD_ITEM_TO_ORDER = gql`
mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
  addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
    ... on Order{
      totalQuantity
      total
      createdAt
      id
      code
      orderPlacedAt
      state
      lines
      {
        quantity
        productVariant{
          id            
          productId
          name
          price
        }
      }        
    }
  }
}
`;
