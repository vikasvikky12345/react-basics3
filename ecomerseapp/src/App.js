import React, { useState } from 'react';
import Header from './Components/Header';
import Title from './Components/Title';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Cart from './Components/Cart';

const App = () => {
  const [elements, setElements] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const productsArr = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,
    },
    {
    title: 'Blue Color',   
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    quantity:3,
        
    }
  ];

  const addToCart = (product) => {
    setElements([...elements, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart =elements.filter((item) => item !== product);
    setElements(updatedCart);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <div>
      <Header cartItems={elements.length} toggleCart={toggleCart} />
      <Title />
      <ProductList products={productsArr} addToCart={addToCart} />
      {cartOpen && (
        <Cart cartItems={elements} removeFromCart={removeFromCart} toggleCart={toggleCart} />
      )}
      <Footer />
    </div>
  );
};

export default App;
