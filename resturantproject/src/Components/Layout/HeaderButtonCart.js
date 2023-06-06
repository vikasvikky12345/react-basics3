import React, { useContext } from 'react';
import styles from './HeaderButtoncart.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/CartContext';

const HeaderButtonCart = ({ onClick }) => {
  const cartContext = useContext(CartContext);

  const numofItems = cartContext.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numofItems}</span>
    </button>
  );
};

export default HeaderButtonCart;
