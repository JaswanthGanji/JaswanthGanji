import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import './Header.css';
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../pages/Sidebar';
import { useCart } from '../pages/Cartcontent'; // Import useCart hook

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart(); // Get cartCount from context

  // State to track sidebar visibility and search queries
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Handle logout by clearing data from localStorage and redirecting to login page
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    localStorage.removeItem('user');   // Remove user data on logout
    localStorage.removeItem('userEmail');  // Optionally clear userEmail, so it forces the cart to be reset when re-login

    toast.success("Logout successful!");
    navigate('/login');  // Redirect to login page
  };

  // Navigate to the AdminPage or login page based on authentication
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      navigate('/adminpage');
    } else {
      toast.warning("You need to log in first!");
      navigate('/login');
    }
  };

  const handleshoopingIconClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      toast.warning("You need to log in first!");
      navigate('/login');
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Toggle the state of the sidebar visibility
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

   // Handle window resize to adjust sidebar for mobile/desktop
   useEffect(() => {
    const checkIfMobile = () => {
      setIsSidebarOpen(window.innerWidth > 768); // Automatically open sidebar for desktop views
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);


  return (
    <>
      {/* Sidebar component */}
      <Sidebar isVisible={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <header className='container-bg'>
        <div className='d-flex flex-row justify-content-between'>
          {/* Sidebar Toggle and Logo */}
          <div>
            <label className='label-icon' onClick={toggleSidebar}>&#9776;</label>
            <Link to="/" onClick={() => console.log('Logo clicked')}>
              <Logo w={100} h={50} />
            </Link>
          </div>

          {/* Search Bar (only on desktop) */}
          <div className={`search-bar-container d-flex flex-row ${isMobileSearchOpen ? 'mobile-search-open' : ''}`}>
            {window.innerWidth > 768 && (
              <>
                <input
                  type="text"
                  placeholder="Search product..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="input-box-border"
                />
                <div className="search-icon" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                  <CiSearch />
                </div>
              </>
            )}
          </div>

          {/* User and Cart Icons Section */}
          <div className='d-flex flex-row justify-content-between'>
            {/* User Icon */}
            <div className="user-icons" onClick={handleUserIconClick}>
              <Link to="/adminpage"><FaRegUserCircle /></Link>
            </div>

            {/* Shopping Cart */}
            <div onClick={handleshoopingIconClick}>
              <Link to="/cart">
                <span className="shopping-icons">
                  <FaShoppingCart />
                </span>
                <div className="shopping-card">
                  <p>{cartCount}</p> {/* Display dynamic cart count from context */}
                </div>
              </Link>
            </div>

            {/* Login/Logout Button */}
            <div>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="login-btn">Logout</button>
              ) : (
                <Link to="/login" className="login-btn">Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
