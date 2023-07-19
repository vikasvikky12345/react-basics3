import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = data;

  function changeHandle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function SignIn(e) {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
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
        <button onClick={SignIn}>SignIn</button>
        <p>
          Already have an Account! <span onClick={() => navigate('/SignUp')}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Contact;
