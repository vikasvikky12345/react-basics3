import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileUpdate from './ProfileUpdate';

const Home = () => {
  const [isProfileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    // Check if the user's profile is complete (replace this with your logic)
    const checkProfileCompletion = () => {
      // Assume that the user's profile is complete if the 'displayName' property exists
      const isComplete = !!localStorage.getItem('displayName');
      setProfileComplete(isComplete);
    };

    checkProfileCompletion();
  }, []);

  return (
    <div>
      {isProfileComplete ? (
        <h1>Welcome to Expense Tracker</h1>
      ) : (
        <>
          <h2>Your profile is incomplete</h2>
          <p>Please complete your profile to continue.</p>
          <Link to="/profileupdate">
            <button>Complete Profile</button>
          </Link>
        </>
      )}
      {!isProfileComplete && <ProfileUpdate setProfileComplete={setProfileComplete} />}
    </div>
  );
};

export default Home;
