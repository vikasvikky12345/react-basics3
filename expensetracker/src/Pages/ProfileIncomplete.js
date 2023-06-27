import React from 'react';
import { Link } from 'react-router-dom';

const ProfileIncomplete = ({ setProfileComplete }) => {
  return (
    <div>
      <h2>Your profile is incomplete</h2>
      <p>Please complete your profile to continue.</p>
      <Link to="/profile/update">
        <button>Complete Profile</button>
      </Link>
    </div>
  );
};

export default ProfileIncomplete;
