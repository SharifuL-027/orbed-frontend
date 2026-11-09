import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async'; 

// Public Layout import
import PublicLayout from '../PublicLayout'; 

import Home from '../Home/Home';
import AboutUs from '../About/AboutUs';
import Login from '../Admin/Login';
import Services from '../Service/Services';
import Products from '../Product/Products';
import Careers from '../Career/Careers';
import ContactUs from '../Contact/ContactUs';
import DetailsPage from '../Product/DetailsPage';

// Admin Components & Layouts
import AdminLayout from '../Admin/AdminLayout';
import PrivateRoute from '../Admin/PrivateRoute';
import Dashboard from '../Admin/Dashboard';
import ManageCategories from '../Admin/ManageCategories';
import ManageProducts from '../Admin/ManageProducts';
import ManageApplications from '../Admin/ManageApplication';
import ManageMessages from '../Admin/ManageMessages';

// Import PageHead Component
import PageHead from '../../components/PageHead'; 

const AppRoutes = () => {
  return (
    <HelmetProvider>
      {/* Base Helmet Configuration for Orbed Energy */}
      <Helmet>
        <title>Orbed Green Energy | Powering a Sustainable Future</title>
        <meta name="description" content="Orbed Green Energy Limited provides cutting-edge solar panels, inverters, and comprehensive renewable energy solutions in Bangladesh." />
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" />
      </Helmet>

      <Routes>
        
        {/* 🟢 PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route 
            path="/" 
            element={
              <>
                <PageHead title="Home" description="Welcome to Orbed Green Energy. Leading provider of sustainable solar solutions, EPC services, and high-efficiency renewable energy products in Bangladesh." />
                <Home />
              </>
            } 
          />
          <Route 
            path="/about" 
            element={
              <>
                <PageHead title="About Us" description="Learn about Orbed Green Energy's mission, vision, and our commitment to building a greener, more sustainable future for Bangladesh." />
                <AboutUs />
              </>
            } 
          />
          <Route 
            path="/services" 
            element={
              <>
                <PageHead title="Our Services" description="Explore our comprehensive solar services including Residential Solar, Commercial EPC, Industrial Systems, and maintenance (O&M) solutions." />
                <Services />
              </>
            } 
          />
          <Route 
            path="/products" 
            element={
              <>
                <PageHead title="Solar Products" description="Browse our premium inventory of Tier-1 solar panels, smart inverters, batteries, and reliable solar accessories." />
                <Products />
              </>
            } 
          />
          <Route 
            path="/products/:id" 
            element={
              <>
                {/* Dynamic product titles will usually be set inside the component itself after fetching data, 
                    but we keep a base one here */}
                <PageHead title="Product Details" description="View details, specifications, and request a quote for our high-quality solar products." />
                <DetailsPage />
              </>
            } 
          />
          <Route 
            path="/careers" 
            element={
              <>
                <PageHead title="Careers" description="Join the Orbed Green Energy team. Explore job opportunities and build your career in the renewable energy sector." />
                <Careers />
              </>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <>
                <PageHead title="Contact Us" description="Get in touch with Orbed Green Energy. Request a quote, ask a question, or visit our office at Mirpur DOHS, Dhaka." />
                <ContactUs />
              </>
            } 
          />
        </Route>

        {/* 🟠 LOGIN ROUTE */}
        <Route 
          path="/login" 
          element={
            <>
              <PageHead title="Admin Login" />
              <Login />
            </>
          } 
        />

        {/* 🔴 ADMIN ROUTES */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          
          <Route path="dashboard" element={<><PageHead title="Dashboard | Admin" /><Dashboard /></>} />
          <Route path="categories" element={<><PageHead title="Manage Categories" /><ManageCategories /></>} />
          <Route path="products" element={<><PageHead title="Manage Products" /><ManageProducts /></>} />
          <Route path="applications" element={<><PageHead title="Job Applications" /><ManageApplications /></>} />
          <Route path="messages" element={<><PageHead title="Messages & Inquiries" /><ManageMessages /></>} />
        </Route>
        
      </Routes>
    </HelmetProvider>
  );
};

export default AppRoutes;