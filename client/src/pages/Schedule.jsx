import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScheduleModal from '../components/ScheduleModal';
import { Calendar } from 'lucide-react';

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Let's Talk Strategy
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto mb-10">
            Schedule a discovery call with our team to discuss how Kormyx can elevate your digital presence.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            <Calendar size={20} />
            Book Your Meeting
          </button>
        </div>
        
        {/* Creative Integration Container */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#f8f9fa] rounded-3xl p-4 shadow-2xl border border-gray-100 overflow-hidden relative min-h-[400px] flex items-center justify-center">
            
            {/* Logo background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none flex justify-center items-center">
               <h2 className="text-gray-300 text-8xl md:text-[150px] font-black tracking-tighter opacity-30 select-none">KORMYX</h2>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-light mb-4">Ready to accelerate your growth?</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                Our experts are ready to dive deep into your business requirements and provide tailored solutions.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Select a Time
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Schedule;
