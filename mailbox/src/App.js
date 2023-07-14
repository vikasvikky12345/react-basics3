import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<SignUp/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/welcome' element={<Welcome/>}/>
          <Route path = 'signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
