import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, Search, PenTool, Target, Crosshair } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Assets
import brandingImg from '../assets/DigitalMarkeing&Branding.png';

const BrandPositioning = () => {
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
          message: `Brand Positioning Audit Request.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
        }),
      });
      if (response.ok) {
        setFormStatus('Audit request submitted successfully! We will contact you soon.');
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
      question: "What exactly is Brand Positioning?",
      answer: "Brand positioning is the process of carving out a distinct, undeniable space for your business in the mind of your target audience. Kormyx ensures your brand isn't just seen—it's felt, remembered, and preferred over competitors."
    },
    {
      question: "How long does a full brand audit take?",
      answer: "A comprehensive Kormyx brand audit, which includes competitive analysis, visual identity review, and messaging alignment, typically takes 3 to 4 weeks before we present our strategic repositioning playbook."
    },
    {
      question: "Do you design logos and visual identities?",
      answer: "Yes. While positioning is foundational strategy, our design engineers translate that strategy into world-class visual identities, including logos, typography scales, color psychology, and comprehensive brand guidelines."
    },
    {
      question: "Will this improve our marketing ROI?",
      answer: "Inevitably. When your brand's positioning is laser-focused, every subsequent marketing dollar works harder. Your messaging resonates faster, reducing customer acquisition costs and increasing lifetime value."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Helmet>
        <title>Brand Positioning Strategy | Kormyx</title>
        <meta name="description" content="Kormyx crafts undeniable brand positioning strategies. We align your visual identity, messaging, and market presence to dominate your industry." />
        <link rel="canonical" href="https://kormyx.com/services/brand-positioning" />
      </Helmet>

      <Navbar />

      <main className="pb-24">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#050505] text-white">
          <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 animate-fade-up max-w-7xl mx-auto w-full mt-8 md:mt-0">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-6 font-bold">Kormyx Brand Strategy</p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              BE <br/> UNDENIABLE.
            </h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
              In a sea of noise, clarity wins. Kormyx architects brand positioning that commands attention, builds unbreakable trust, and obliterates the competition.
            </p>
            <button 
              onClick={() => document.getElementById('audit').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              Request Brand Audit
            </button>
          </div>
        </section>

        {/* The Anatomy of a Brand */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
                The Anatomy of <br/><span className="font-medium">Influence.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                A brand is not a logo. It is a gut feeling. Kormyx dissects every touchpoint of your business to ensure a cohesive, magnetic presence that turns casual observers into fierce advocates.
              </p>
              
              <div className="space-y-12 mt-16">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Search className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Market Reconnaissance</h4>
                    <p className="text-white/50 text-sm leading-relaxed">We analyze your competitors to find the exact whitespace your brand can uniquely own. Kormyx data-driven SEO research informs our creative strategy.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <PenTool className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Visual Identity Engineering</h4>
                    <p className="text-white/50 text-sm leading-relaxed">From typography to color psychology, we design visual assets that communicate premium quality and authority before a single word is read.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Crosshair className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">Messaging & Voice</h4>
                    <p className="text-white/50 text-sm leading-relaxed">We craft your brand's verbal identity. Clear, punchy, and persuasive copywriting that resonates deeply with your target demographic.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[600px] w-full rounded-sm overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img src={brandingImg} alt="Kormyx Brand Strategy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
            </div>
          </div>
        </section>

        {/* Discovery Process Timeline */}
        <section className="py-24 px-6 md:px-12 bg-white text-black">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-black mb-6">The Kormyx Framework.</h2>
             <p className="text-black/60 text-lg">Our systematic approach to engineering industry-leading brands.</p>
          </div>
          
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
               <div className="text-right md:pr-12 md:pb-24">
                 <h3 className="text-3xl font-black mb-4">01. Discovery</h3>
                 <p className="text-black/70 leading-relaxed">We dive deep into your company's DNA, interviewing stakeholders and analyzing your current market position and SEO standing.</p>
               </div>
               <div className="hidden md:block"></div>

               <div className="hidden md:block"></div>
               <div className="text-left md:pl-12 md:pb-24">
                 <h3 className="text-3xl font-black mb-4">02. Strategy</h3>
                 <p className="text-black/70 leading-relaxed">Formulating the brand archetype, core messaging pillars, and the unique value proposition that separates you from the noise.</p>
               </div>

               <div className="text-right md:pr-12 md:pb-24">
                 <h3 className="text-3xl font-black mb-4">03. Design</h3>
                 <p className="text-black/70 leading-relaxed">Translating strategy into visual language. Logos, typography, color palettes, and comprehensive digital style guides.</p>
               </div>
               <div className="hidden md:block"></div>

               <div className="hidden md:block"></div>
               <div className="text-left md:pl-12">
                 <h3 className="text-3xl font-black mb-4">04. Execution</h3>
                 <p className="text-black/70 leading-relaxed">Rolling out the new brand across your website, social channels, and marketing materials with strict adherence to the new Kormyx guidelines.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="audit" className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Target className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-light mb-6">Initiate <span className="font-medium">Brand Audit.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Provide us with your current details. The Kormyx strategy team will review your digital footprint and reach out to discuss a repositioning roadmap.</p>
          </div>

          <div className="bg-[#111] p-8 md:p-12 border border-white/10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Work Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Company / Current Website URL</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">What is your biggest branding challenge?</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="e.g. We look like our competitors, our messaging is confusing, we are pivoting our product..."
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black py-5 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors mt-4">
                Submit For Review
              </button>
              {formStatus && (
                <p className="text-sm font-medium text-white text-center mt-2">{formStatus}</p>
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

export default BrandPositioning;
