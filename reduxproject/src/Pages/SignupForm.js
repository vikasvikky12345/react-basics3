import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser, signupFailure } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      dispatch(signupFailure('Please fill in all fields.'));
    } else if (password !== confirmPassword) {
      dispatch(signupFailure('Passwords do not match.'));
    } else {
      dispatch(signupUser({ email, password }));
      navigate('/updateuser');
    }
  };

  return (
    <div className={styles.signupForm}>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        /><br/>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        /><br/>
        <button type="submit" className={styles.button}>
          Signup
        </button>
      </form>
      <p className={styles.text}>
        Already a User? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
