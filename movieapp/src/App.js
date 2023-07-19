import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieDeatil from './components/MovieDetail/MovieDeatil';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/movie/:imdbID' element={<MovieDeatil/>}/>
          <Route path='/pagenotfound' element={<PageNotFound/>}/>
        </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
