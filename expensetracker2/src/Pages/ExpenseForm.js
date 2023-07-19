import React, { useState } from 'react';
import { getDatabase, ref, push, update } from 'firebase/database';
import styles from './ExpenseForm.module.css';
const ExpenseForm = ({ onAddExpense, editExpenseId, initialAmount, initialDescription, initialCategory, setEditExpenseId }) => {
  const [amount, setAmount] = useState(initialAmount || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [category, setCategory] = useState(initialCategory || '');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      amount,
      description,
      category,
    };

    const database = getDatabase();
    if (editExpenseId) {
      // Update existing expense
      const expenseRef = ref(database, `expenses/${editExpenseId}`);
      update(expenseRef, newExpense)
        .then(() => {
          console.log('Expense updated successfully!');
          onAddExpense(editExpenseId, { id: editExpenseId, ...newExpense });
          setAmount('');
          setDescription('');
          setCategory('');
          setEditExpenseId(null);
        })
        .catch((error) => {
          console.log('Error updating expense:', error);
        });
    } else {
      // Add new expense
      const expensesRef = ref(database, 'expenses');
      push(expensesRef, newExpense)
        .then((newExpenseRef) => {
          console.log('Expense stored successfully!');
          onAddExpense(newExpenseRef.key, { id: newExpenseRef.key, ...newExpense });
          setAmount('');
          setDescription('');
          setCategory('');
        })
        .catch((error) => {
          console.log('Error storing expense:', error);
        });
    }
  };

  const handleSubmit = (e) => {
    handleFormSubmit(e);
  };

  return (
    <div>
      <h2 className={styles.formHeading}>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Amount
          </label>
          <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Trip">Trip</option>
            <option value="Shopping">Shopping</option>
            <option value="Movie">Movie</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          {editExpenseId ? (
            <>
              <button type="submit">Update Expense</button>
              <button type="button" onClick={() => setEditExpenseId(null)}>Cancel</button>
            </>
          ) : (
            <button type="submit">Add Expense</button>
          )}
        </div>
      </form>
    </div>
  );
};
export default ExpenseForm;


