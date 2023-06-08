import React, { useState } from 'react'
import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './Store/CartProvider';
function App() {
  const [cartshown,setCartshown] = useState(false);
  const showCartHandler = ()=>{
    setCartshown(true)
  }
  const hideCartHandler = () =>{
    setCartshown(false)
  }
  return (
    <CartProvider>
    {cartshown && <Cart onClose = {hideCartHandler}/>}
      <Header onShowCart = {showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  )
}
export default App;