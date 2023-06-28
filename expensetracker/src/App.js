import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignupForm from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ProfileUpdate from './Pages/ProfileUpdate';
import ForgotPassword from './Pages/ForgotPassword';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={< Home/>} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
