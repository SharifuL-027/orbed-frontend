import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import AboutUs from '../About/AboutUs';
import Login from '../Admin/Login';

// Admin Components & Layouts
import AdminLayout from '../Admin/AdminLayout';
import PrivateRoute from '../Admin/PrivateRoute';
import Services from '../Service/Services';
import Products from '../Product/Products';
import Careers from '../Career/Careers';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services/>} />
      <Route path="/products" element={<Products />} />
      <Route path="/careers" element={<Careers />} />

      {/* Protected Admin Routes (Private Route + Admin Layout) */}
      <Route 
        path="/admin" 
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* /admin diye hit korle automatically dashboard-e chole jabe */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        <Route path="categories" element={<div>Categories Management Page</div>} />
        <Route path="products" element={<div>Products Management Page</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;