import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DynamicPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Convert path to a beautiful title (e.g., "/products/website-templates" -> "Website Templates")
  const pathSegments = path.split('/').filter(Boolean);
  const rawTitle = pathSegments[pathSegments.length - 1] || 'Page Not Found';
  const title = rawTitle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const category = pathSegments.length > 1 ? pathSegments[pathSegments.length - 2].toUpperCase() : 'KORMYX';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col selection:bg-white/20 selection:text-white">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 relative overflow-hidden">
        
        {/* Ambient Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-20 pb-32 flex flex-col items-center justify-center text-center relative z-10 min-h-[60vh]">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Sparkles size={14} className="text-gray-400" />
            <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">{category}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12 animate-fade-up font-light" style={{ animationDelay: '0.3s' }}>
            We're currently crafting the ultimate experience for this page. Check back soon for cutting-edge updates.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/" className="bg-white text-black px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2">
              Return Home <ArrowRight size={16} />
            </Link>
            <Link to="/schedule" className="text-white px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest border border-white/20 hover:bg-white/10 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Decorative Glassmorphic Grid at the bottom */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm p-8 flex flex-col justify-end">
              <div className="w-10 h-10 rounded-full bg-white/10 mb-4 animate-pulse"></div>
              <div className="h-2 w-1/3 bg-white/20 rounded-full mb-2"></div>
              <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;
