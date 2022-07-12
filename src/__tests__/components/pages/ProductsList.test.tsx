import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
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
        <Router>
            <MockedProvider mocks={mocks} addTypename={true}>
                <ProductsList />
            </MockedProvider>
        </Router>
    );
    const list = await screen.findByRole('list');
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem");
    expect(items.length).toBe(10);
});