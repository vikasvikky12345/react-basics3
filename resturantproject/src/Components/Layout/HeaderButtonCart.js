import React from 'react';
import styles from './HeaderButtoncart.module.css';
import CartIcon from '../Cart/CartIcon';
function HeaderButtonCart() {
  return (
    <>
    <button className={styles.button}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>
            3
        </span>
    </button>
    </>
  )
}

export default HeaderButtonCart;