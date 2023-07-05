import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, remove, set } from 'firebase/database';
import { auth } from '../firebase'; // Update the path to your firebase.js file

const database = getDatabase();

const ExpenseForm = () => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);

  const userId = auth.currentUser?.uid; // Get the current user's UID if it exists

  const fetchExpenses = () => {
    if (userId) {
      const expensesRef = ref(database, `users/${userId}/expenses`);
      onValue(expensesRef, (snapshot) => {
        const expensesData = snapshot.val();
        if (expensesData) {
          const expensesList = Object.entries(expensesData).map(([id, expense]) => ({
            id,
            ...expense,
          }));
          setExpenses(expensesList);
          calculateTotalExpenses(expensesList);
        } else {
          setExpenses([]);
          setTotalExpenses(0);
        }
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [userId]); // Fetch expenses when the user ID changes

  const calculateTotalExpenses = (expensesList) => {
    const total = expensesList.reduce((sum, expense) => sum + Number(expense.price), 0);
    setTotalExpenses(total);
  };

  const addExpense = () => {
    if (userId) {
      const newExpense = { price, description, category };
      const expensesRef = ref(database, `users/${userId}/expenses`);
      push(expensesRef, newExpense, (error) => {
        if (error) {
          console.error('Error adding expense:', error);
        } else {
          setPrice('');
          setDescription('');
          setCategory('');
        }
      });
    }
  };

  const deleteExpense = (expenseId) => {
    if (userId) {
      const expenseRef = ref(database, `users/${userId}/expenses/${expenseId}`);
      remove(expenseRef, (error) => {
        if (error) {
          console.error('Error deleting expense:', error);
        }
      });
    }
  };

  const editExpense = (expense) => {
    setPrice(expense.price);
    setDescription(expense.description);
    setCategory(expense.category);
    setEditMode(true);
    setEditExpenseId(expense.id);
  };

  const updateExpense = () => {
    if (userId && editExpenseId) {
      const expenseRef = ref(database, `users/${userId}/expenses/${editExpenseId}`);
      const updatedExpense = { price, description, category };
      set(expenseRef, updatedExpense, (error) => {
        if (error) {
          console.error('Error updating expense:', error);
        } else {
          setPrice('');
          setDescription('');
          setCategory('');
          setEditMode(false);
          setEditExpenseId('');
        }
      });
    }
  };

  const cancelEdit = () => {
    setPrice('');
    setDescription('');
    setCategory('');
    setEditMode(false);
    setEditExpenseId('');
  };

  const handleActivatePremium = () => {
    // Logic to handle premium activation
    console.log('Activate Premium');
  };

  return (
    <div>
      <h2>Expense Form</h2>
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="food">Food</option>
        <option value="petrol">Petrol</option>
        <option value="shopping">Shopping</option>
        <option value="movie">Movie</option>
        <option value="lunch">Lunch</option>
      </select>

      {editMode ? (
        <div>
          <button onClick={updateExpense}>Update Expense</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={addExpense}>Add Expense</button>
      )}

      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>{expense.price}</span> - <span>{expense.description}</span> -{' '}
            <span>{expense.category}</span>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            <button onClick={() => editExpense(expense)}>Edit</button>
          </li>
        ))}
      </ul>

      {totalExpenses > 10000 && <button onClick={handleActivatePremium}>Activate Premium</button>}
    </div>
  );
};

export default ExpenseForm;
