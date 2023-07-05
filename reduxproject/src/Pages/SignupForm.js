import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser, signupFailure } from '../Store';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already User? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
