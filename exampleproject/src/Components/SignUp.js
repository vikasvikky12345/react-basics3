import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = data;

  function changeHandle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Email:</label>
        <input type="email" name="email" value={email} onChange={changeHandle}></input>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={changeHandle}></input>
        <button onClick={handleSignUp}>SignUp</button>
        <p>
          New to page! <span onClick={() => navigate('/Contact')}>Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
