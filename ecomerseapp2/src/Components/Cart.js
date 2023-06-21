import React, { useContext } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import './Cart.css';
import { CartContext } from '../Store1/CartContext';

const Cart = ({ toggleCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleClose = () => {
    toggleCart();
  };

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
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
