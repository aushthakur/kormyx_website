import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PlatformFeatures from '../components/squarespace/PlatformFeatures';
import GrowBusiness from '../components/squarespace/GrowBusiness';
import GettingStarted from '../components/squarespace/GettingStarted';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-black">
      <SEO 
        title="Kormyx | Digital Marketing & Development Agency"
        description="Kormyx is a premier digital agency offering top-tier SaaS development, website design, app development, digital marketing, brand positioning, and SEO services."
        canonicalUrl="/"
      />
      <Navbar />
      <main>
        <Hero />
        <PlatformFeatures />
        <GrowBusiness />
        <GettingStarted />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
