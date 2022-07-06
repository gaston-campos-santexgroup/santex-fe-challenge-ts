// Here we put queries. Remove next line

import { gql } from '@apollo/client/core';

export const PRODUCTS = gql`
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

export const PRODUCTBYID = gql`
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