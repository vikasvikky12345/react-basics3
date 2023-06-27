import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = ({ setProfileComplete }) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!displayName) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        // Handle the case when the user is not authenticated
        setError('User is not authenticated.');
        return;
      }

      await updateProfile(user, { displayName });

      // Redirect to the home page
      navigate('/home');
      setProfileComplete(true); // Set profile completion status to true
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
