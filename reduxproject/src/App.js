import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/LoginForm';
import UpdateUserForm from './Pages/UpdateUserForm';
import SignupForm from './Pages/SignupForm';
import WelcomeScreen from './Pages/WelcomeScreen';
import { loginUser} from './Store';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email && storedUser.uid) {
      const { email, uid } = storedUser;
      dispatch(loginUser({ email,uid, password: '' }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/updateuser" element={<UpdateUserForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
