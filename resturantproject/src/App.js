import { Fragment } from 'react';
import Meals from './Components/Meals/Meals';
import Header from './Components/Layout/Header';



function App() {
  return (
    <>
      <Header/>
      <main>
        <Meals/>
      </main>
    </>
  );
}

export default App;