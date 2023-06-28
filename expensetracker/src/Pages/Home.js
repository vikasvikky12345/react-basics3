import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate';

const Home = () => {
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Check if the user's profile is complete (replace this with your logic)
    const checkProfileCompletion = () => {
      // Assume that the user's profile is complete if the 'displayName' property exists
      const isComplete = !!localStorage.getItem('displayName');
      setProfileComplete(isComplete);
    };

    checkProfileCompletion();
  }, []);

  const handleVerifyEmail = () => {
    // Send verification email logic here
    // Once the email is successfully verified, set isEmailVerified to true
    setEmailVerified(true);
    // Show alert message
    alert('Email verified!');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="welcome-heading">Welcome to Expense Tracker</h1>
        {isProfileComplete && !isEmailVerified && (
          <button className="logout-button">
            <Link to="/login">Logout</Link>
          </button>
        )}
      </div>

      {!isEmailVerified && (
        <div className="home-content">
          {!isProfileComplete && (
            <>
              <h2>Your profile is incomplete</h2>
              <p>Please complete your profile to continue.</p>
              <Link to="/profileupdate">
                <button>Complete Profile</button>
              </Link>
            </>
          )}
          {!isProfileComplete && <ProfileUpdate setProfileComplete={setProfileComplete} />}
          {isProfileComplete && (
            <div>
              <button className="verify-email-button" onClick={handleVerifyEmail}>
                Verify Email
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
