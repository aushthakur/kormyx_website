import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, Download, Menu, X } from 'lucide-react';
import ScheduleModal from './ScheduleModal';
import logoWhite from '../assets/logowhite.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isTransparentInitial = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-500 ${
    scrolled || activeMenu || isMobileMenuOpen || !isTransparentInitial
      ? 'bg-black/90 border-b border-white/10 py-4'
      : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClasses} onMouseLeave={handleMouseLeave}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-20">
        <Link to="/" onClick={handleMouseLeave} className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logoWhite} alt="Kormyx" className="h-8 md:h-10 w-auto" />
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 h-full">
          <div 
            className="relative h-full py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('products')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              PRODUCTS {activeMenu === 'products' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>

          <div 
            className="relative h-full py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('solutions')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              SOLUTIONS {activeMenu === 'solutions' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>

          <div 
            className="relative h-full py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('resources')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              RESOURCES {activeMenu === 'resources' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <a href="#" download className="hidden md:flex items-center gap-2 text-sm font-semibold text-white hover:text-white/70 uppercase tracking-widest">
            <Download size={16} /> Portfolio
          </a>
          <div className="hidden sm:block bg-white text-black px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            <button onClick={() => setIsModalOpen(true)}>
              Schedule a Meeting
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white hover:text-gray-300 transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mega Menus Container - Positioned absolutely below the nav */}
      <div 
        className={`absolute top-full left-0 w-full bg-black/95 border-b border-white/10 shadow-2xl transition-all duration-300 origin-top overflow-hidden z-10 ${
          activeMenu ? 'opacity-100 max-h-[800px]' : 'opacity-0 max-h-0 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter(activeMenu)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-screen-2xl mx-auto p-12">
          
          {/* SOLUTIONS MENU */}
          {activeMenu === 'solutions' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-3 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Solutions For</h4>
                <ul className="space-y-4">
                  <li><Link to="/solutions/creative-services" className="text-white text-lg font-medium">Creative Services</Link></li>
                  <li><Link to="/solutions/professional-services" className="text-white/60 hover:text-white text-lg transition-colors">Professional Services</Link></li>
                  <li><Link to="/solutions/education-and-training" className="text-white/60 hover:text-white text-lg transition-colors">Education & Training</Link></li>
                  <li><Link to="/solutions/beauty" className="text-white/60 hover:text-white text-lg transition-colors">Beauty</Link></li>
                  <li><Link to="/solutions/sports-and-fitness" className="text-white/60 hover:text-white text-lg transition-colors">Sports & Fitness</Link></li>
                </ul>
              </div>

              <div className="col-span-5 pr-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Explore</h4>
                  <Link to="/solutions/creative-services" className="flex items-center text-xl text-white font-medium mb-4 hover:opacity-80">
                    Creative Services <ArrowRight size={20} className="ml-2" />
                  </Link>
                  <p className="text-white/60 text-lg leading-relaxed max-w-md">
                    Turn your passion projects into paid projects. Discover tools to manage clients and grow your creative business.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-12">
                  {['Photographers', 'Interior Designers', 'Graphic Designers', 'Architects'].map(pill => (
                    <span key={pill} className="bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-sm hover:bg-white/10 cursor-pointer transition-colors">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-4 flex items-center justify-center">
                <div className="w-full h-80 bg-white/5 rounded-lg overflow-hidden relative group cursor-pointer border border-white/10">
                   <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2094&auto=format&fit=crop" alt="Creative Services" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS MENU */}
          {activeMenu === 'products' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-4 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Create & Grow</h4>
                <ul className="space-y-4">
                  <li><Link to="/products/website-templates" className="text-white/60 hover:text-white text-lg transition-colors">Website Templates</Link></li>
                  <li><Link to="/products/ai-website-builder" className="text-white/60 hover:text-white text-lg transition-colors">AI Website Builder</Link></li>
                  <li><Link to="/products/online-stores" className="text-white/60 hover:text-white text-lg transition-colors">Online Stores</Link></li>
                  <li><Link to="/products/scheduling" className="text-white/60 hover:text-white text-lg transition-colors">Scheduling</Link></li>
                </ul>
              </div>
              <div className="col-span-4 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Marketing Tools</h4>
                <ul className="space-y-4">
                  <li><Link to="/products/email-campaigns" className="text-white/60 hover:text-white text-lg transition-colors">Email Campaigns</Link></li>
                  <li><Link to="/products/social-tools" className="text-white/60 hover:text-white text-lg transition-colors">Social Tools</Link></li>
                  <li><Link to="/products/seo-features" className="text-white/60 hover:text-white text-lg transition-colors">SEO Features</Link></li>
                </ul>
              </div>
              <div className="col-span-4 flex items-center justify-center">
                 <div className="w-full h-64 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-lg border border-white/10 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-light text-white mb-4">Start your trial</h3>
                    <p className="text-white/60 mb-6">No credit card required.</p>
                    <Link to="/products" className="text-white uppercase tracking-widest text-sm font-bold flex items-center hover:text-gray-300">
                      Explore Products <ArrowRight size={16} className="ml-2" />
                    </Link>
                 </div>
              </div>
            </div>
          )}

          {/* RESOURCES MENU */}
          {activeMenu === 'resources' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-4 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Learn</h4>
                <ul className="space-y-4">
                  <li><Link to="/resources/help-center" className="text-white/60 hover:text-white text-lg transition-colors">Help Center</Link></li>
                  <li><Link to="/resources/forum" className="text-white/60 hover:text-white text-lg transition-colors">Forum</Link></li>
                  <li><Link to="/resources/webinars" className="text-white/60 hover:text-white text-lg transition-colors">Webinars</Link></li>
                </ul>
              </div>
              <div className="col-span-8 flex flex-col justify-center">
                 <h2 className="text-3xl font-light text-white mb-6 max-w-lg">Everything you need to succeed online.</h2>
                 <Link to="/resources" className="inline-flex items-center bg-white text-black px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-max">
                   Visit Help Center
                 </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[72px] bg-black/95 z-40 overflow-y-auto transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 gap-8">
          <div className="flex flex-col gap-6">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Products</h4>
            <Link to="/products/website-templates" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Website Templates</Link>
            <Link to="/products/ai-website-builder" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">AI Website Builder</Link>
            <Link to="/products/online-stores" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Online Stores</Link>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Solutions</h4>
            <Link to="/solutions/creative-services" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Creative Services</Link>
            <Link to="/solutions/professional-services" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Professional Services</Link>
            <Link to="/solutions/education-and-training" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Education & Training</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Resources</h4>
            <Link to="/resources/help-center" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Help Center</Link>
            <Link to="/resources/forum" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium">Forum</Link>
          </div>
          
          <div className="mt-8 bg-white text-black p-4 text-center rounded-sm text-sm font-bold uppercase tracking-widest cursor-pointer">
            <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="w-full">
              Schedule a Meeting
            </button>
          </div>
        </div>
      </div>
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
