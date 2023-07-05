import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserProfile } from '../Store';
import { useNavigate} from 'react-router-dom';

const UpdateUserForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      age,
      number,
    };
    dispatch(updateUserProfile({ userId: user.uid, formData }))
      .then(() => {
        navigate('/welcome');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleLogout=()=>{
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div>
      <h2>Update User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Number:</label>
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleLogout}>Login</button>
    </div>
  );
};

export default UpdateUserForm;
