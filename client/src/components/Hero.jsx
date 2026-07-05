import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Smartphone, Monitor, Globe, Download } from 'lucide-react';
import ScheduleModal from './ScheduleModal';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    { id: 0, title: 'MOBILE APPS', desc: 'Engaging experiences,\ndesigned to perform.', icon: Smartphone, img: '/mobile_app_mockup.png' },
    { id: 1, title: 'SAAS PLATFORMS', desc: 'Powerful, scalable solutions\nthat drive real impact.', icon: Monitor, img: '/saas_dashboard_mockup.png' },
    { id: 2, title: 'WEBSITES', desc: 'Beautiful, high-performance\nwebsites that convert.', icon: Globe, img: '/website_mockup.png' }
  ];

  // Array of local MKV files hosted in the public directory
  const videoSources = [
    "/videos/Website Builder Easily Create Your Own Website Squarespace (3).mkv",
    "/videos/Website Builder Easily Create Your Own Website Squarespace (1).mkv",
    "/videos/Website Builder Easily Create Your Own Website Squarespace (2).mkv"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 20; 
      const y = (e.clientY / clientHeight - 0.5) * 20; 
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // explicitly load the new source
      videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
    }
  }, [currentVideoIndex]);

  // Autoplay carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, cards.length]);

  const handleCardClick = (id) => {
    setActiveCard(id);
    setIsPaused(true);
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-start pt-20 lg:pt-32 items-center bg-[#0D0D0D]">
      
      {/* Background Video Sequential Player */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover scale-105 opacity-50"
        >
          <source src={videoSources[currentVideoIndex]} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/40 via-[#0D0D0D]/10 to-[#0D0D0D]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mt-24 md:mt-0">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight text-white mb-8 animate-fade-up">
          A website<br/>makes it real
        </h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-up px-2" style={{ animationDelay: '0.2s', opacity: 0 }}>
          
          {/* Mobile: Row 1 (Two buttons) */}
          <div className="flex md:hidden flex-row w-full gap-3 justify-center">
            <a href="#work" className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent border border-white text-white px-4 sm:px-6 py-4 rounded-none text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors pointer-events-auto text-center whitespace-nowrap">
              Current Projects <ArrowUpRight size={14} />
            </a>
            <a href="#" download className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-transparent border border-white text-white px-4 sm:px-6 py-4 rounded-none text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors pointer-events-auto text-center whitespace-nowrap">
              <Download size={14} /> Portfolio
            </a>
          </div>
          
          {/* Mobile: Row 2 (One button) */}
          <div className="flex md:hidden w-full justify-center mt-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white border border-white text-black px-6 sm:px-8 py-4 rounded-none text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors pointer-events-auto"
            >
              Schedule a Meeting
            </button>
          </div>

          {/* Desktop: Original Button */}
          <a href="#work" className="hidden md:flex items-center gap-2 bg-transparent border border-white text-white px-10 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors pointer-events-auto">
            See Current Projects <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Overlapping Website Previews (Interactive Carousel) */}
      <div className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 transform -translate-x-1/2 w-full max-w-[1400px] h-[350px] md:h-[500px] z-20 opacity-0 animate-fade-up pointer-events-auto" style={{ animationDelay: '0.8s' }}>
        {cards.map((card, index) => {
           let offset = index - activeCard;
           if (offset > 1) offset -= 3;
           else if (offset < -1) offset += 3;
           
           const isCenter = offset === 0;
           const isLeft = offset === -1;
           const isRight = offset === 1;

           // Horizontal for center, Vertical for sides
           const widthClass = isCenter ? 'w-[90%] md:w-[48rem]' : 'w-[35%] md:w-64';
           const heightClass = isCenter ? 'h-[250px] md:h-[400px]' : 'h-[200px] md:h-[280px]';
           
           const opacityClass = isCenter ? 'opacity-100 blur-none grayscale-0' : 'opacity-60 blur-[1px] grayscale';
           const displayClass = 'flex'; // always flex to allow smooth transitions off-screen
           const zIndex = isCenter ? 30 : 20;

           let leftPos = '50%';
           if (isLeft) leftPos = isMobile ? '-50%' : '12%';
           if (isRight) leftPos = isMobile ? '150%' : '88%';
           
           const mouseX = mousePos.x * (isCenter ? 0.5 : 1.5);
           const mouseY = mousePos.y * (isCenter ? 0.5 : 1.5) - (isCenter ? 40 : 0);

           const Icon = card.icon;

           return (
             <div 
               key={card.id}
               onClick={() => handleCardClick(card.id)}
               className={`absolute bottom-0 rounded-t-2xl overflow-hidden shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] border border-white/20 bg-[#151515] flex-col cursor-pointer ${widthClass} ${opacityClass} ${displayClass}`}
               style={{ 
                 left: leftPos,
                 transform: `translate(calc(-50% + ${mouseX}px), ${mouseY}px)`,
                 zIndex: zIndex,
                 boxShadow: isCenter ? '0 -30px 60px -15px rgba(0, 0, 0, 0.9)' : '0 -25px 50px -12px rgba(0, 0, 0, 0.8)'
               }}
             >
                {/* Mock Browser Header */}
                <div className="h-6 w-full bg-white/5 border-b border-white/5 flex items-center px-4 gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                
                <div className={`relative ${heightClass} overflow-hidden transition-all duration-400`}>
                   <img src={card.img} className="w-full h-full object-cover object-top" alt={card.title} />
                </div>
                
                {/* Footer */}
                <div className="p-4 md:p-5 flex items-center justify-between border-t border-white/5 bg-[#0D0D0D]">
                  <div className="flex gap-4 items-center">
                    <Icon className={`text-white/60 hidden md:block transition-all duration-400 ${isCenter ? 'scale-110' : 'scale-90'}`} size={24} />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-[10px] md:text-sm tracking-wider mb-1">{card.title}</span>
                      <span className="text-white/50 text-[8px] md:text-xs leading-tight whitespace-pre-line hidden md:block">{card.desc}</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <ArrowRight className="text-white/60" size={14} />
                  </div>
                </div>
             </div>
           );
        })}
      </div>
      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
