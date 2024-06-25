import './css/App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home.js';
//import Admin from './components/admin/dashboard';
import AdminRouter from './components/admin/router'
import ProductDetails from './components/productDetails';
import Cart from './components/cart';
import Home2 from './components/Products2.js';
import Login from './components/login.js';
import Register from './components/signUp.js';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home2" element={<Home2/>}/>
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/login" element= {<Login />}></Route>
        <Route path='/register' exact={true} element={<Register/>}></Route>
        <Route path="admin/*" element={<AdminRouter />}>
          
        </Route>
      </Routes>
    </Router>
    );
}

export default App;
