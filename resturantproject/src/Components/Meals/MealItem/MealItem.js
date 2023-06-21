import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';
import CartContext from '../../../Store/CartContext';


const MealItem = ({price,name,description,id}) => {
  const cartContext3 = useContext(CartContext);

  const changeprice = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext3.addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
      description:description
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{changeprice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;