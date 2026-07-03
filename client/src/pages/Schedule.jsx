import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { InlineWidget } from 'react-calendly';

const Schedule = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Let's Talk Strategy
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Schedule a discovery call with our team to discuss how Kormyx can elevate your digital presence.
          </p>
        </div>
        
        {/* Creative Calendly Integration */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f8f9fa] rounded-3xl p-4 shadow-2xl border border-gray-100 overflow-hidden relative">
            
            {/* Logo background decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none flex justify-center pt-6">
               <h2 className="text-gray-300 text-6xl font-black tracking-tighter opacity-50 select-none">KORMYX</h2>
            </div>
            
            <div className="relative z-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ minHeight: '700px' }}>
              <InlineWidget 
                url="https://calendly.com/acmesales" 
                styles={{ height: '700px', width: '100%' }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: '000000',
                  textColor: '333333'
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
