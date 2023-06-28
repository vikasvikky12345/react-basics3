import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import styles from './Home.module.css';

const Home = () => {
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkProfileCompletion = () => {
      const isComplete = !!localStorage.getItem('displayName');
      setProfileComplete(isComplete);
    };

    checkProfileCompletion();
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const expensesRef = ref(database, 'expenses');

    const fetchExpenses = () => {
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
    };

    fetchExpenses();

    return () => {
    };
  }, []);

  const handleVerifyEmail = () => {
    setEmailVerified(true);
    alert('Email verified!');
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
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
                <button className="complete-profile-button">Complete Profile</button>
              </Link>
            </>
          ) : (
            <div>
              <button className="verify-email-button" onClick={handleVerifyEmail}>
                Verify Email
              </button>
            </div>
          )}
        </div>
      )}

      {isEmailVerified && (
        <div className={styles.homeContent}>
          <div className={styles.formContainer}>
            <ExpenseForm onAddExpense={handleAddExpense} />
            <button className={styles.logoutButton}>
              <Link to="/login">Logout</Link>
            </button>
          </div>
          <div className={styles.expenseList}>
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
              <p>No expenses added yet.</p>
            ) : (
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id}>
                    <span>{expense.amount}</span>
                    <span>{expense.description}</span>
                    <span>{expense.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
