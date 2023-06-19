import React from 'react';
import Header from './Components/Header';
import Title from './Components/Title';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import { CartProvider } from './Store/CartContext';

const App = () => {
  const [showCart, setShowCart] = React.useState(false);

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
    <CartProvider>
      <div>
        <Header toggleCart={toggleCart} />
        <Title />
        <ProductList products={products} />
        {showCart && <Cart toggleCart={toggleCart} />}
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
