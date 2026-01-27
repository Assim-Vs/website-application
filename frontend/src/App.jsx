import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import VasthramalikaPage from './pages/VasthramalikaPage';
import CategoryPage from './pages/CategoryPage';
import AllProductsPage from './pages/AllProductsPage';
import LadiesSpecialPage from './pages/LadiesSpecialPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';



function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/vasthramalika" element={<VasthramalikaPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/all-products" element={<AllProductsPage />} />
          <Route path="/ladies-special" element={<LadiesSpecialPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirmPage />} />

          {/* Add more routes here later */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
