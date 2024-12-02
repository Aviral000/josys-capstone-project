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
import VProtectedRoute from './route/VProtected.route';
import Signup from './components/signupVendor/Signup.module';
import AProtectedRoute from './route/AProtected.route';
import LoginAdminPage from './pages/LoginAdmin.page';
import { AdminProvider } from './contextAPI/admins/ContextProviderAdmin';
import DashboardAdminPage from './pages/AdminDashboard';
import { VendorProvider } from './contextAPI/vendors/ContextProviderVendor';
import Login from './components/loginVendor/Login.module';
import DashboardVendorPage from './pages/VendorDashboard.page';
import CustomerProfilePage from './pages/CustomerDashboard.page';

const App: React.FC = () => {
  return (
    <Router>
      <CustomerProvider>
        <VendorProvider>
          <AdminProvider>
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
                <Route path='/profile' element={<CustomerProfilePage />} />
              </Route>
              <Route path='/vendor-register' element={<Signup />} />
              <Route path='/vendor-login' element={<Login />} />
              <Route element={<VProtectedRoute />}>
                <Route path='/vendor-panel' element={<DashboardVendorPage />} />
              </Route>
              <Route path='/company/admin-panel' element={<LoginAdminPage />} />
              <Route element={<AProtectedRoute />} >
                <Route path='/company/admin/:id' element={<DashboardAdminPage />} />
              </Route>
            </Routes>
          </AdminProvider>
        </VendorProvider>
      </CustomerProvider>
    </Router>
  );
};

export default App