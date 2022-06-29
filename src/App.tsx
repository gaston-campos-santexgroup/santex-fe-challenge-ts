import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import './App.scss'
import { Item } from './interfaces/product.interface';
import { Product } from './components/Product';
import productList from './data/products.json'
import { Cart } from './components/Cart';


function App() {
  const [totalPrice, addTotalPrice] = useState(0);
  const [totalQuantity, addTotalQuantity] = useState(0);

  const buyItem = (item: Item) => {
    addTotalQuantity(totalQuantity + item.assets.length);
    addTotalPrice(totalPrice + item.variantList.items[0].price)
  }

  return (
    <>
      <BrowserRouter>
        <Header totalPrice={totalPrice} totalQuantity={totalQuantity}></Header>


        <Routes>
          <Route path="/" element={
            productList.data.products.items.map((item: Item) => (
              <Product item={item} buyItem={buyItem} />
            ))
          } />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
