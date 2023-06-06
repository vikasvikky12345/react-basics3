import React, { useState } from 'react';
import CartContext from './CartContext';

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addCartItemHandler = (item) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find((cartItem) => cartItem.id === item.id);

      if (existingCartItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        );
      }

      return [...prevCartItems, { ...item, amount: 1 }];
    });

    setTotalAmount((prevTotalAmount) => prevTotalAmount + item.price);
  };

  const removeCartItemHandler = (id) => {
    // Implement the logic to remove an item from the cart
  };

  const cartContext = {
    items: cartItems,
    totalItems: cartItems.reduce((acc, item) => acc + item.amount, 0),
    addCartItem: addCartItemHandler,
    removeCartItem: removeCartItemHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
