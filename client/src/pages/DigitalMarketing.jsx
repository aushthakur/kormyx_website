import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, TrendingUp, Users, Mail, Globe, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DigitalMarketing = () => {
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
          message: `Digital Marketing Inquiry.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
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
      question: "What makes Kormyx's digital marketing different?",
      answer: "We don't operate in silos. Kormyx integrates SEO, paid acquisition, email automation, and content marketing into a single, cohesive growth engine. Every channel feeds into the others, compounding your ROI."
    },
    {
      question: "How do you measure marketing success?",
      answer: "While vanity metrics like impressions and clicks are noted, our primary KPIs are strictly revenue-focused: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and Customer Lifetime Value (LTV)."
    },
    {
      question: "Do you handle B2B or B2C marketing?",
      answer: "Both. The psychology of conversion remains the same, though the channels and sales cycles differ. We architect lead generation funnels for B2B enterprise clients and high-velocity e-commerce campaigns for B2C brands."
    },
    {
      question: "How soon can we expect to see ROI?",
      answer: "Paid acquisition (Ads) can yield positive ROI within the first 30 days as we optimize targeting. Organic strategies (SEO & Content) are long-term equity builds, typically showing exponential growth at the 6-9 month mark."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <SEO 
        title="Omnichannel Digital Marketing | Kormyx"
        description="Kormyx engineers data-driven digital marketing campaigns. We scale revenue through integrated SEO, paid acquisition, and automation strategies."
        canonicalUrl="/services/digital-marketing"
      />

      <Navbar />

      <main className="pb-24">
        
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#0A0A0A]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          
          <div className="relative z-10 animate-fade-up max-w-7xl mx-auto w-full mt-8 md:mt-0">
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8 leading-[1]">
              Architecting <br className="hidden md:block"/> <span className="font-medium">Exponential Growth.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Kormyx doesn't just run ads. We build sophisticated, omnichannel growth engines that acquire customers at scale and compound your digital revenue.
            </p>
            <button 
              onClick={() => document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center mx-auto gap-3"
            >
              Scale Your Revenue <TrendingUp size={18} />
            </button>
          </div>
        </section>

        {/* Omnichannel Strategy */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-light mb-6">The Omnichannel <span className="font-medium">Advantage.</span></h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
              Siloed marketing fails. Kormyx orchestrates a unified symphony of acquisition channels. When your SEO, Paid Ads, and Email Automation communicate, customer acquisition costs plummet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors">
              <Globe className="text-white w-8 h-8 mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">SEO & Organic</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Building digital real estate. We rank your brand for high-intent keywords that drive perpetual, free traffic.</p>
              <ul className="space-y-2 text-xs text-white/40 font-medium">
                <li>• Technical Audits</li>
                <li>• Content Clusters</li>
                <li>• High-DR Link Building</li>
              </ul>
            </div>

            <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors">
              <BarChart2 className="text-white w-8 h-8 mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">Paid Acquisition</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Precision targeting. We deploy capital across Meta, Google, and LinkedIn with strict ROAS mandates.</p>
              <ul className="space-y-2 text-xs text-white/40 font-medium">
                <li>• Performance Max</li>
                <li>• Retargeting Funnels</li>
                <li>• Conversion Tracking</li>
              </ul>
            </div>

            <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors">
              <Mail className="text-white w-8 h-8 mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">Email & Automation</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Maximizing LTV. We build automated flows that nurture leads and re-engage dormant customers on autopilot.</p>
              <ul className="space-y-2 text-xs text-white/40 font-medium">
                <li>• Klaviyo Integration</li>
                <li>• Cart Abandonment</li>
                <li>• Drip Campaigns</li>
              </ul>
            </div>

            <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors">
              <Users className="text-white w-8 h-8 mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">CRO</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Conversion Rate Optimization. We run rigorous A/B tests to squeeze more revenue from your existing traffic.</p>
              <ul className="space-y-2 text-xs text-white/40 font-medium">
                <li>• Heatmap Analysis</li>
                <li>• Friction Removal</li>
                <li>• Landing Page Testing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Visualization / Performance Section */}
        <section className="py-32 px-6 md:px-12 bg-white text-black overflow-hidden relative">
           <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Data over Dogma.</h2>
                <p className="text-black/70 text-lg leading-relaxed mb-8">
                  Gut feelings don't scale companies; data does. Kormyx implements enterprise-grade analytics infrastructure to track every click, scroll, and conversion.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl rounded-sm">1</div>
                    <p className="font-medium">Define strict CAC and ROAS targets.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl rounded-sm">2</div>
                    <p className="font-medium">Deploy algorithmic bidding strategies.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold text-xl rounded-sm">3</div>
                    <p className="font-medium">Scale winning campaigns aggressively.</p>
                  </div>
                </div>
              </div>
              
              {/* CSS Data Chart Simulation */}
              <div className="lg:w-1/2 w-full h-[400px] border-b-2 border-l-2 border-black/20 relative flex items-end justify-between px-4 pb-0 pt-12">
                 {/* Chart Bars */}
                 <div className="w-1/6 bg-black/10 hover:bg-black transition-colors rounded-t-sm h-[20%] group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q1</div>
                 </div>
                 <div className="w-1/6 bg-black/20 hover:bg-black transition-colors rounded-t-sm h-[35%] group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q2</div>
                 </div>
                 <div className="w-1/6 bg-black/40 hover:bg-black transition-colors rounded-t-sm h-[55%] group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q3</div>
                 </div>
                 <div className="w-1/6 bg-black/70 hover:bg-black transition-colors rounded-t-sm h-[80%] group relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Q4</div>
                 </div>
                 <div className="w-1/6 bg-black hover:bg-black transition-colors rounded-t-sm h-[100%] group relative shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Y2</div>
                 </div>
                 
                 {/* Trend Line (SVG) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <polyline points="8,80 25,65 42,45 58,20 75,0" fill="none" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                 </svg>
              </div>
           </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry" className="py-32 px-6 md:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Start <span className="font-medium">Scaling.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Fill out the form below. A Kormyx growth strategist will audit your current digital marketing efforts and propose an exponential growth roadmap.</p>
          </div>

          <div className="bg-[#111] p-8 md:p-12 border border-white/10 shadow-2xl">
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
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Company URL</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Current Monthly Marketing Budget</label>
                  <select 
                    required
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="under5k">Under ₹50,000</option>
                    <option value="5k-20k">₹50,000 - ₹2,00,000</option>
                    <option value="20k-50k">₹2,00,000 - ₹5,00,000</option>
                    <option value="50k+">₹5,00,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Growth Objectives</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your revenue goals, target CPA, and current bottlenecks..."
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors mt-2">
                Request Growth Audit
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

export default DigitalMarketing;
