import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Adminlayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="content-area">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
