import React from 'react';
import Hero from './Hero';
import WorkFlow from './WorkFlow';
import ServicesParallax from './ServicesParallax';
import AboutPremium from './AboutPremium';
import ClientLogos from './ClientLogos';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      <WorkFlow/>
      <ServicesParallax/>
      <AboutPremium/>
      <ClientLogos/>
    </div>
  );
};

export default Home;