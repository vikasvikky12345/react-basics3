import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setEmail, setPassword, clearError, setError } from './Store';

const Login = () => {
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileComplete = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user && !user.displayName) {
          navigate('/update-profile');
        }
      } catch (error) {
        console.log('Error checking profile completion:', error);
      }
    };

    checkProfileComplete();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError('Please fill in all fields.'));
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      navigate('/home');
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <p>
          <Link to="/forgot-password" onClick={handleClearError}>
            Forgot password?
          </Link>
        </p>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
