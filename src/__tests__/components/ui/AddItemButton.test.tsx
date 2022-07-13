import { MemoryRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddItemButton, Header } from '../../../components';
import { CartProvider } from '../../../context';
import { ADD_ITEM_TO_ORDER, GET_ACTIVE_ORDER } from '../../../graphql';
import { mockedAddedItemId1ToOrder, mockedProductList } from '../../../mock-data';

it("Should render updated cart data after adding item id #1", async () => {
  const ItemIdToTest = 1;
  const item = mockedProductList.data.products.items.find(x => x.id === ItemIdToTest.toString());
  const { id } = item!.variantList.items[0];
  const getActiveOrderMock = [
    {
      request: {
        query: GET_ACTIVE_ORDER
      },
      result: {
        "data": {
          "activeOrder": null
        }
      }
    }
  ];
  const addItemId1Mock = [
    {
      request: {
        query: ADD_ITEM_TO_ORDER,
        variables: { productVariantId: Number(id), quantity: 1 }
      },
      result: mockedAddedItemId1ToOrder
    }
  ];

  render(
    <CartProvider>
      <Router>
        <MockedProvider mocks={getActiveOrderMock} addTypename={false}>
          <Header></Header>
        </MockedProvider>
        <MockedProvider mocks={addItemId1Mock} addTypename={false}>
          <AddItemButton key={item!.id} itemVariantId={Number(id)} quantity={1} />
        </MockedProvider>
      </Router>
    </CartProvider>
  );

  // Find the button element...
  const button = await screen.findByText("Add Item");
  const quantityBeforeMutation = await screen.findByTestId("total-quantity");
  expect(quantityBeforeMutation.innerHTML).toBe('0');

  userEvent.click(button); // Simulate a click and fire the mutation
  const clickedButton = await screen.findByText("Submitting...");
  expect(clickedButton).toBeInTheDocument();
  await screen.findByText("Add Item");

  const quantityAfterMutation = (await screen.findByTestId("total-quantity")).innerHTML;
  expect(quantityAfterMutation).toContain('1');
});