import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description && category) {
      const newExpense = {
        amount,
        description,
        category
      };
      onAddExpense(newExpense);
      setAmount('');
      setDescription('');
      setCategory('');
    }
  };

  return (
    <div>
      <h2 className={styles.formHeading}>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>Amount</label>
          <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Dinner">Dinner</option>
            <option value="Trip">Trip</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <button className={styles.addExpenseButton} type="submit">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
