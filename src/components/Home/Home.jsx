import React from 'react';
import Hero from './Hero';
import WorkFlow from './WorkFlow';
import ServicesParallax from './ServicesParallax';
import AboutPremium from './AboutPremium';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      <WorkFlow/>
      <ServicesParallax/>
      <AboutPremium/>
    </div>
  );
};

export default Home;