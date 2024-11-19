import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';
import { categoriesData } from '../Rawdata';

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueCategories = [...new Set(categoriesData.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation if not logged in
      navigate('/login'); // Navigate to the login page
    }
  };

  return (
    <div className={`sidebar ${isVisible ? 'show' : ''}`}>
      <div className="sidebar-links">
        <h1 className='sidebar-heading'>Categories</h1>
        <NavLink 
          to="/" 
          className="sidebar-link"
        >
          Home
        </NavLink>

        {categories.length > 0 && (
          <div className="sidebar-link" onClick={handleCategoryClick}>
            Categories <i className={`fas ${isCategoryOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
        )}

        {isCategoryOpen && categories.length > 0 && (
          <div className="sidebar-dropdown-menu">
            {categories.map((category) => (
              <NavLink 
                key={category} 
                to={`/category/${category.toLowerCase()}`} 
                className="sidebar-link"
                onClick={(e) => handleLinkClick(e, `/category/${category.toLowerCase()}`)}
              >
                {category}
              </NavLink>
            ))}
          </div>
        )}

        <NavLink 
          to="/cart" 
          className="sidebar-link"
          onClick={(e) => handleLinkClick(e, '/cart')}
        >
          Shopping Cart
        </NavLink>
        <NavLink 
          to="/aboutus" 
          className="sidebar-link"
          onClick={(e) => handleLinkClick(e, '/aboutus')}
        >
          About Us
        </NavLink>
        <NavLink 
          to="/FAQ" 
          className="sidebar-link"
          onClick={(e) => handleLinkClick(e, '/FAQ')}
        >
          FAQ
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
