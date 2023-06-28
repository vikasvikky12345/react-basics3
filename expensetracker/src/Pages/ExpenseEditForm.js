import React, { useState } from 'react';
import styles from './ExpenseEditForm.module.css';

const ExpenseEditForm = ({ expense, onSave, onNavigate }) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(expense.id, updatedExpense); // Update the expense in the UI and real database
    onNavigate(); // Invoke the callback function to navigate back
  };

  return (
    <div className={styles.formContainer}>
      <h2>Edit Expense</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Amount:</label>
          <input
            className={styles.input}
            type="text"
            name="amount"
            value={updatedExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Description:</label>
          <input
            className={styles.input}
            type="text"
            name="description"
            value={updatedExpense.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Category:</label>
          <input
            className={styles.input}
            type="text"
            name="category"
            value={updatedExpense.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
        </div>
        <button className={styles.saveButton} type="submit">Save</button>
      </form>
    </div>
  );
};

export default ExpenseEditForm;
