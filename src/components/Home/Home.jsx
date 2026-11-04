import React from 'react';
import Hero from './Hero';
import WorkFlow from './WorkFlow';
import ServicesParallax from './ServicesParallax';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      <WorkFlow/>
      <ServicesParallax/>
    </div>
  );
};

export default Home;