import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import digitalMarketingImg from '../../assets/DigitalMarkeing&Branding.png';
import saasImg from '../../assets/saasservices.png';
import shootContentImg from '../../assets/shoot&content.png';

const PlatformFeatures = () => {
  const features = [
    {
      title: "SaaS & App Development",
      description: "Custom software solutions built for scale. From complex SaaS platforms to intuitive mobile apps.",
      image: saasImg,
      overlay: null
    },
    {
      title: "Website Development",
      description: "High-performance, beautifully designed websites engineered for conversion and brand authority.",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
      overlay: (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md p-4 rounded-xl text-white border border-white/20 shadow-2xl">
           <div className="flex gap-2 items-center mb-2">
             <div className="w-4 h-4 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full"></div>
             <p className="text-xs font-medium">Generating Layout...</p>
           </div>
           <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
             <div className="h-full w-2/3 bg-white rounded-full"></div>
           </div>
        </div>
      )
    },
    {
      title: "Digital Marketing & Branding",
      description: "Data-driven strategies, paid ads, and brand positioning to dominate your market.",
      image: digitalMarketingImg,
      overlay: null
    },
    {
      title: "Brand & Content Creation",
      description: "High-quality video editing, professional shoots, and influencer marketing to elevate your brand positioning.",
      image: shootContentImg,
      overlay: null
    }
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, features.length]);

  return (
    <section className="pt-24 pb-8 px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-12 gap-4 md:gap-6">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Everything you need on one platform</h2>
        <p className="max-w-md text-sm text-gray-600 font-medium leading-relaxed">
          Power your day-to-day with all the tools and AI guidance you need to manage your business, seamlessly integrated in one place.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-[#1C1C1C] rounded-[2rem] overflow-hidden group cursor-pointer relative h-[500px] flex flex-col">
            
            {/* Text Content */}
            <div className="p-8 relative z-20">
              <h3 className="text-white text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
            </div>

            {/* Image & Overlay Area */}
            <div className="relative flex-1 mt-4 overflow-hidden rounded-t-3xl mx-4 mb-4">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {feature.overlay}
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 z-20">
              <ArrowRight className="text-white transform transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </div>

          </div>
        ))}
      </div>

      {/* Mobile Stacked Carousel */}
      <div className="md:hidden relative w-full h-[480px] flex justify-center items-center mt-2 perspective-[1000px]">
        {features.map((feature, index) => {
           const relativeIndex = (index - activeIndex + features.length) % features.length;
           
           let translateX = '0%';
           let translateY = '0%';
           let rotate = '0deg';
           let scale = 1;
           let zIndex = 10;
           let opacity = 0;

           if (relativeIndex === 0) {
             translateX = '0%';
             translateY = '0%';
             rotate = '0deg';
             scale = 1;
             zIndex = 30;
             opacity = 1;
           } else if (relativeIndex === 1) {
             translateX = '10%';
             translateY = '-5%';
             rotate = '6deg';
             scale = 0.95;
             zIndex = 20;
             opacity = 1;
           } else if (relativeIndex === 2) {
             translateX = '20%';
             translateY = '-10%';
             rotate = '12deg';
             scale = 0.9;
             zIndex = 10;
             opacity = 0; 
           } else {
             // To prevent jumping during loop, cards rotate out left
             translateX = '-20%';
             translateY = '5%';
             rotate = '-10deg';
             scale = 1.05;
             zIndex = 40;
             opacity = 0;
           }

           return (
             <div 
               key={index}
               className="absolute w-[85%] max-w-sm h-[480px] bg-[#1C1C1C] rounded-[2rem] overflow-hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-2xl border border-white/10"
               style={{
                 transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`,
                 zIndex,
                 opacity,
                 transformOrigin: 'bottom center'
               }}
               onClick={() => setActiveIndex(index)}
             >
                {/* Text Content */}
                <div className="p-6 relative z-20 flex-shrink-0">
                  <h3 className="text-white text-xl font-medium mb-2 pr-6">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 z-20">
                  <ArrowRight className="text-white opacity-50" size={20} />
                </div>

                {/* Image & Overlay Area - Curved edge on BOTTOM for mobile */}
                <div className="relative flex-1 mt-2 overflow-hidden rounded-b-3xl mx-4 mb-4">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  {/* Keep the overlay if present */}
                  {feature.overlay}
                </div>
             </div>
           );
        })}
      </div>
    </section>
  );
};

export default PlatformFeatures;
