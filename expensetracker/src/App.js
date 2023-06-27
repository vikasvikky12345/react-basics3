import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignupForm from './Pages/SignUp';
import Login from './Pages/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<SignupForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
