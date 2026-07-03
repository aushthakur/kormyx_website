import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center pt-24 pb-12">
        <h1 className="text-5xl font-light tracking-tight mb-4">{title}</h1>
        <p className="text-gray-500 max-w-lg text-center">
          This is a placeholder page for {title}. Content will be built out here soon.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
