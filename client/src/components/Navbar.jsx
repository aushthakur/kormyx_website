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

  const transparentRoutes = [
    '/',
    '/services/saas-development',
    '/services/website-development',
    '/services/app-development',
    '/services/brand-positioning',
    '/services/content-creation',
    '/services/digital-marketing',
    '/services/paid-ads-seo'
  ];
  const isTransparentInitial = transparentRoutes.includes(location.pathname);

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
            onMouseEnter={() => handleMouseEnter('it-solutions')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              IT SOLUTIONS {activeMenu === 'it-solutions' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>

          <div 
            className="relative h-full py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('branding')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              BRANDING {activeMenu === 'branding' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>

          <div 
            className="relative h-full py-4 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('marketing')}
          >
            <span className="flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest">
              MARKETING {activeMenu === 'marketing' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </span>
          </div>

          <Link 
            to="/blog" 
            className="relative h-full py-4 flex items-center text-sm font-semibold text-white/90 hover:text-white transition-colors uppercase tracking-widest" 
            onMouseEnter={() => handleMouseEnter(null)}
          >
            BLOG
          </Link>
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
          
          {/* IT SOLUTIONS MENU */}
          {activeMenu === 'it-solutions' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-8 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Development & Engineering</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Link to="/services/saas-development" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">SaaS Development</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Custom cloud software tailored for scale, performance, and recurring revenue generation.</p>
                  </div>
                  <div>
                    <Link to="/services/website-development" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">Website Development</Link>
                    <p className="text-sm text-white/50 leading-relaxed">High-performance, SEO-optimized websites built to convert visitors into loyal customers.</p>
                  </div>
                  <div>
                    <Link to="/services/app-development" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">App Development</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Native and cross-platform mobile experiences designed for engagement and retention.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 flex flex-col justify-center">
                 <h2 className="text-3xl font-light text-white mb-4 leading-tight">Build the future of your business.</h2>
                 <button onClick={() => { setIsModalOpen(true); setActiveMenu(null); }} className="inline-flex items-center bg-white text-black px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-max">
                   Start a Project
                 </button>
              </div>
            </div>
          )}

          {/* BRANDING MENU */}
          {activeMenu === 'branding' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-8 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Identity & Positioning</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Link to="/services/brand-positioning" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">Brand Positioning</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Strategic messaging and market positioning to dominate your industry and build trust.</p>
                  </div>
                  <div>
                    <Link to="/services/content-creation" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">Content Creation</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Engaging multimedia, copywriting, and visual assets that tell your brand's unique story.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 flex flex-col justify-center">
                 <h2 className="text-3xl font-light text-white mb-4 leading-tight">Stand out in a crowded market.</h2>
                 <button onClick={() => { setIsModalOpen(true); setActiveMenu(null); }} className="inline-flex items-center bg-white text-black px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-max">
                   Elevate Your Brand
                 </button>
              </div>
            </div>
          )}

          {/* MARKETING MENU */}
          {activeMenu === 'marketing' && (
            <div className="grid grid-cols-12 gap-12 animate-fade-up" style={{ animationDuration: '0.3s' }}>
              <div className="col-span-8 border-r border-white/10 pr-8">
                <h4 className="text-xs text-white/50 uppercase tracking-widest mb-6">Growth & Acquisition</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Link to="/services/digital-marketing" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">Digital Marketing</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Comprehensive, omnichannel strategies tailored for rapid online growth and visibility.</p>
                  </div>
                  <div>
                    <Link to="/services/paid-ads-seo" className="text-white text-xl font-medium hover:text-[#E8B84A] transition-colors block mb-2">Paid Ads & SEO</Link>
                    <p className="text-sm text-white/50 leading-relaxed">Data-driven search engine optimization and ad campaigns that maximize your ROI.</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 flex flex-col justify-center">
                 <h2 className="text-3xl font-light text-white mb-4 leading-tight">Drive traffic that converts.</h2>
                 <button onClick={() => { setIsModalOpen(true); setActiveMenu(null); }} className="inline-flex items-center bg-white text-black px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-max">
                   Grow Your Traffic
                 </button>
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
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">IT Solutions</h4>
            <div>
              <Link to="/services/saas-development" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">SaaS Development</Link>
              <p className="text-xs text-white/40 mt-1">Custom cloud software tailored for scale.</p>
            </div>
            <div>
              <Link to="/services/website-development" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Website Development</Link>
              <p className="text-xs text-white/40 mt-1">High-performance, SEO-optimized websites.</p>
            </div>
            <div>
              <Link to="/services/app-development" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">App Development</Link>
              <p className="text-xs text-white/40 mt-1">Native and cross-platform mobile experiences.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Branding</h4>
            <div>
              <Link to="/services/brand-positioning" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Brand Positioning</Link>
              <p className="text-xs text-white/40 mt-1">Strategic messaging and market positioning.</p>
            </div>
            <div>
              <Link to="/services/content-creation" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Content Creation</Link>
              <p className="text-xs text-white/40 mt-1">Engaging multimedia and visual assets.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Marketing</h4>
            <div>
              <Link to="/services/digital-marketing" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Digital Marketing</Link>
              <p className="text-xs text-white/40 mt-1">Comprehensive, omnichannel strategies.</p>
            </div>
            <div>
              <Link to="/services/paid-ads-seo" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Paid Ads & SEO</Link>
              <p className="text-xs text-white/40 mt-1">Data-driven optimization and ad campaigns.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <h4 className="text-xs text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Insights</h4>
            <div>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-xl font-medium block">Blog</Link>
              <p className="text-xs text-white/40 mt-1">Read our latest strategies and guides.</p>
            </div>
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
