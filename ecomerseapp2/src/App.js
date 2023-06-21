
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Title from './Components/Title';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import { CartProvider } from './Store1/CartContext';
import About from './Components/About';
import Home from './Components/Home';
import ContactUs from './Components/ContactUs';

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const products = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      title: 'Blue Color',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    }
  ];

  return (
    <BrowserRouter>
      <div>
        <CartProvider>
          <Header toggleCart={toggleCart} />
          <Title />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<ProductList products={products} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
          {showCart && <Cart toggleCart={toggleCart} />}
        </CartProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
