import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import UserProfile from './Components/Profile/UserProfile';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import AuthContext from './Store/authContex';


const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && (
          <Route
            path="/auth"
            element={authCtx.isLoggedIn ? <Navigate to="/profile" /> : <AuthPage />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile" element={<UserProfile />} />
        )}
      </Routes>
    </Layout>
  );
};

export default App;
