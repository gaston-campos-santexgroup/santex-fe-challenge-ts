// Here we put queries. Remove next line

import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query {
    products(options: { take: 10 }) {
      
      items {
          id
        name
        slug
        description  
        variants {
          id
          name
            
        }
      
        variantList {
          items {
            price
            id
          }
        }

        featuredAsset {
          source
        }
          assets {
          id
          name
          source          
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById ($id:ID) {
    product(id:$id) {
          id
        name
        slug
        description  
        variants {
          id
          name
            
        }
      
        variantList {
          items {
            price
            id
          }
        }

        featuredAsset {
          source
        }
          assets {
          id
          name
          source          
        }
      }
  }
`;

export const GET_ACTIVE_ORDER = gql`
query GetActiveOrder {
  activeOrder {
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
}`;

