import React, { useContext } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import styles from './Cart.module.css';
import { CartContext } from '../Store/CartContext';

const Cart = ({ toggleCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleClose = () => {
    toggleCart();
  };

  return (
    <div className={styles['cart-overlay']}>
      <div className={styles.cart}>
        <div className={styles['cart-header']}>
          <h2>Cart</h2>
          <button className={styles['cart-close']} onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className={styles['cart-items']}>
            {cartItems.map((item, index) => (
              <li key={index} className={styles['cart-item']}>
                <img src={item.imageUrl} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className={styles['remove-btn']}
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
