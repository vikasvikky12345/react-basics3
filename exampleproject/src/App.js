import React, { useEffect, useState } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import { auth } from './firebase';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Contact from './Components/Contact';
import SignUp from './Components/SignUp';



function App() {
  const [presentUser, setPresentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setPresentUser({
          uid: user.uid,
          email: user.email
        });
      } else {
        setPresentUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/Contact' exact element={<center>
          {presentUser ? <Home/> : <Contact />}
        </center>}/>
          <Route path='/About' exact element={ presentUser ? <About/> : <Contact/>}/>
          <Route path='/SignUp' exact element={<SignUp/>}/>
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
