import { Route, Routes } from 'react-router-dom';
import { ProductDetail, Header, Cart, ProductsList } from './components';
import { CartProvider } from './context';
import './App.scss'

function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<main style={{ padding: "1rem" }}><p>Error 404 - not found!</p></main>} />
      </Routes>
    </CartProvider>
  );
}

export default App
