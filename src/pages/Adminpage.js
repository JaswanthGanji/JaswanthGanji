import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Adminpage.css';  // Ensure this file is imported

const AdminPage = () => {
  const navigate = useNavigate();

  // Get user data from localStorage (assumes the user is logged in)
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  // Check if the user is logged in (check for 'token' in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login page
      toast.warning("You need to log in first!");
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  // Handle logout by clearing data from localStorage and redirecting to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');  // Redirect user to the login page
    toast.success("Logout successful!");
  };

  return (
    <div className="admin-page-container">
      <h2>User Details</h2>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default AdminPage;
