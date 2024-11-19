import React from 'react';
import './Footer.css'; // CSS file for footer styling

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Jaswanth. All Rights Reserved.</p>
        <div className="footer-social-media">
          <a href="https://www.facebook.com/JaswanthStore" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/JaswanthStore" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/JaswanthStore" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
