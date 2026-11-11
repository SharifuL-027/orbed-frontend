import React from 'react';
import Hero from './Hero';
import WorkFlow from './WorkFlow';
import ServicesParallax from './ServicesParallax';
import AboutPremium from './AboutPremium';
import ClientLogos from './ClientLogos';
import FAQ from './FAQ';
// import FeaturedProducts from './FeaturedProducts';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      <WorkFlow/>
      <ServicesParallax/>
      <AboutPremium/>
      {/* <FeaturedProducts/> */}
      <ClientLogos/>
      <FAQ/>
    </div>
  );
};

export default Home;