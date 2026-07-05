import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, Smartphone, Layers, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Assets
import appDevVideo from '../assets/SAAS.mp4'; // Using SAAS video as it fits tech/app dev

const AppDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Cost Calculator State ---
  const [platform, setPlatform] = useState('cross-platform'); // ios, android, cross-platform
  const [screens, setScreens] = useState('1-5'); // 1-5, 5-15, 15+
  const [auth, setAuth] = useState('standard'); // standard, biometrics, enterprise
  const [estimatedCost, setEstimatedCost] = useState({ min: 250000, max: 500000 });

  useEffect(() => {
    let baseMin = 200000;
    let baseMax = 400000;

    // Platform
    if (platform === 'ios' || platform === 'android') {
      baseMin += 50000; baseMax += 100000;
    } else if (platform === 'cross-platform') {
      baseMin += 150000; baseMax += 300000;
    }

    // Screens
    if (screens === '5-15') {
      baseMin += 100000; baseMax += 200000;
    } else if (screens === '15+') {
      baseMin += 300000; baseMax += 600000;
    }

    // Auth
    if (auth === 'biometrics') {
      baseMin += 50000; baseMax += 100000;
    } else if (auth === 'enterprise') {
      baseMin += 150000; baseMax += 300000;
    }

    setEstimatedCost({ min: baseMin, max: baseMax });
  }, [platform, screens, auth]);

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
          message: `App Dev Inquiry. Est Budget: ${formatCurrency(estimatedCost.min)} - ${formatCurrency(estimatedCost.max)}.\nPhone: ${formData.phone}\nCompany: ${formData.company}\nDetails: ${formData.details}`
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
          name: quickData.name || 'Quick App Dev Inquiry',
          email: quickData.email,
          message: `Quick Inquiry from App Hero.\nPhone: ${quickData.phone}\nCompany: ${quickData.company}`
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
      question: "Do you build native or cross-platform apps?",
      answer: "We specialize in both. For startups moving fast, we leverage React Native for highly performant cross-platform applications. For enterprise products requiring deep OS integration, we build natively in Swift and Kotlin."
    },
    {
      question: "How does Kormyx ensure mobile app security?",
      answer: "Every application engineered by Kormyx undergoes rigorous penetration testing. We implement biometric authentication flows, secure enclave keychain storage, and strict end-to-end encryption to protect user data."
    },
    {
      question: "Do you assist with App Store approvals?",
      answer: "Yes, our team handles the complete deployment pipeline. From provisioning profiles to App Store Connect metadata optimization, Kormyx ensures a frictionless approval process for both iOS and Android."
    },
    {
      question: "Can my app scale to millions of users?",
      answer: "Absolutely. We design the backend infrastructure (using AWS/GCP and Node.js/Go) concurrently with the mobile app, ensuring your architecture handles massive concurrency and horizontal scaling from day one."
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Helmet>
        <title>Mobile App Development Services | Kormyx</title>
        <meta name="description" content="Kormyx engineers iOS, Android, and cross-platform mobile applications designed for mass adoption, extreme performance, and intuitive UX." />
        <link rel="canonical" href="https://kormyx.com/services/app-development" />
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
              className="w-full h-full object-cover opacity-20"
            >
              <source src={appDevVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 animate-fade-up max-w-7xl mx-auto w-full mt-8 md:mt-0">
            <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-8">
              Mobile Applications Engineered <br className="hidden md:block"/> for <span className="font-medium">Market Dominance</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-4xl mx-auto font-light leading-relaxed mb-12">
              Kormyx designs and deploys ultra-fast, native-feeling mobile experiences. We don't just build apps; we create digital ecosystems that live in the pockets of millions.
            </p>
            <button 
              onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mb-8"
            >
              Calculate Project Cost
            </button>

            <div className="mt-2 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Fast-Track Your App Idea</p>
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

        {/* Content Section: Architecture */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Mobile-First <span className="font-medium">Architectures.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Every Kormyx application is built on a foundation of performance, security, and scalability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0A0A0A] border border-white/5 p-8 hover:border-white/20 transition-all hover:-translate-y-1">
              <Smartphone size={32} className="mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">Native Performance</h3>
              <p className="text-white/50 text-sm leading-relaxed">Whether React Native or Swift, we achieve 60fps animations and instant interaction response times.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-8 hover:border-white/20 transition-all hover:-translate-y-1">
              <Layers size={32} className="mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">Offline-First</h3>
              <p className="text-white/50 text-sm leading-relaxed">Sophisticated local caching and background syncing ensure your app works flawlessly without a connection.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-8 hover:border-white/20 transition-all hover:-translate-y-1">
              <ShieldCheck size={32} className="mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">Bank-Grade Security</h3>
              <p className="text-white/50 text-sm leading-relaxed">Encrypted local storage, biometric auth, and secure API gateways protect your users unconditionally.</p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-8 hover:border-white/20 transition-all hover:-translate-y-1">
              <Zap size={32} className="mb-6 opacity-80" />
              <h3 className="text-xl font-medium mb-3">API Ecosystems</h3>
              <p className="text-white/50 text-sm leading-relaxed">Seamlessly integrate with Stripe, Mapbox, Firebase, and proprietary backend services.</p>
            </div>
          </div>
        </section>

        {/* Cost Estimation Calculator Section */}
        <section id="calculator" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Transparent <span className="font-medium">Pricing.</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Determine the baseline investment required to engineer your mobile application.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Calculator Controls */}
            <div className="space-y-10">
              
              {/* Platform */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Target Platform</label>
                <div className="grid grid-cols-3 gap-1 bg-[#111] p-1 rounded-sm">
                  {['iOS', 'Android', 'Cross-Platform'].map((type) => {
                    const value = type.toLowerCase().replace('-', '');
                    const isSelected = platform === value || (value === 'crossplatform' && platform === 'cross-platform');
                    return (
                      <button
                        key={value}
                        onClick={() => setPlatform(value === 'crossplatform' ? 'cross-platform' : value)}
                        className={`w-full py-3 text-xs md:text-sm font-medium transition-colors ${isSelected ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Screens */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Complexity (Screens/Flows)</label>
                <div className="flex bg-[#111] p-1 rounded-sm">
                  {['1-5', '5-15', '15+'].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setScreens(scale)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${screens === scale ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security/Auth */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-4">Security & Authentication</label>
                <div className="flex bg-[#111] p-1 rounded-sm">
                  {['Standard', 'Biometrics', 'Enterprise'].map((fidelity) => (
                    <button
                      key={fidelity.toLowerCase()}
                      onClick={() => setAuth(fidelity.toLowerCase())}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${auth === fidelity.toLowerCase() ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
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
              <p className="text-white/50 mb-8 text-sm">Submit your app requirements below and our lead mobile engineers will get back to you within 24 hours.</p>
              
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
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">App Details</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                    placeholder="Tell us about the core functionality, target audience, and timeframe..."
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

export default AppDevelopment;
