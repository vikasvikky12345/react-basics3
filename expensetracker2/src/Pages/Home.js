import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue, push, remove, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import styles from './Home.module.css';
import ExpenseForm from './ExpenseForm';

const Home = () => {
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const checkProfileCompletion = () => {
      const isComplete = !!localStorage.getItem('displayName');
      setProfileComplete(isComplete);
    };

    const checkEmailVerification = () => {
      const isVerified = !!localStorage.getItem('emailVerified');
      setEmailVerified(isVerified);
    };

    checkProfileCompletion();
    checkEmailVerification();
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const expensesRef = ref(database, 'expenses');

    onValue(expensesRef, (snapshot) => {
      const expensesData = snapshot.val();
      if (expensesData) {
        const expensesList = Object.keys(expensesData).map((key) => ({
          id: key,
          ...expensesData[key],
        }));
        setExpenses(expensesList);
      }
    });

    const currentUser = {
      displayName: localStorage.getItem('displayName'),
      email: localStorage.getItem('email'),
    };
    setUser(currentUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editExpenseId) {
      // Update existing expense
      const updatedExpense = {
        amount,
        description,
        category,
      };

      const database = getDatabase();
      const expenseRef = ref(database, `expenses/${editExpenseId}`);
      update(expenseRef, updatedExpense)
        .then(() => {
          console.log('Expense updated successfully!');
          setExpenses((prevExpenses) =>
            prevExpenses.map((expense) => (expense.id === editExpenseId ? { ...expense, ...updatedExpense } : expense))
          );
          setEditExpenseId(null);
        })
        .catch((error) => {
          console.log('Error updating expense:', error);
        });
    } else {
      // Add new expense
      const newExpense = {
        id: uuidv4(),
        amount,
        description,
        category,
      };

      const database = getDatabase();
      const expensesRef = ref(database, 'expenses');
      push(expensesRef, newExpense)
        .then(() => {
          console.log('Expense stored successfully!');
          setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        })
        .catch((error) => {
          console.log('Error storing expense:', error);
        });
    }

    setAmount('');
    setDescription('');
    setCategory('');
  };

  const handleEditExpense = (expenseId) => {
    const expenseToEdit = expenses.find((expense) => expense.id === expenseId);
    if (expenseToEdit) {
      setEditExpenseId(expenseToEdit.id);
      setAmount(expenseToEdit.amount);
      setDescription(expenseToEdit.description);
      setCategory(expenseToEdit.category);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    const database = getDatabase();
    const expenseRef = ref(database, `expenses/${expenseId}`);
    remove(expenseRef)
      .then(() => {
        console.log('Expense deleted successfully!');
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
      })
      .catch((error) => {
        console.log('Error deleting expense:', error);
      });
  };

  const handleVerifyEmail = () => {
    setEmailVerified(true);
    alert('Email verified!');
  };

  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.homeHeader}>
          <h1 className={styles.welcomeHeading}>Welcome to Expense Tracker</h1>
          {isProfileComplete && !isEmailVerified && (
            <button className={styles.logoutButton}>
              <Link to="/login">Logout</Link>
            </button>
          )}
        </div>
        {!isEmailVerified && (
          <div className={styles.homeContent}>
            {!isProfileComplete ? (
              <>
                <h2>Your profile is incomplete</h2>
                <p>Please complete your profile to continue.</p>
                <Link to="/update-profile">
                  <button className={styles.completeProfileButton}>Complete Profile</button>
                </Link>
              </>
            ) : (
              <>
                <h2>Your email is not verified</h2>
                <p>Please verify your email to continue.</p>
                <button className={styles.verifyEmailButton} onClick={handleVerifyEmail}>
                  Verify Email
                </button>
              </>
            )}
          </div>
        )}
        {isProfileComplete && isEmailVerified && (
          <div className={styles.homeContent}>
            <ExpenseForm
              onAddExpense={handleSubmit}
              editExpenseId={editExpenseId}
              initialAmount={amount}
              initialDescription={description}
              initialCategory={category}
              setEditExpenseId={setEditExpenseId}

            />

            <h2 className={styles.expensesHeading}>Your Expenses</h2>
            {expenses.length === 0 ? (
              <p className={styles.noExpensesMessage}>No expenses found.</p>
            ) : (
              <ul className={styles.expensesList}>
                {expenses.map((expense) => (
                  <li key={expense.id} className={styles.expenseItem}>
                    <div className={styles.expenseDetails}>
                      <div className={styles.expenseAmount}>Amount: {expense.amount}</div>
                      <div className={styles.expenseDescription}>Description: {expense.description}</div>
                      <div className={styles.expenseCategory}>Category: {expense.category}</div>
                    </div>
                    <div className={styles.expenseActions}>
                      <button className={styles.deleteButton} onClick={() => handleDeleteExpense(expense.id)}>
                        Delete
                      </button>
                      <button className={styles.editButton} onClick={() => handleEditExpense(expense.id)}>
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
