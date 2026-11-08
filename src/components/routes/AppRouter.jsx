import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout import (Apnar folder onujayi path thik kore niben)
import PublicLayout from '../PublicLayout'; 

import Home from '../Home/Home';
import AboutUs from '../About/AboutUs';
import Login from '../Admin/Login';
import Services from '../Service/Services';
import Products from '../Product/Products';
import Careers from '../Career/Careers';
import ContactUs from '../Contact/ContactUs';

// Admin Components & Layouts
import AdminLayout from '../Admin/AdminLayout';
import PrivateRoute from '../Admin/PrivateRoute';
import Dashboard from '../Admin/Dashboard';
import ManageCategories from '../Admin/ManageCategories';
import ManageProducts from '../Admin/ManageProducts';
import ManageApplications from '../Admin/ManageApplication';
import ManageMessages from '../Admin/ManageMessages';

const AppRoutes = () => {
  return (
    <Routes>
      
      {/* 🟢 PUBLIC ROUTES: Ei route gulote Navbar & Footer thakbe */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>

      {/* 🟠 LOGIN ROUTE: Admin login e Navbar thakar dorkar nai */}
      <Route path="/login" element={<Login />} />

      {/* 🔴 ADMIN ROUTES: Ekhane shudhu AdminLayout thakbe, Public Navbar asbe na */}
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
        
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="categories" element={<ManageCategories/>} />
        <Route path="products" element={<ManageProducts/>} />
        <Route path='applications' element={<ManageApplications/>}/>
        <Route path='messages' element={<ManageMessages/>}/>
      </Route>
      
    </Routes>
  );
};

export default AppRoutes;