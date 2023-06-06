import React,{useState} from 'react';
import Meals from './Components/Meals/Meals';
import Header from './Components/Layout/Header';
import Cart from './Components/Cart/Cart';



function App() {
  const[cartVisible,setCartVisibile] = useState(false)
  const showCartHandler=()=>{
    setCartVisibile(true)
  }
  const hideCartHandler = ()=>{
    setCartVisibile(false)
  }
  return (
    <>
      {cartVisible && <Cart onHide={hideCartHandler}/>}
      <Header onShowcart = {showCartHandler} />
      <main>
        <Meals/>
      </main>
    </>
  );
}

export default App;