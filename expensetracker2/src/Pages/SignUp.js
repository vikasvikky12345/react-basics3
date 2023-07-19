import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {Link} from 'react-router-dom'

import app from '../firebase';
import './SignUp.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User has successfully signed up.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p>
    Already User? <Link to="/login">Login</Link>
  </p>
  </>
  );
};

export default SignupForm;
