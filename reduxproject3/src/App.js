import { BrowserRouter, Routes,Route } from "react-router-dom";
import Product from "./Components/Product";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";
import NavBar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
