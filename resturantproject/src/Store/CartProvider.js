import { useReducer } from 'react';

import CartContext from './CartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return handleAddItem(state, action.item);
    case 'REMOVE':
      return handleRemoveItem(state, action.id);
    default:
      return state;
  }
};

const handleAddItem = (state, newItem) => {
  const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
  const existingItem = state.items[existingItemIndex];

  let updatedItems;
  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      amount: existingItem.amount + newItem.amount,
    };
    updatedItems = [...state.items];
    updatedItems[existingItemIndex] = updatedItem;
  } else {
    updatedItems = [...state.items, newItem];
  }

  const updatedTotalAmount = state.totalAmount + newItem.price * newItem.amount;

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
  };
};

const handleRemoveItem = (state, itemId) => {
  const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

  if (existingItemIndex === -1) {
    return state;
  }

  const existingItem = state.items[existingItemIndex];
  const updatedTotalAmount = state.totalAmount - existingItem.price;

  let updatedItems;
  if (existingItem.amount === 1) {
    updatedItems = state.items.filter((item) => item.id !== itemId);
  } else {
    const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
    updatedItems = [...state.items];
    updatedItems[existingItemIndex] = updatedItem;
  }

  return {
    items: updatedItems,
    totalAmount: updatedTotalAmount,
  };
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
