import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage.page';
import SignupPage from './pages/Signup.page';
import LoginPage from './pages/Login.page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user-register" element={<SignupPage />} />
        <Route path='/user-login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App