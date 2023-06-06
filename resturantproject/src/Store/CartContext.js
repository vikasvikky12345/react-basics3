import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalItems: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {}
});

export default CartContext;
