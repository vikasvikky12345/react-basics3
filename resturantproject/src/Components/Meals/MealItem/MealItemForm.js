import {useRef,useState} from 'react'
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = ({id,onAddToCart}) => {
    const [amountvalid, setAmountValid] = useState(true);
    const inputAmountRef = useRef()
    const onSubmitHandler = e =>{
        e.preventDefault()
        const enteredAmount = inputAmountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
    
        if (
          enteredAmount.trim().length === 0 ||
          enteredAmountNumber < 1 ||
          enteredAmountNumber > 5
        ) {
          setAmountValid(false);
          return;
        }
    
        onAddToCart(enteredAmountNumber);
      };
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputAmountRef}
        label='Amount'
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountvalid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;