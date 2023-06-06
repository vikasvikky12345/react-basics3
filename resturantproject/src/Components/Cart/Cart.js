import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../Store/CartContext';

const Cart = ({ onHide }) => {
  const cartContext = useContext(CartContext);

  const cartItems = cartContext.items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ));

  const totalAmount = cartContext.items.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  ).toFixed(2);

  return (
    <Modal onHide={onHide}>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onHide}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
