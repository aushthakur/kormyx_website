import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutSnippet = () => {
  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">Who We Are</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight">
            Engineering digital empires, <span className="font-medium">not just websites.</span>
          </h2>
          
          <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
            Kormyx bridges the gap between stunning aesthetic design and ruthless backend performance. We are an elite collective of engineers, designers, and growth hackers dedicated to building scalable solutions and dominating market verticals.
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mb-10">
            <div>
              <div className="text-4xl font-medium text-white mb-2">98%</div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Client Retention</div>
            </div>
            <div>
              <div className="text-4xl font-medium text-white mb-2">150+</div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Projects Shipped</div>
            </div>
          </div>

          <Link 
            to="/company/about" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-none text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Learn More About Us <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 border border-white/10 bg-[#0A0A0A] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Kormyx team collaborating" 
              loading="lazy"
              className="w-full h-full object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSnippet;
