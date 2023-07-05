import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SendVerificationEmail from './SendVerificationMail';
import { logoutUser } from '../Store';
import { remove, ref,getDatabase } from 'firebase/database';
import {app } from '../firebase';
import ExpenseForm from './ExpenseForm';
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
    <div>
      <h1>Welcome to the expense tracker!</h1>
      <SendVerificationEmail />
      <p>
        <Link to="/updateuser">Update User</Link>
      </p>
      <button onClick={handleLogout}>Logout</button>
      <ExpenseForm/>
    </div>
  );
};

export default WelcomeScreen;
