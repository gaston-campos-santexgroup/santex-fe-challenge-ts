import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PRODUCTS } from '../../../graphql';
import { mockedProductList } from '../../../mock-data';
import { ProductsList } from '../../../components';

const mocks = [
    {
      request: {
        query: GET_PRODUCTS
      },
      result: mockedProductList
    }
  ];
  
  
  it('should render list of 10 products', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <ProductsList />
      </MockedProvider>
    );
     const list = await screen.findByRole('list');  
  });