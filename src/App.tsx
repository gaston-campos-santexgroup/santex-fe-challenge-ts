import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Product, ProductDetail, Header, Cart } from './components';
import { PRODUCTS } from './graphql';
import { AddItemToOrder, Item } from './interfaces';
import './App.scss'


function App() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const [order, addItemToCart] = useState<AddItemToOrder>({
    totalQuantity: 0,
    total: 0,
    id: '0',
    lines: []
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  const addNewItem = (updatedOrder: AddItemToOrder) => {
    addItemToCart(updatedOrder);
  }

  return (
    <>
      <BrowserRouter>
        <Header totalPrice={order.total} totalQuantity={order.totalQuantity}></Header>
        <Routes>
          <Route path="/" element={
            data.products.items.map((item: Item) => (
              <Product key={item.id} item={item} addItemToCart={addNewItem} />
            ))
          } />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart cart={order.lines} />} />
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>Error 404 - Pagina no encontrada!</p></main>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
