import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Assets
import webDevVideo from '../assets/Website_Development.mp4';

const WebDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Cost Calculator State ---
  const [siteType, setSiteType] = useState('corporate'); // landing, corporate, ecommerce, custom
  const [pages, setPages] = useState('1-10'); // 1-10, 10-50, 50+
  const [design, setDesign] = useState('premium'); // template, premium, bespoke
  const [estimatedCost, setEstimatedCost] = useState({ min: 10000, max: 20000 });

  useEffect(() => {
    let baseMin = 10000;
    let baseMax = 20000;

    // Site Type
    if (siteType === 'corporate') {
      baseMin += 15000; baseMax += 30000;
    } else if (siteType === 'ecommerce') {
      baseMin += 60000; baseMax += 120000;
    } else if (siteType === 'custom') {
      baseMin += 100000; baseMax += 200000;
    }

    // Pages
    if (pages === '10-50') {
      baseMin += 15000; baseMax += 30000;
    } else if (pages === '50+') {
      baseMin += 50000; baseMax += 100000;
    }

    // Design
    if (design === 'premium') {
      baseMin += 15000; baseMax += 30000;
    } else if (design === 'bespoke') {
      baseMin += 50000; baseMax += 100000;
    }

    setEstimatedCost({ min: baseMin, max: baseMax });
  }, [siteType, pages, design]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

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
          message: `Web Dev Inquiry. Est Budget: ${formatCurrency(estimatedCost.min)} - ${formatCurrency(estimatedCost.max)}.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
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

  // --- Quick Form State ---
  const [quickData, setQuickData] = useState({ name: '', email: '', phone: '', company: '' });
  const [quickStatus, setQuickStatus] = useState('');

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    setQuickStatus('Submitting...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickData.name || 'Quick Web Dev Inquiry',
          email: quickData.email,
          message: `Quick Inquiry from Hero.\nPhone: ${quickData.phone}\nCompany: ${quickData.company}`
        }),
      });
      if (response.ok) {
        setQuickStatus('Thanks! We will be in touch shortly.');
        setQuickData({ name: '', email: '', phone: '', company: '' });
      } else {
        setQuickStatus('Failed to submit. Please try again.');
      }
    } catch (error) {
      setQuickStatus('An error occurred.');
    }
  };

  // --- FAQs State ---
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [
    {
      question: "Do you use templates or build custom?",
      answer: "We strictly build custom solutions. Whether we leverage Headless CMS architectures, React/Next.js, or customized Shopify environments, your site is engineered specifically for your brand identity and performance goals."
    },
    {
      question: "How long does a typical website project take?",
      answer: "A standard corporate website typically takes 4-8 weeks from discovery to launch. Complex e-commerce platforms or highly bespoke animated sites may take 12-16 weeks to ensure rigorous quality assurance and SEO optimization."
    },
    {
      question: "Will my website be SEO optimized out of the box?",
      answer: "Absolutely. We build with a 'Core Web Vitals first' approach, ensuring ultra-fast load times, semantic HTML5, schema markup, and fully indexable architectures from day one."
    },
    {
      question: "Do you handle hosting and maintenance?",
      answer: "Yes, we provide enterprise-grade hosting solutions on AWS or Vercel, along with ongoing SLA-backed maintenance plans to ensure your site remains secure, updated, and lightning fast."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <SEO 
        title="Premium Website Development | Kormyx"
        description="Kormyx builds ultra-fast, high-converting websites using modern React architectures. We don't use templates. We engineer digital flagships."
        canonicalUrl="/services/website-development"
      />

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
              className="w-full h-full object-cover opacity-30"
            >
              <source src={webDevVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 animate-fade-up max-w-7xl mx-auto w-full mt-8 md:mt-0">
            <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-8">
              Digital Experiences That <span className="font-medium">Define Brands</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-4xl mx-auto font-light leading-relaxed mb-12">
              We design and develop high-performance websites engineered for speed, conversion, and global scale. No templates. Just raw performance and breathtaking aesthetics.
            </p>
            <button 
              onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mb-8"
            >
              Start Your Project
            </button>

            <div className="mt-2 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Or get started instantly</p>
              <form onSubmit={handleQuickSubmit} className="w-full flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    value={quickData.name}
                    onChange={(e) => setQuickData({...quickData, name: e.target.value})}
                    className="w-full bg-[#0A0A0A]/50 backdrop-blur-md border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/40"
                  />
                  <input 
                    type="email" 
                    required
                    placeholder="Work Email"
                    value={quickData.email}
                    onChange={(e) => setQuickData({...quickData, email: e.target.value})}
                    className="w-full bg-[#0A0A0A]/50 backdrop-blur-md border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/40"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    required
                    placeholder="Company Name"
                    value={quickData.company}
                    onChange={(e) => setQuickData({...quickData, company: e.target.value})}
                    className="w-full bg-[#0A0A0A]/50 backdrop-blur-md border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/40"
                  />
                  <input 
                    type="tel" 
                    required
                    placeholder="Mobile Number"
                    value={quickData.phone}
                    onChange={(e) => setQuickData({...quickData, phone: e.target.value})}
                    className="w-full bg-[#0A0A0A]/50 backdrop-blur-md border border-white/20 px-6 py-4 text-white focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/40"
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors mt-2">
                  Request a Consultation
                </button>
              </form>
              {quickStatus && <div className="mt-3 text-sm text-gray-300 font-medium">{quickStatus}</div>}
            </div>
          </div>
        </section>

        {/* Content Section: Why Kormyx */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight">
                Beyond the <br/><span className="font-medium">Visuals.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                A beautiful website is only half the battle. We architect our digital platforms to rank organically, convert traffic efficiently, and perform flawlessly across every device and network condition.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "Headless CMS Architectures (Sanity, Contentful)",
                  "Modern Frameworks (Next.js, React, Astro)",
                  "Global Edge Caching & CDN Delivery",
                  "Perfect Core Web Vitals Optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-white/80">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-center items-center text-center h-48">
                 <h4 className="text-4xl font-light mb-2">99%</h4>
                 <p className="text-xs text-white/50 uppercase tracking-widest">Lighthouse Score</p>
               </div>
               <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-center items-center text-center h-48 mt-8">
                 <h4 className="text-4xl font-light mb-2">150ms</h4>
                 <p className="text-xs text-white/50 uppercase tracking-widest">Global TTFB</p>
               </div>
               <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-center items-center text-center h-48">
                 <h4 className="text-4xl font-light mb-2">3x</h4>
                 <p className="text-xs text-white/50 uppercase tracking-widest">Conversion Uplift</p>
               </div>
               <div className="bg-[#111] p-8 border border-white/5 hover:border-white/20 transition-colors flex flex-col justify-center items-center text-center h-48 mt-8">
                 <h4 className="text-4xl font-light mb-2">100%</h4>
                 <p className="text-xs text-white/50 uppercase tracking-widest">Custom Built</p>
               </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-24 px-6 md:px-12 bg-white text-black relative z-20 shadow-[0_-50px_150px_40px_rgba(255,255,255,0.05)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-light mb-6">Proven <span className="font-medium">Excellence.</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore how we've transformed digital presence into tangible business value for global enterprises.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <div className="group cursor-pointer">
                <div className="bg-gray-100 aspect-video mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" alt="E-Commerce Replatforming" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">E-Commerce • Next.js</p>
                <h3 className="text-2xl font-medium mb-3">Elevate Retail Global</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">Migrated a legacy monolithic storefront to a Headless Shopify architecture, resulting in a 300% faster checkout process and a 42% increase in mobile conversions.</p>
                <div className="flex items-center text-sm font-medium hover:text-gray-600 transition-colors">
                  View Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="group cursor-pointer">
                <div className="bg-gray-100 aspect-video mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop" alt="Corporate FinTech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Corporate • React</p>
                <h3 className="text-2xl font-medium mb-3">FinTech Innovators</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">Engineered a robust corporate platform serving multi-region localized content. Achieved a 150% increase in qualified lead generation within the first quarter.</p>
                <div className="flex items-center text-sm font-medium hover:text-gray-600 transition-colors">
                  View Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="group cursor-pointer">
                <div className="bg-gray-100 aspect-video mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2370&auto=format&fit=crop" alt="Digital Publication" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Publishing • Sanity CMS</p>
                <h3 className="text-2xl font-medium mb-3">The Daily Tech</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">Built a highly scalable editorial platform utilizing edge-caching to deliver sub-100ms load times for over 1 million daily active readers without server degradation.</p>
                <div className="flex items-center text-sm font-medium hover:text-gray-600 transition-colors">
                  View Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Estimation Calculator Section */}
        <section id="calculator" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Transparent <span className="font-medium">Pricing.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">No hidden fees. Use our interactive estimator to gauge the investment required for your custom web development project.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Calculator Controls */}
            <div className="space-y-10">
              
              {/* Site Type */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Website Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-[#111] p-1 rounded-sm">
                  {['Landing Page', 'Corporate', 'E-Commerce', 'Custom Web App'].map((type) => {
                    const value = type.toLowerCase().split(' ')[0];
                    const isSelected = siteType === value || (value === 'custom' && siteType === 'custom');
                    return (
                      <button
                        key={value}
                        onClick={() => setSiteType(value)}
                        className={`w-full py-3 text-xs md:text-sm font-medium transition-colors ${isSelected ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Number of Pages */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Scale (Total Pages)</label>
                <div className="flex bg-[#111] p-1 rounded-sm">
                  {['1-10', '10-50', '50+'].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setPages(scale)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${pages === scale ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Fidelity */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Design Fidelity</label>
                <div className="flex bg-[#111] p-1 rounded-sm">
                  {['Template', 'Premium', 'Bespoke'].map((fidelity) => (
                    <button
                      key={fidelity.toLowerCase()}
                      onClick={() => setDesign(fidelity.toLowerCase())}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${design === fidelity.toLowerCase() ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      {fidelity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 bg-black border border-white/10 text-center">
                 <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Estimated Investment</p>
                 <div className="text-xl sm:text-2xl md:text-4xl font-light whitespace-nowrap">
                   {formatCurrency(estimatedCost.min)} - {formatCurrency(estimatedCost.max)}
                 </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <p className="text-white/50 mb-8 text-sm">Submit your project details below and our design engineering team will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Work Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
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
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Mobile Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Project Details</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder="Tell us about your goals, current stack, and timeline..."
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                  Submit Inquiry
                </button>
                {formStatus && (
                  <p className="text-sm font-medium text-[#E8B84A] text-center mt-2">{formStatus}</p>
                )}
              </form>
            </div>
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

// Add ArrowRight icon missing import handler
const ArrowRight = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default WebDevelopment;
