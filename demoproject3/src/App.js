import React, { useState } from 'react';
import ProductForm from './Components/ProductForm';
import { CartProvider } from './Store/CartContext';
import Header from './Components/Header';
import Cart from './Components/Cart';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartProvider>
      <div>
        <Header toggleCart={toggleCart} />
        <ProductForm />
        {isCartOpen && <Cart onClose={closeCart} />}
      </div>
    </CartProvider>
  );
};

export default App;
