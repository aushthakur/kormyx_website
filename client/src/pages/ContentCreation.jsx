import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, Video, Camera, Type, PenTool } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Assets
import contentVideo from '../assets/Website_Development.mp4'; // Placeholder video
import shootImg from '../assets/shoot&content.png';

const ContentCreation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Main Inquiry Form State ---
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', details: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Content Creation Inquiry.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
        }),
      });
      if (response.ok) {
        setFormStatus('Inquiry submitted successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', company: '', details: '' });
      } else {
        setFormStatus('Failed to submit. Please try again later.');
      }
    } catch (error) {
      setFormStatus('An error occurred. Please try again.');
    }
  };

  // --- FAQs State ---
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    {
      question: "What types of content does Kormyx produce?",
      answer: "We are a full-stack creative agency. Our production capabilities include high-end cinematic video, 3D motion graphics, professional brand photography, and conversion-optimized copywriting for web and social."
    },
    {
      question: "Do you handle the creative direction or just execution?",
      answer: "Both. Kormyx assigns a dedicated Creative Director to your account to ensure every piece of content produced aligns perfectly with your overarching brand positioning and marketing goals."
    },
    {
      question: "Can you produce content for multiple social platforms simultaneously?",
      answer: "Yes. We specialize in macro-to-micro content production. A single shoot day can yield pillar content that we then slice into dozens of platform-native micro-assets for TikTok, Reels, LinkedIn, and YouTube Shorts."
    },
    {
      question: "How do you ensure the content actually converts?",
      answer: "We don't just make things look pretty. We engineer content based on psychological triggers, direct-response copywriting principles, and rigorous A/B testing data to ensure it drives measurable action."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Helmet>
        <title>Premium Content Creation & Production | Kormyx</title>
        <meta name="description" content="Kormyx produces cinematic video, high-end photography, and persuasive copywriting that captivates audiences and drives unprecedented engagement." />
        <link rel="canonical" href="https://kormyx.com/services/content-creation" />
      </Helmet>

      <Navbar />

      <main className="pb-24">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-40"
            >
              <source src={contentVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 animate-fade-up max-w-5xl mx-auto w-full mt-8 md:mt-0">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-6">Kormyx Production Studios</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 leading-[1.1]">
              Attention is the <br/> New <span className="font-medium italic pr-2">Currency.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Stop blending in. We produce scroll-stopping, cinematic assets designed specifically to capture attention and convert it into revenue.
            </p>
            <button 
              onClick={() => document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Commission a Project
            </button>
          </div>
        </section>

        {/* The Kormyx Content Arsenal (Masonry-style Grid) */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-20 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-light mb-6">The Content <span className="font-medium">Arsenal.</span></h2>
              <p className="text-white/60 text-lg leading-relaxed">
                We equip your brand with a barrage of high-fidelity assets. From the written word to 3D motion, Kormyx operates at the bleeding edge of digital production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
            {/* Cinematic Video */}
            <div className="md:col-span-8 bg-[#111] relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors p-8 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                 <img src={shootImg} alt="Kormyx Video Production" className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 grayscale" />
              </div>
              <div className="relative z-10">
                <Video size={32} className="mb-4" />
                <h3 className="text-2xl font-medium mb-2">Cinematic Video</h3>
                <p className="text-white/60 max-w-md">Brand anthems, product demos, and high-converting VSLs shot on RED cameras.</p>
              </div>
            </div>

            {/* Copywriting */}
            <div className="md:col-span-4 bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-colors p-8 flex flex-col justify-end group">
              <Type size={32} className="mb-4 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-medium mb-2">Conversion Copy</h3>
              <p className="text-white/60">Psychology-driven words that sell. Web copy, email flows, and ad creatives.</p>
            </div>

            {/* Photography */}
            <div className="md:col-span-5 bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-colors p-8 flex flex-col justify-end group">
              <Camera size={32} className="mb-4 text-white/50 group-hover:text-white transition-colors" />
              <h3 className="text-2xl font-medium mb-2">Brand Photography</h3>
              <p className="text-white/60">Studio and lifestyle shoots that elevate your visual baseline.</p>
            </div>

            {/* 3D & Motion */}
            <div className="md:col-span-7 bg-[#111] relative overflow-hidden group border border-white/5 hover:border-white/20 transition-colors p-8 flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111] to-white/5 z-0 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="relative z-10">
                <PenTool size={32} className="mb-4" />
                <h3 className="text-2xl font-medium mb-2">3D & Motion Graphics</h3>
                <p className="text-white/60 max-w-md">Complex concepts simplified through breathtaking, impossible physics and animations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content That Converts Section */}
        <section className="py-24 px-6 md:px-12 bg-white text-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-square bg-black p-12 flex items-center justify-center text-white text-center">
              <div>
                <h4 className="text-6xl md:text-8xl font-black mb-4">10x</h4>
                <p className="text-xl uppercase tracking-widest text-white/50">Return on Ad Spend</p>
                <div className="w-16 h-px bg-white/20 mx-auto my-8"></div>
                <p className="text-sm font-medium leading-relaxed max-w-sm mx-auto">Average performance uplift when replacing generic stock assets with Kormyx custom-engineered creative.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                Pretty is pointless if it doesn't <span className="underline decoration-4 underline-offset-4">profit</span>.
              </h2>
              <p className="text-black/70 text-lg leading-relaxed mb-6">
                Most agencies focus on making art. We focus on making assets. Every piece of content Kormyx produces is rigorously designed with a singular goal: driving measurable business outcomes.
              </p>
              <p className="text-black/70 text-lg leading-relaxed">
                Whether it's a 15-second TikTok ad designed to hack the algorithm, or a 3-minute mini-documentary designed to build deep brand equity, we engineer the creative to match the objective perfectly.
              </p>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Brief Our <span className="font-medium">Producers.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Ready to elevate your creative? Submit your project details below and a Kormyx producer will reach out within 24 hours.</p>
          </div>

          <div className="bg-[#0A0A0A] p-8 md:p-12 border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Work Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Production Requirements</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Tell us what you need. (e.g. A new brand video, 30 social media reels, a product photoshoot...)"
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors mt-2">
                Submit Brief
              </button>
              {formStatus && (
                <p className="text-sm font-medium text-[#E8B84A] text-center mt-2">{formStatus}</p>
              )}
            </form>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Frequently Asked <span className="font-medium">Questions.</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                >
                  <span className="text-lg md:text-xl font-medium group-hover:text-white/80 transition-colors">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={24} className="text-white/50" /> : <ChevronDown size={24} className="text-white/50" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-white/60 pb-6 pr-8 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ContentCreation;
