// src/components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; 
import Footer from './Footer/Footer'; 
import ScrollToTop from './ScrollToTop';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <ScrollToTop/>
        <Outlet /> {/* Ekhane Home, About, Services ei page gulo load hobe */}
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;