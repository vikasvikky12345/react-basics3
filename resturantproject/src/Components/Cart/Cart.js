import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../Store/CartContext';

const Cart = ({ onClose }) => {
  const { totalAmount, items, removeItem, addItem } = useContext(CartContext);

  const totalAmountFormatted = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmountFormatted}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
