import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Product, ProductDetail, Header, Cart } from './components';
import {  CartProvider } from './context';
import {  PRODUCTS } from './graphql';
import { Item } from './interfaces';
import './App.scss'

function App() {
  const { loading, error, data } = useQuery(PRODUCTS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  return (
    <CartProvider>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={
            data.products.items.map((item: Item) => (
              <Product key={item.id} item={item} />
            ))
          } />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>Error 404 - not found!</p></main>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App
