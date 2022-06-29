import { useState } from 'react';
import { Header } from './components/Header'
import './App.scss'
import { Item } from './interfaces/product.interface';
import { Product } from './components/Product';
import productList from './data/products.json'

function App() {
  const [totalPrice, addTotalPrice] = useState(0);
  const [totalQuantity, addTotalQuantity] = useState(0);

  const buyItem = (item: Item) => {
    addTotalQuantity(totalQuantity + item.assets.length);
    addTotalPrice(totalPrice + item.variantList.items[0].price)
  }



  return (
    <>
      <Header totalPrice={totalPrice} totalQuantity={totalQuantity}></Header>
      {productList.data.products.items.map((item: Item) => (
        <Product item={item} buyItem={buyItem} />
      ))}
    </>
  );
}

export default App
