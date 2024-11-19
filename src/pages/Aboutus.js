import React from 'react';
import './Aboutus.css'; // Add your CSS styles here

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      <h1 className="aboutus-heading">About Us</h1>
      <div className="aboutus-content">
        <p>Welcome to <strong>Jaswanth</strong>, where shopping meets convenience, quality, and customer satisfaction!</p>
        <p>At <strong>Jaswanth</strong>, we’re passionate about providing a seamless online shopping experience...</p>

        <h2 className="subheading">Our Story</h2>
        <p>Founded in <strong>2024</strong>, we started with a simple goal – to make shopping easier...</p>

        <h2 className="subheading">Why Choose Us?</h2>
        <ul className="why-choose-us">
          <li><strong>Quality Products:</strong> We only offer products that meet our strict quality standards.</li>
          <li><strong>Customer Satisfaction:</strong> We strive to ensure your complete satisfaction.</li>
        </ul>

        <h2 className="subheading">Join the Jaswanth Family</h2>
        <p>Explore our wide range of products and enjoy exclusive offers!</p>
      </div>
    </div>
  );
};

export default Aboutus;
