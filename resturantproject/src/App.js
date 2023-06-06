import React,{useState} from 'react';
import Meals from './Components/Meals/Meals';
import Header from './Components/Layout/Header';
import Cart from './Components/Cart/Cart';
import CartProvider from './Store/CartProvider';



function App() {
  const[cartVisible,setCartVisibile] = useState(false)
  const showCartHandler=()=>{
    setCartVisibile(true)
  }
  const hideCartHandler = ()=>{
    setCartVisibile(false)
  }
  return (
    <CartProvider>
      {cartVisible && <Cart onHide={hideCartHandler}/>}
      <Header onShowcart = {showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;