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
import { CustomerProvider } from './contextAPI/customers/contextProvider';
import CProtectedRoute from './route/CProtected.route';
import CheckoutPage from './pages/Checkout.page';
import ThankPage from './pages/Thank.page';
import ProductDisplayPage from './pages/ProductDisplay.page';

const App: React.FC = () => {
  return (
    <Router>
      <CustomerProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user-register" element={<SignupPage />} />
          <Route path='/user-login' element={<LoginPage />} />
          <Route element={<CProtectedRoute />}>
            <Route path='/shop/men-clothing' element={<MenClothing />} />
            <Route path='/shop/women-clothing' element={<WomenClothing />} />
            <Route path='/shop/kids-clothing' element={<KidsClothing />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/thank-you' element={<ThankPage />} />
            <Route path='/shop/all-products' element={<ProductDisplayPage />} />
          </Route>
        </Routes>
      </CustomerProvider>
    </Router>
  );
};

export default App