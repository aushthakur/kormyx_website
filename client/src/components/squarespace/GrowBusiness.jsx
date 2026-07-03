import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import digitalMarketingImg from '../../assets/DigitalMarkeing&Branding.png';
import saasImg from '../../assets/saasservices.png';
import shootContentImg from '../../assets/shoot&content.png';

const GrowBusiness = () => {
  const [activeTab, setActiveTab] = useState('SaaS Development');
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    'SaaS Development', 
    'Website Development', 
    'App Development', 
    'Digital Marketing', 
    'Brand Positioning', 
    'Paid Ads & SEO', 
    'Content Creation'
  ];

  const tabContent = {
    'SaaS Development': {
      title: 'Build scalable SaaS',
      description: 'End-to-end architecture, API integrations, and robust cloud deployments for your software as a service.',
      tags: 'Tech Startups · Enterprise Solutions · B2B Platforms',
      mockupImage: saasImg,
      bgColor: '#352F2D'
    },
    'Website Development': {
      title: 'High-converting websites',
      description: 'From landing pages to complex enterprise portals, we engineer websites that turn visitors into customers.',
      tags: 'E-commerce · Corporate Sites · Portfolios',
      mockupImage: '/website_mockup.png', // From public folder
      bgColor: '#2C352D'
    },
    'App Development': {
      title: 'Native & cross-platform',
      description: 'Stunning iOS and Android applications designed for seamless user experiences and high retention.',
      tags: 'Mobile Apps · Fintech · Consumer Products',
      mockupImage: '/mobile_app_mockup.png', // From public folder
      bgColor: '#2D3135'
    },
    'Digital Marketing': {
      title: 'Dominate the market',
      description: 'Comprehensive digital strategies combining organic growth, community building, and viral loops.',
      tags: 'Growth Hacking · Viral Campaigns · Social Media',
      mockupImage: digitalMarketingImg,
      bgColor: '#352D35'
    },
    'Brand Positioning': {
      title: 'Define your authority',
      description: 'Visual identity, brand messaging, and strategic positioning to make your brand impossible to ignore.',
      tags: 'Rebranding · Visual Identity · Messaging',
      mockupImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop',
      bgColor: '#352D2D'
    },
    'Paid Ads & SEO': {
      title: 'Aggressive acquisition',
      description: 'Hyper-targeted ad campaigns and technical SEO to drive massive, high-intent traffic to your funnels.',
      tags: 'Google Ads · Meta Ads · Technical SEO',
      mockupImage: '/saas_dashboard_mockup.png',
      bgColor: '#35322D'
    },
    'Content Creation': {
      title: 'Shoots & Video Editing',
      description: 'High-end video production, cinematic shoots, and influencer marketing campaigns that capture attention.',
      tags: 'Video Production · Photography · Influencers',
      mockupImage: shootContentImg,
      bgColor: '#2D3535'
    }
  };

  const currentIndex = tabs.indexOf(activeTab);
  const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  const nextIndex = (currentIndex + 1) % tabs.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab(tabs[(tabs.indexOf(activeTab) + 1) % tabs.length]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab, isPaused]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsPaused(true); // Stop auto-play when user manually clicks
  };

  const renderCard = (tabName, isCenter) => {
    const content = tabContent[tabName];
    return (
      <div 
        className={`relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-white/10`}
        style={{ backgroundColor: content.bgColor }}
      >
        {/* Top Text */}
        <div className={`z-20 relative w-full p-10 md:p-14 md:w-2/3`}>
          <h3 className={`text-white font-serif mb-4 text-3xl md:text-5xl`}>
            {content.title}
          </h3>
          <p className={`text-white/80 leading-relaxed text-base md:text-lg`}>
            {content.description}
          </p>
        </div>

        {/* Centered Mockup Image */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 overflow-hidden rounded-xl shadow-2xl border border-white/10 top-[45%] w-[80%] md:w-[60%]`}>
           <img src={content.mockupImage} alt={content.title} className="w-full h-auto object-cover" />
        </div>

        {/* Bottom Footer Area */}
        <div className={`absolute bottom-0 left-0 w-full flex justify-between items-end z-20 p-8 md:px-14 md:py-10 transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
           <span className="text-white/70 text-xs md:text-sm tracking-wide font-medium">
             Great for: {content.tags}
           </span>
           <ArrowRight className="text-white" size={24} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10 pointer-events-none"></div>
      </div>
    );
  };

  return (
    <section className="pt-8 pb-12 bg-white text-black overflow-hidden relative">
      <style>
        {`
          @keyframes scroll-tabs {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
          .animate-scroll-tabs {
            animation: scroll-tabs 25s linear infinite;
          }
          .animate-scroll-tabs:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Grow your business</h2>
        <p className="text-gray-600">You deserve an agency that can do it all.</p>
      </div>

      {/* Scrolling Tabs */}
      <div className="w-full overflow-hidden mb-16 relative z-30 flex">
        <div className="flex w-max animate-scroll-tabs gap-2 md:gap-6 px-4">
          {[...tabs, ...tabs, ...tabs].map((tab, idx) => (
            <button 
              key={`${tab}-${idx}`}
              onClick={() => handleTabClick(tab)}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-gray-200 text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Showcase Area (3D Wheel Carousel) */}
      <div 
        className="w-full relative flex justify-center h-[500px] md:h-[650px] items-center"
        style={{ perspective: '1200px' }}
      >
        {tabs.map((tabName, index) => {
           let offset = (index - currentIndex) % tabs.length;
           if (offset > Math.floor(tabs.length / 2)) offset -= tabs.length;
           else if (offset < -Math.floor(tabs.length / 2)) offset += tabs.length;

           const isCenter = offset === 0;
           const isVisible = Math.abs(offset) <= 1;

           // Calculate 3D transforms
           const translateX = offset * (isMobile ? 120 : 55); // Move off-screen completely on mobile
           const scale = isCenter ? 1 : (isMobile ? 0.9 : 0.85); 
           const rotateY = offset * (isMobile ? 0 : -15);
           const zIndex = 20 - Math.abs(offset);
           const opacity = isCenter ? 1 : (isMobile ? 0 : (isVisible ? 0.5 : 0));

           return (
             <div 
               key={tabName}
               onClick={() => { if (isVisible) handleTabClick(tabName) }}
               className={`absolute top-0 w-[90%] md:w-[70%] xl:w-[50%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isVisible ? 'cursor-pointer' : 'pointer-events-none'}`}
               style={{
                 transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                 zIndex: zIndex,
                 opacity: opacity,
               }}
             >
                {renderCard(tabName, isCenter)}
             </div>
           );
        })}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center items-center gap-2 mt-12">
        {tabs.map((tab, idx) => (
          <button 
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === tab ? 'w-8 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default GrowBusiness;
