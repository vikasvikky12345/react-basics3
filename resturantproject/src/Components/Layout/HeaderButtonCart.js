import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';

import styles from './HeaderButtoncart.module.css';
import CartContext from '../../Store/CartContext';

const HeaderCartButton = ({onClick}) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartContext2 = useContext(CartContext);

  const { items } = cartContext2;

  const numofCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numofCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;