import React, { useContext } from 'react';
import AuthContext from './Store/AuthContext';
import Login from './Components/Login/Login';
import MainHeader from './Components/MainHeader/MainHeader';
import Home from './Components/Home/Home';


function App() {
  const ctx = useContext(AuthContext);
  <MainHeader/>
  return (
    <React.Fragment>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </React.Fragment>
  );
}

export default App;