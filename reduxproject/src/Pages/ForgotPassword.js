import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      setResetSent(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {resetSent ? (
        <p>An email with password reset instructions has been sent to your email address.</p>
      ) : (
        <>
          <p>Please enter your email address to reset your password.</p>
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>
          {error && <p>{error}</p>}
        </>
      )}
    <p>
        Changed Password? <Link to="/login">Login</Link>
    </p>
    </div>
  );
};

export default ForgotPassword;
