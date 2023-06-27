import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = ({ setProfileComplete }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const idToken = await user.getIdToken();

        // Make a GET request to fetch the user profile data from the Firebase database
        const response = await fetch(`https://expensetracker-acdfa-default-rtdb.firebaseio.com/users/${user.uid}.json?auth=${idToken}`);
        const data = await response.json();

        if (data && data.displayName) {
          // Pre-fill the input form with the fetched display name
          setDisplayName(data.displayName);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!displayName) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      // Update the display name using Firebase Auth API
      await updateProfile(user, { displayName });

      // Update the user profile data in the Firebase database
      const idToken = await user.getIdToken();
      await fetch(`https://expensetracker-acdfa-default-rtdb.firebaseio.com/users/${user.uid}.json?auth=${idToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ displayName }),
      });

      // Update the profile status
      localStorage.setItem('displayName', displayName);
      

      // Redirect to the home page
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
