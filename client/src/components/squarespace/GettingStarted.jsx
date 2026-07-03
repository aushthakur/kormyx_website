import React, { useRef, useState } from 'react';
import saasVideo from '../../assets/SAAS.mp4';
import webVideo from '../../assets/Website_Development.mp4';
import { ArrowRight, Bot } from 'lucide-react';
import QuestionnaireModal from '../QuestionnaireModal';

const TiltCard = ({ videoSrc, centerElement, title, description, buttonText, onClick }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 }); 
  };

  return (
    <div 
      className="w-full h-full relative z-20 group"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-md mx-auto aspect-[3/4] min-h-[400px] md:min-h-[500px] rounded-sm overflow-hidden bg-black relative shadow-2xl transition-all duration-200 ease-out cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovering 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
      >
        {/* Background Video */}
        <video 
          src={videoSrc} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

        {/* Optional Center Floating Element */}
        {centerElement && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 z-20 transition-transform duration-500 pointer-events-none"
            style={{ transform: isHovering ? 'translate(-50%, -50%) translateZ(50px) scale(1.05)' : 'translate(-50%, -50%) translateZ(0) scale(1)' }}
          >
            {centerElement}
          </div>
        )}

        {/* Bottom Content */}
        <div 
          className="absolute bottom-0 w-full p-10 flex flex-col items-center text-center z-20 transition-transform duration-300 pointer-events-none"
          style={{ transform: isHovering ? 'translateZ(40px)' : 'translateZ(0)' }}
        >
          <span className="text-white font-semibold text-sm mb-3 tracking-wide">{title}</span>
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-sm">
            {description}
          </p>
          <button className="flex items-center gap-2 text-white font-semibold text-lg hover:text-[#E8B84A] transition-colors pointer-events-auto">
            {buttonText} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const GettingStarted = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('web');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <section className="pt-12 pb-24 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Glow similar to screenshot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#E8B84A]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-black mb-4 tracking-tight">
            Getting started has never been easier
          </h2>
          <p className="text-gray-600 text-lg">
            No experience required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
           <TiltCard 
             videoSrc={webVideo}
             centerElement={
               <div className="mx-auto max-w-sm bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center gap-3 shadow-2xl">
                 <Bot className="text-white" size={20} />
                 <span className="text-white text-sm font-medium">What site sections do you need?</span>
               </div>
             }
             title="Submit your query for web development"
             description="Answer a few questions and let our expert team do the rest."
             buttonText="Start Building"
             onClick={() => openModal('web')}
           />
           <TiltCard 
             videoSrc={saasVideo}
             title="Submit your query for SaaS development"
             description="Crafted by our designers, customized by our engineers—just for your business."
             buttonText="Browse website templates"
             onClick={() => openModal('saas')}
           />
        </div>
      </div>
      
      <QuestionnaireModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        serviceType={modalType} 
      />
    </section>
  );
};

export default GettingStarted;
