import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Header } from './components/Header'
import { Product } from './components/Product';
import { Cart } from './components/Cart';
import { CartProduct, Item } from './interfaces/product.interface';
import './App.scss'
import { PRODUCTS } from './graphql/queries';

function App() {
  const { loading, error, data } = useQuery(PRODUCTS);
  const [totalPrice, addTotalPrice] = useState(0);
  const [totalQuantity, addTotalQuantity] = useState(0);
  const [cart, addItemToCart] = useState<CartProduct[]>([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;

  const buyItem = (item: Item) => {
    addTotalQuantity(totalQuantity + item.assets.length);
    addTotalPrice(totalPrice + item.variantList.items[0].price)
    addItemToCart(prevStateCart => {
      const newStateCart: CartProduct[] = JSON.parse(JSON.stringify(prevStateCart));
      const cartItem: CartProduct = newStateCart.find(x => x.id === item.id) ?? Object.assign({ quantity: 0 }, item);
      const cartItemIndex: number = newStateCart.findIndex(x => x.id === item.id);

      cartItem.quantity = cartItem.quantity + 1;
      if (cartItemIndex === -1) {
        return [...newStateCart, cartItem];
      }
      else {
        newStateCart[cartItemIndex] = cartItem;
        return newStateCart
      }
    });
  }

  return (
    <>
      <BrowserRouter>
        <Header totalPrice={totalPrice} totalQuantity={totalQuantity}></Header>
        <Routes>
          <Route path="/" element={
            data.products.items.map((item: Item) => (
              <Product key={item.id} item={item} buyItem={buyItem} />
            ))
          } />
          <Route path="cart" element={<Cart cart={cart} />} />
          <Route path="*" element={<main style={{ padding: "1rem" }}><p>Error 404 - Pagina no encontrada!</p></main>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
