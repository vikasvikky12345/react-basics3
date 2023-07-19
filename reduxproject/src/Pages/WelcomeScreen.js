import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SendVerificationEmail from './SendVerificationMail';
import { logoutUser } from '../Store';
import { remove, ref, getDatabase } from 'firebase/database';
import { app } from '../firebase';
import ExpenseForm from './ExpenseForm';
import './WelcomeScreen.css';

const database = getDatabase(app);

const WelcomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const userRef = ref(database, `users/${user.uid}`);

    try {
      await remove(userRef);
      console.log('User has been deleted from the database.');
    } catch (error) {
      console.error('Error deleting user:', error);
    }

    dispatch(logoutUser());
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container">
      <h1 className="header">Welcome to the expense tracker!</h1>
      <SendVerificationEmail />
      <div className="buttons">
        <Link to="/updateuser" className="updateUserButton">Update User</Link>
        <button
          onClick={handleLogout}
          className="logoutButton"
        >
          Logout
        </button>
      </div>
      <div className="expenseForm">
        <ExpenseForm />
      </div>
    </div>
  );
};

export default WelcomeScreen;
