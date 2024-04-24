import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import ShopCategory from './pages/ShopCategory.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product';
import Footer from './components/Footer/Footer.jsx';
import LoginSignup from "./pages/LoginSignup";
import men_banner from './components/Assests/banner_mens.png'
import women_banner from './components/Assests/banner_women.png'
import kids_banner from './components/Assests/banner_kids.png'
import Cart from './pages/Cart.jsx';
// import NewOrder from './pages/NewOrder.jsx';
import MyOrder from './components/MyOrder/MyOrder.jsx';
import React, { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    setIsAuthenticated(!!token);
  }, []);
  
  return (
    <div  >
      <div>
      <BrowserRouter>
      
     
      <Routes>
      <Route path="/" element={isAuthenticated ? <Shop/> : <Navigate to="/login" replace />} />
    
        <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
        </Route>
            <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated}/>} />
        
       
       
        <Route path='/cart' element={<Cart />}/>
        {/* <Route path='/NewOrder' element={<NewOrder/>}/> */}
        <Route path='/MyOrder' element={<MyOrder/>}/>
      </Routes>
     
      </BrowserRouter>
      </div>
      
     
    </div>
    

  );
}

export default App;
