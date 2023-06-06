import React, { useContext, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import CartContext from '../../../Store/CartContext';

const MealItemForm = ({ id }) => {
  const cartContext = useContext(CartContext);
  const [amount, setAmount] = useState(1);

  const amountChangeHandler = (event) => {
    setAmount(+event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const item = {
      id: id,
      amount: amount,
    };

    cartContext.addCartItem(item);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label='Amount'
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          value: amount,
          onChange: amountChangeHandler,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
