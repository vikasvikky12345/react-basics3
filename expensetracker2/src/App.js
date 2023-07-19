import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from './Pages/SignUp';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ProfileUpdate from './Pages/ProfileUpdate';
import Home from './Pages/Home';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
