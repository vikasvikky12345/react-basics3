import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginFailure } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(loginFailure('Please fill in all fields.'));
    } else {
      dispatch(loginUser({ email, password }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleLogin}>
        {error && <p className={styles.error}>{error}</p>}
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
        <p className={styles.forgotPassword}>
          <Link to="/forgot-password" onClick={handlePasswordChange}>
            Forgot password?
          </Link>
        </p>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.signupText}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
