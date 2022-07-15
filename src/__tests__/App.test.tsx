import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import App from '../App'
import { ADD_ITEM_TO_ORDER, GET_ACTIVE_ORDER, GET_PRODUCTS } from '../graphql';
import { mockedAddedItemId1ToOrder, mockedProductList } from '../mock-data';

const ItemIdToTest = 1;
const item = mockedProductList.data.products.items.find(x => x.id === ItemIdToTest.toString());
const { id } = item!.variantList.items[0];

const mocks = [
    {
        request: {
            query: GET_PRODUCTS
        },
        result: mockedProductList
    },
    {
        request: {
            query: GET_ACTIVE_ORDER
        },
        result: {
            "data": {
                "activeOrder": null
            }
        }
    },
    {
        request: {
            query: ADD_ITEM_TO_ORDER,
            variables: { productVariantId: id, quantity: 1 }
        },
        result: mockedAddedItemId1ToOrder
    }
];

it('Should show 404 error when landing on bad page', () => {
    const badRoute = '/some/bad/route'

    // use <MemoryRouter> when you want to manually control the history
    render(
        <MemoryRouter initialEntries={[badRoute]}>
            <MockedProvider mocks={mocks} addTypename={true}>
                <App />
            </MockedProvider>
        </MemoryRouter>,
    )

    // verify navigation to "no match" route
    expect(screen.getByText(/Error 404 - not found!/i)).toBeInTheDocument()
})

test('Should render updated cart data after adding item to Cart', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={true}>
            <App />
        </MockedProvider>,
        { wrapper: BrowserRouter }
    )

    // verify display of loading text on loading
    expect(screen.getByText(/Loading ORDER.../i)).toBeInTheDocument()

    // Check header showing 0 items in Cart
    const quantityBeforeMutation = await screen.findByTestId("total-quantity");
    expect(quantityBeforeMutation.innerHTML).toBe('0');

    // get product list after loading
    const list = await screen.findByRole('list');
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem");

    // Find the button element inside first product...
    const { getByText } = within(items[0])
    const button = getByText("Add Item");

    userEvent.click(button); // Simulate a click and fire the mutation
    const clickedButton = await screen.findByText("Submitting...");
    expect(clickedButton).toBeInTheDocument();
    // Wait for Header to render that Cart has 1 Product now
    await screen.findByText("1");

    // Check that total Items of Cart are now 1
    const quantityAfterMutation = (await screen.findByTestId("total-quantity"));
    expect(quantityAfterMutation.innerHTML).toContain('1');

    // Click on Cart link
    userEvent.click(quantityAfterMutation);

    // get all items product list in Cart
    const cartItems = await screen.findAllByRole("listitem");
    // check that Cart list shows only one type of product
    expect(cartItems.length).toBe(1);
})
