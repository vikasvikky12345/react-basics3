import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import Inbox from './components/Inbox';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<SignUp/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/welcome' element={<Welcome/>}/>
          <Route path = 'signup' element={<SignUp/>}/>
          <Route path="/inbox" element={<Inbox/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
