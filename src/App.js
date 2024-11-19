import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/Notfound';
import AdminLayout from './pages/Adminlayout';
import ProductDetail from './pages/Productdetails';
import Sidebar from './pages/Sidebar';
import ShoppingCart from './pages/Cartpage';
import Orders from './pages/Orders';
import Offers from './pages/Offers';
import CustomerSupport from './pages/Customersupport';
import { CartProvider } from './pages/Cartcontent'; // Import the CartProvider
import './App.css';
import AdminPage from './pages/Adminpage';
import Aboutus from './pages/Aboutus';
import FAQ from './pages/FAQ';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Function to handle the search input
  const handleSearch = (query) => setSearchQuery(query);

  // Only show sidebar on non-admin routes
  const showSidebar = !location.pathname.startsWith('/admin');

  return (
    <CartProvider> {/* Wrap your app with CartProvider */}
      <div className="app-container">
        {/* Header with search functionality */}
        <Header onSearch={handleSearch} />

        <div className="main-container">
          {/* Show Sidebar unless the route starts with '/admin' */}
          {showSidebar && <Sidebar />}

          {/* Content area for routing */}
          <div className="content-area">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/category/:categoryName" element={<Home searchQuery={searchQuery} />} /> {/* Category route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/support" element={<CustomerSupport />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/FAQ" element={<FAQ />} />
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminLayout />} />

            {/* Catch-all route for unmatched URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
