import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';
import styles from './Home.module.css';

const Home = () => {
  const history = useHistory();
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

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

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
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

  const handleEditExpense = (expenseId) => {
    history.push(`/expense/${expenseId}`);
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
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
