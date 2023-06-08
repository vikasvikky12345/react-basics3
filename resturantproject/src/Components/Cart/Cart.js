import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../Store/CartContext';


const Cart = ({onClose}) => {
  const cartContext1 = useContext(CartContext);

  const totalAmount = `$${cartContext1.totalAmount.toFixed(2)}`;
  const hasItems = cartContext1.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext1.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext1.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartContext1.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
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