import React, { useContext } from 'react';
import { CartContext } from '../Store/CartContext';
import './Cart.css';

const Cart = ({ onClose }) => {
  const { cartItems } = useContext(CartContext);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price);
    });
    return total.toFixed(2);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <span>{item.item}</span> - {item.description} - {item.price} - Size: {item.size}
                </li>
              ))}
            </ul>
            <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
          </>
        )}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
