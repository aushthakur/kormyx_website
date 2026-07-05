import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { CheckCircle2, Server, Layout, Database, Code, ShieldCheck, Cloud, Plus, Minus, ArrowRight } from 'lucide-react';

// Video and Logos
import saasVideo from '../assets/SAAS.mp4';
import hubspotLogo from '../assets/saas logo/Hubspot-logo.webp';
import stripeLogo from '../assets/saas logo/Stripe-logo.webp';
import figmaLogo from '../assets/saas logo/Figma-Logo.png';
import instantlyLogo from '../assets/saas logo/instantly-logo.jpeg';
import notionLogo from '../assets/saas logo/notion-logo.webp';
import shopifyLogo from '../assets/saas logo/shopify.webp';
import slackLogo from '../assets/saas logo/slack-logo.png';
import watiLogo from '../assets/saas logo/wati-logo.svg';

const SaasDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Cost Calculator State ---
  const [complexity, setComplexity] = useState('mvp'); // mvp, standard, enterprise
  const [users, setUsers] = useState('0-500'); // 0-500, 500-5000, 5000+
  const [integrations, setIntegrations] = useState(1); // number of 3rd party integrations
  const [mobileApp, setMobileApp] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({ min: 300000, max: 600000 });

  useEffect(() => {
    let baseMin = 300000; // 3 Lakhs
    let baseMax = 600000; // 6 Lakhs

    if (complexity === 'standard') {
      baseMin += 400000; baseMax += 800000;
    } else if (complexity === 'enterprise') {
      baseMin += 1200000; baseMax += 2400000;
    }

    if (users === '500-5000') {
      baseMin += 100000; baseMax += 200000;
    } else if (users === '5000+') {
      baseMin += 400000; baseMax += 800000;
    }

    baseMin += integrations * 40000;
    baseMax += integrations * 80000;

    if (mobileApp) {
      baseMin += 400000; baseMax += 800000;
    }

    setEstimatedCost({ min: baseMin, max: baseMax });
  }, [complexity, users, integrations, mobileApp]);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  // --- Inquiry Form State ---
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
          message: `SaaS Inquiry. Est Budget: ${formatCurrency(estimatedCost.min)} - ${formatCurrency(estimatedCost.max)}.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
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
          name: quickData.name || 'Quick SaaS Inquiry',
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
      q: "How long does it take to build a SaaS MVP?",
      a: "Typically, a robust Minimum Viable Product takes between 8 to 12 weeks from strategy phase to deployment, depending on feature complexity and integration requirements."
    },
    {
      q: "Do I own the source code?",
      a: "Absolutely. Upon final payment and project handover, you own 100% of the IP, source code, and assets associated with your platform."
    },
    {
      q: "Do you handle hosting and DevOps?",
      a: "Yes. We set up scalable cloud infrastructure (AWS, Vercel, Google Cloud) with continuous integration and continuous deployment (CI/CD) pipelines so your app scales effortlessly."
    },
    {
      q: "What tech stack do you use?",
      a: "We favor modern, high-performance stacks like React/Next.js for the frontend, Node.js/Express or Python for the backend, and PostgreSQL/MongoDB for databases, ensuring maximum scalability."
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20">
      <SEO 
        title="Custom SaaS Development Services | Kormyx"
        description="Architecting the next generation of SaaS platforms. We build scalable, high-performance cloud software for startups and enterprises."
        canonicalUrl="/services/saas-development"
        breadcrumbs={[{ name: "Services", url: "#" }, { name: "SaaS Development", url: "/services/saas-development" }]}
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
              <source src={saasVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 animate-fade-up max-w-7xl mx-auto w-full mt-8 md:mt-0">
            <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-8">
              Architecting the Next Generation of <span className="font-medium">SaaS Platforms</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-4xl mx-auto font-light leading-relaxed mb-12">
              We don't just write code. We engineer scalable, multi-tenant cloud architectures designed to acquire users, generate recurring revenue, and dominate verticals.
            </p>
            <button 
              onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mb-8"
            >
              Estimate Your Project
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

        {/* Top SaaS Logos / What is SaaS */}
        <section className="border-y border-gray-200 bg-white py-16 mb-24 md:mb-32 overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-12 relative z-10">
              <h3 className="text-xl md:text-2xl font-medium text-black mb-4">The Power of Software as a Service.</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                Industry leaders like these have proven that cloud-based subscriptions are the future. While these are independent platforms we admire, our team builds custom systems capable of reaching that same global scale.
              </p>
           </div>
           
           {/* Logo Ticker */}
           <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
             <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll">
               <li><img src={hubspotLogo} alt="Hubspot" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={stripeLogo} alt="Stripe" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={figmaLogo} alt="Figma" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={instantlyLogo} alt="Instantly" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={notionLogo} alt="Notion" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={shopifyLogo} alt="Shopify" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={slackLogo} alt="Slack" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={watiLogo} alt="Wati" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
               
               {/* Duplicates for infinite scroll effect */}
               <li><img src={hubspotLogo} alt="Hubspot" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={stripeLogo} alt="Stripe" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={figmaLogo} alt="Figma" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={instantlyLogo} alt="Instantly" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={notionLogo} alt="Notion" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={shopifyLogo} alt="Shopify" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={slackLogo} alt="Slack" className="h-14 md:h-20 object-contain opacity-80" loading="lazy" /></li>
               <li><img src={watiLogo} alt="Wati" className="h-12 md:h-16 object-contain opacity-80" loading="lazy" /></li>
             </ul>
           </div>
           
           <style>{`
             @keyframes infinite-scroll {
               from { transform: translateX(0); }
               to { transform: translateX(-50%); }
             }
             .animate-infinite-scroll {
               animation: infinite-scroll 30s linear infinite;
             }
           `}</style>
        </section>

        {/* The Kormyx Process Standards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Our Engineering <span className="font-medium">Standards</span></h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">A rigorous, step-by-step methodology ensuring security, scalability, and speed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Layout, title: "1. UI/UX Prototyping", desc: "We map out user journeys and build high-fidelity interactive prototypes in Figma before a single line of code is written." },
              { icon: Server, title: "2. Backend Architecture", desc: "Designing robust database schemas, secure authentication, and scalable APIs using Node.js, Postgres, and AWS." },
              { icon: Code, title: "3. Frontend Engineering", desc: "Building lightning-fast, responsive user interfaces with React and Next.js for flawless user experiences." },
              { icon: Database, title: "4. Multi-Tenant Logic", desc: "Implementing strict data isolation and tenant logic so thousands of users can operate securely on the same infrastructure." },
              { icon: ShieldCheck, title: "5. QA & Security", desc: "Rigorous automated testing, penetration testing, and compliance checks to guarantee enterprise-grade security." },
              { icon: Cloud, title: "6. DevOps & Launch", desc: "Setting up CI/CD pipelines for zero-downtime deployments and continuous monitoring post-launch." }
            ].map((step, idx) => (
              <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-8 hover:border-white/30 transition-colors">
                <step.icon className="text-white mb-6" size={32} />
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Estimation Calculator & Inquiry Form */}
        <section id="calculator" className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32 scroll-mt-32">
          <div className="bg-[#0A0A0A] border border-white/10 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left: Calculator */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
              <h2 className="text-3xl md:text-4xl font-medium mb-4">Project Estimator</h2>
              <p className="text-white/50 mb-10">Configure your requirements to get an instant rough estimate.</p>
              
              <div className="space-y-8">
                {/* Complexity */}
                <div>
                  <label className="block text-sm font-medium mb-4 uppercase tracking-widest text-white/70">App Complexity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['mvp', 'standard', 'enterprise'].map(level => (
                      <button 
                        key={level}
                        onClick={() => setComplexity(level)}
                        className={`py-3 text-sm font-medium transition-colors border ${complexity === level ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'} capitalize`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Users */}
                <div>
                  <label className="block text-sm font-medium mb-4 uppercase tracking-widest text-white/70">Expected Users (Year 1)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['0-500', '500-5000', '5000+'].map(u => (
                      <button 
                        key={u}
                        onClick={() => setUsers(u)}
                        className={`py-3 text-sm font-medium transition-colors border ${users === u ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'} capitalize`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integrations */}
                <div>
                  <label className="flex justify-between items-center text-sm font-medium mb-4 uppercase tracking-widest text-white/70">
                    <span>3rd Party Integrations</span>
                    <span className="text-white">{integrations}</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" max="10" 
                    value={integrations}
                    onChange={(e) => setIntegrations(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <p className="text-xs text-white/40 mt-2">Stripe, Twilio, SendGrid, CRMs, etc.</p>
                </div>

                {/* Mobile App */}
                <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5">
                   <div className="text-sm font-medium text-white/90">Include Native Mobile App (iOS/Android)?</div>
                   <button 
                     onClick={() => setMobileApp(!mobileApp)}
                     className={`w-12 h-6 rounded-full transition-colors relative ${mobileApp ? 'bg-white' : 'bg-white/20'}`}
                   >
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-transform ${mobileApp ? 'left-7' : 'left-1'}`}></div>
                   </button>
                </div>

              </div>

              <div className="mt-12 p-6 bg-black border border-white/10 text-center">
                 <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Estimated Investment</p>
                 <div className="text-3xl md:text-4xl lg:text-5xl font-light whitespace-nowrap overflow-hidden text-ellipsis">
                   {formatCurrency(estimatedCost.min)} - {formatCurrency(estimatedCost.max)}
                 </div>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 bg-black">
              <h3 className="text-2xl font-medium mb-4">Request a Precise Proposal</h3>
              <p className="text-white/50 mb-8 text-sm">Submit your project details below and our lead engineers will get back to you within 24 hours.</p>
              
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
                    placeholder="Tell us about the core problem your SaaS solves..."
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none placeholder:text-white/20"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-white text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mt-2"
                >
                  Submit Inquiry
                </button>
                {formStatus && <div className="text-center text-sm font-medium mt-2 text-[#E8B84A]">{formStatus}</div>}
              </form>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#0A0A0A] border border-white/10">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-lg pr-8">{faq.q}</span>
                  {openFaq === idx ? <Minus size={20} className="flex-shrink-0" /> : <Plus size={20} className="flex-shrink-0" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-white/60 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Link Block */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
           <div className="border border-white/10 bg-[#0A0A0A] p-12 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="max-w-xl">
                 <h3 className="text-2xl md:text-3xl font-medium mb-4">Want to learn more about SaaS architecture?</h3>
                 <p className="text-white/50 mb-6">Read our latest insights on scaling databases, handling auth, and growth hacking strategies.</p>
                 <a href="/blog" className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
                   Read our Blog <ArrowRight size={16} />
                 </a>
              </div>
              <div className="w-full md:w-auto">
                 <Cloud size={120} className="text-white/5 mx-auto" />
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default SaasDevelopment;
