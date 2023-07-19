import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userEmail) {
          const formattedEmail = encodeURIComponent(userEmail);
          const url = `https://crudcrud.com/api/58efc9ea0c3742ceaf4661184433282e/cart?user=${formattedEmail}`;

          const response = await axios.get(url);
          const cartItems = response.data;
          setCartItems(cartItems);
        } else {
          const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
          if (storedCartItems) {
            setCartItems(storedCartItems);
          } else {
            setCartItems([]);
          }
        }
      } catch (error) {
        console.log('Error retrieving cart items:', error.message);
      }
    };

    fetchCartItems();
  }, [userEmail]);

  const addToCart = async (product) => {
    try {
      if (userEmail) {
        const formattedEmail = encodeURIComponent(userEmail);
        const url = `https://crudcrud.com/api/58efc9ea0c3742ceaf4661184433282e/cart?user=${formattedEmail}`;

        const response = await axios.post(url, product);
        const updatedCartItems = response.data;
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.log('Error adding item to cart:', error.message);
    }
  };

  const removeFromCart = async (product) => {
    try {
      if (userEmail) {
        const formattedEmail = encodeURIComponent(userEmail);
        const url = `https://crudcrud.com/api/58efc9ea0c3742ceaf4661184433282e/cart?user=${formattedEmail}`;

        const response = await axios.delete(url, { data: product });
        const updatedCartItems = response.data;
        setCartItems(updatedCartItems);
      } else {
        const updatedCartItems = cartItems.filter((item) => item.title !== product.title);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.log('Error removing item from cart:', error.message);
    }
  };

  const clearCart = async () => {
    try {
      if (userEmail) {
        const formattedEmail = encodeURIComponent(userEmail);
        const url = `https://crudcrud.com/api/58efc9ea0c3742ceaf4661184433282e/cart?user=${formattedEmail}`;

        await axios.delete(url);
        setCartItems([]);
      } else {
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }
    } catch (error) {
      console.log('Error clearing cart:', error.message);
    }
  };

  const setLoggedInUser = (email) => {
    setUserEmail(email);
  };

  const logout = () => {
    setUserEmail('');
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, setLoggedInUser, logout }}
    >
      {children}
    </CartContext.Provider>
  );
};
