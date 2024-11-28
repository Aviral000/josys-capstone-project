import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage.page';
import SignupPage from './pages/Signup.page';
import LoginPage from './pages/Login.page';
import MenClothing from './pages/MenClothing.page';
import WomenClothing from './pages/WomenClothing.page';
import KidsClothing from './pages/KidsClothing.page';
import ProductPage from './pages/Product.page';
import CartPage from './pages/Cart.page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user-register" element={<SignupPage />} />
        <Route path='/user-login' element={<LoginPage />} />
        <Route path='/shop/men-clothing' element={<MenClothing />} />
        <Route path='/shop/women-clothing' element={<WomenClothing />} />
        <Route path='/shop/kids-clothing' element={<KidsClothing />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App