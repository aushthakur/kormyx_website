import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, MousePointerClick, Search, Target, Infinity } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaidAdsSeo = () => {
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
          message: `Paid Ads / SEO Inquiry.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
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
      question: "Should I focus on SEO or Paid Ads first?",
      answer: "We recommend a hybrid approach. Paid Ads generate immediate cash flow and validate product-market fit, while SEO builds long-term equity. By running both, Kormyx uses the data from your paid campaigns to inform a highly lucrative organic SEO strategy."
    },
    {
      question: "How long does it take to rank on page 1 of Google?",
      answer: "For low-competition long-tail keywords, we often secure page 1 rankings within 60 days. For highly competitive 'money' keywords, a robust Kormyx SEO campaign takes 6-12 months of aggressive technical optimization and backlinking."
    },
    {
      question: "Do you guarantee ROAS (Return on Ad Spend)?",
      answer: "While algorithm fluctuations prevent absolute guarantees, we operate with strict KPI thresholds. If a campaign isn't hitting the agreed-upon ROAS within the testing phase, we pause, recalibrate the creative or targeting, and redeploy."
    },
    {
      question: "What platforms do you manage ads on?",
      answer: "We manage multi-million dollar budgets across Google Ads (Search, Display, Performance Max), Meta (Facebook & Instagram), LinkedIn (for B2B), and TikTok."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <SEO 
        title="Paid Ads & Technical SEO | Kormyx"
        description="Dominate the algorithms. Kormyx merges high-velocity Paid Advertising with compounding Technical SEO to monopolize search results and scale revenue."
        canonicalUrl="/services/paid-ads-seo"
      />

      <Navbar />

      <main className="pb-24">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col lg:flex-row pt-24 overflow-hidden">
           
           {/* Split Pane - Paid Ads (Left) */}
           <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-[#0A0A0A] flex flex-col justify-center px-8 md:px-16 relative group border-r border-white/5">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <MousePointerClick className="w-12 h-12 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h1 className="text-5xl md:text-7xl font-light mb-4">Paid<br/><span className="font-medium">Acquisition.</span></h1>
              <p className="text-white/60 text-lg max-w-md leading-relaxed">
                High-velocity scale. We deploy capital with mathematical precision to acquire customers immediately via Meta, Google, and LinkedIn.
              </p>
           </div>

           {/* Split Pane - SEO (Right) */}
           <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-[#050505] flex flex-col justify-center px-8 md:px-16 relative group">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <Search className="w-12 h-12 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <h1 className="text-5xl md:text-7xl font-light mb-4">Technical<br/><span className="font-medium">SEO.</span></h1>
              <p className="text-white/60 text-lg max-w-md leading-relaxed">
                Compounding equity. We engineer your site architecture and content to dominate organic search and drive perpetual, zero-CAC traffic.
              </p>
           </div>

           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex w-24 h-24 bg-white text-black rounded-full items-center justify-center font-black text-2xl border-4 border-[#050505] shadow-2xl">
             VS
           </div>
        </section>

        {/* Algorithm Domination */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center mt-12">
          <h2 className="text-3xl md:text-5xl font-light mb-6">The Kormyx <span className="font-medium">Synergy.</span></h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-16">
            We don't treat them as separate channels. Kormyx feeds the search intent data harvested from your Paid Ads directly into our Technical SEO roadmap, creating a closed-loop system of algorithm domination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
             <div className="bg-[#111] p-10 border border-white/10 hover:border-white/30 transition-colors rounded-sm">
                <Target className="w-8 h-8 mb-6" />
                <h3 className="text-xl font-bold mb-4">1. Harvest Intent</h3>
                <p className="text-white/50 text-sm leading-relaxed">We run aggressive Search Ads to identify exact-match keywords that have the highest conversion rates and LTV for your specific product.</p>
             </div>
             <div className="bg-[#111] p-10 border border-white/10 hover:border-white/30 transition-colors rounded-sm">
                <Infinity className="w-8 h-8 mb-6" />
                <h3 className="text-xl font-bold mb-4">2. Build the Moat</h3>
                <p className="text-white/50 text-sm leading-relaxed">Our SEO engineers build programmatic content clusters and technical silos around those proven keywords, establishing topical authority.</p>
             </div>
             <div className="bg-[#111] p-10 border border-white/10 hover:border-white/30 transition-colors rounded-sm bg-white text-black">
                <Search className="w-8 h-8 mb-6" />
                <h3 className="text-xl font-bold mb-4">3. Monopolize</h3>
                <p className="text-black/70 text-sm leading-relaxed">You rank organically for the terms, capturing the free traffic. We shift ad spend to retargeting and top-of-funnel brand awareness. CAC plummets.</p>
             </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Dominate <span className="font-medium">Search.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Ready to scale your traffic and lower your CAC? Submit your details below for a Kormyx account audit.</p>
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
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Website URL</label>
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
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Current Situation</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Tell us what you are currently spending on ads, your current organic traffic, and your goals..."
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors mt-2">
                Request Audit
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

export default PaidAdsSeo;
