import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PlatformFeatures from '../components/squarespace/PlatformFeatures';
import GrowBusiness from '../components/squarespace/GrowBusiness';
import GettingStarted from '../components/squarespace/GettingStarted';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <PlatformFeatures />
        <GrowBusiness />
        <GettingStarted />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
