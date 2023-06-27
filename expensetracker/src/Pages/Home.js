import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate';
import { getAuth, signOut, sendEmailVerification } from 'firebase/auth';
import './Home.css';

const Home = () => {
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfileCompletion = () => {
      const isComplete = !!localStorage.getItem('displayName');
      setProfileComplete(isComplete);
    };

    checkProfileCompletion();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      setEmailVerified(true);
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };

  const handleSendVerification = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    sendEmailVerification(user)
      .then(() => {
        alert('Verification email sent. Please check your email.');
      })
      .catch((error) => {
        console.log('Send verification error:', error);
      });
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="welcome-heading">Welcome to Expense Tracker</h1>
        {isProfileComplete && isEmailVerified && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <div className="home-content">
        {!isProfileComplete ? (
          <>
            <h2>Your profile is incomplete</h2>
            <p>Please complete your profile to continue.</p>
            <Link to="/profileupdate">
              <button>Complete Profile</button>
            </Link>
          </>
        ) : (
          <>
            {!isEmailVerified && (
              <>
                <p>Your email is not verified.</p>
                <button onClick={handleSendVerification}>Send Verification Email</button>
              </>
            )}
          </>
        )}
      </div>
      {!isProfileComplete && <ProfileUpdate setProfileComplete={setProfileComplete} />}
    </div>
  );
};

export default Home;
