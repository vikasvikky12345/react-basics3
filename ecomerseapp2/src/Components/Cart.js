import React, { useContext } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import './Cart.css';
import { CartContext } from '../Store1/CartContext';

const Cart = ({ toggleCart }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleClose = () => {
    toggleCart();
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2>Cart</h2>
          <button className="cart-close" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.imageUrl} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item)}>
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </>
        )}
        <div className="cart-footer">
          <p>Total Items: {cartCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
