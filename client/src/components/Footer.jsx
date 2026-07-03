import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('Submitting...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          message: 'Signed up via the footer newsletter form.'
        }),
      });
      if (response.ok) {
        setStatus('Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };
  return (
    <footer className="bg-black text-white pt-24 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between gap-8 md:gap-16 mb-12 md:mb-24">
        
        {/* Left Section: Logo & Brand */}
        <div className="flex flex-col justify-between max-w-sm lg:w-1/3 mb-12 lg:mb-0">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-white/90 mb-6">
              A website makes it real
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-[280px]">
              <label className="text-xs text-white/60 font-medium">
                Sign up for our newsletter:
              </label>
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="bg-white/10 text-white text-sm px-3 py-2 rounded-none border border-white/20 focus:outline-none focus:border-white/50 w-full placeholder:text-white/30"
                  required
                />
                <button type="submit" className="bg-white text-black px-4 py-2 rounded-none text-sm font-bold hover:bg-gray-200 transition-colors">
                  Subscribe
                </button>
              </div>
              {status && <p className="text-xs text-[#E8B84A] mt-1">{status}</p>}
            </form>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 lg:w-2/3">
          
          {/* Column 1: Products */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white mb-2">Products</h4>
            <Link to="/products/website-templates" className="text-sm text-white/60 hover:text-white transition-colors">Website Templates</Link>
            <Link to="/products/websites" className="text-sm text-white/60 hover:text-white transition-colors">Websites</Link>
            <Link to="/products/domains" className="text-sm text-white/60 hover:text-white transition-colors">Domains</Link>
            <Link to="/products/ai-website-builder" className="text-sm text-white/60 hover:text-white transition-colors">AI Website Builder</Link>
            <Link to="/products/design-intelligence" className="text-sm text-white/60 hover:text-white transition-colors">Design Intelligence</Link>
            <Link to="/products/online-stores" className="text-sm text-white/60 hover:text-white transition-colors">Online Stores</Link>
            <Link to="/products/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link>
            <Link to="/products/invoicing" className="text-sm text-white/60 hover:text-white transition-colors">Invoicing</Link>
            <Link to="/products/scheduling" className="text-sm text-white/60 hover:text-white transition-colors">Scheduling</Link>
            <Link to="/products/content-memberships" className="text-sm text-white/60 hover:text-white transition-colors">Content & Memberships</Link>
            <Link to="/products/donations" className="text-sm text-white/60 hover:text-white transition-colors">Donations</Link>
            <Link to="/products/payments" className="text-sm text-white/60 hover:text-white transition-colors">Payments</Link>
            <Link to="/products/marketing-tools" className="text-sm text-white/60 hover:text-white transition-colors">Marketing Tools</Link>
            <Link to="/products/professional-email" className="text-sm text-white/60 hover:text-white transition-colors">Professional Email</Link>
            <Link to="/products/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
          </div>

          {/* Column 2: Solutions & Resources */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">Solutions</h4>
              <Link to="/solutions/creative-services" className="text-sm text-white/60 hover:text-white transition-colors">Creative Services</Link>
              <Link to="/solutions/professional-services" className="text-sm text-white/60 hover:text-white transition-colors">Professional Services</Link>
              <Link to="/solutions/education-training" className="text-sm text-white/60 hover:text-white transition-colors">Education & Training</Link>
              <Link to="/solutions/beauty" className="text-sm text-white/60 hover:text-white transition-colors">Beauty</Link>
              <Link to="/solutions/sports-fitness" className="text-sm text-white/60 hover:text-white transition-colors">Sports & Fitness</Link>
              <Link to="/solutions/health-wellness" className="text-sm text-white/60 hover:text-white transition-colors">Health & Wellness</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">Resources</h4>
              <Link to="/resources/customer-examples" className="text-sm text-white/60 hover:text-white transition-colors">Customer Examples</Link>
              <Link to="/resources/extensions" className="text-sm text-white/60 hover:text-white transition-colors">Extensions</Link>
              <Link to="/resources/free-tools" className="text-sm text-white/60 hover:text-white transition-colors">Free Tools</Link>
              <Link to="/resources/logo-maker" className="text-sm text-white/60 hover:text-white transition-colors">Logo Maker</Link>
            </div>
          </div>

          {/* Column 3: From Kormyx & Support */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">From Kormyx</h4>
              <Link to="/from-kormyx/acuity-scheduling" className="text-sm text-white/60 hover:text-white transition-colors">Acuity Scheduling</Link>
              <Link to="/from-kormyx/bio-sites" className="text-sm text-white/60 hover:text-white transition-colors">Bio Sites</Link>
              <Link to="/from-kormyx/unfold" className="text-sm text-white/60 hover:text-white transition-colors">Unfold</Link>
              <Link to="/from-kormyx/email-campaigns" className="text-sm text-white/60 hover:text-white transition-colors">Email Campaigns</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">Support</h4>
              <Link to="/support/help-center" className="text-sm text-white/60 hover:text-white transition-colors">Help Center</Link>
              <Link to="/support/forum" className="text-sm text-white/60 hover:text-white transition-colors">Forum</Link>
              <Link to="/support/webinars" className="text-sm text-white/60 hover:text-white transition-colors">Webinars</Link>
              <Link to="/support/hire-an-expert" className="text-sm text-white/60 hover:text-white transition-colors">Hire an Expert</Link>
              <Link to="/support/developer-platform" className="text-sm text-white/60 hover:text-white transition-colors">Developer Platform</Link>
            </div>
          </div>

          {/* Column 4: Company & Follow */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">Company</h4>
              <Link to="/company/about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
              <Link to="/company/careers" className="text-sm text-white/60 hover:text-white transition-colors">Careers</Link>
              <Link to="/company/our-brand" className="text-sm text-white/60 hover:text-white transition-colors">Our Brand</Link>
              <Link to="/company/accessibility" className="text-sm text-white/60 hover:text-white transition-colors">Accessibility</Link>
              <Link to="/company/press-media" className="text-sm text-white/60 hover:text-white transition-colors">Press & Media</Link>
              <Link to="/company/contact-us" className="text-sm text-white/60 hover:text-white transition-colors">Contact Us</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white mb-2">Follow</h4>
              <Link to="/follow/instagram" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</Link>
              <Link to="/follow/youtube" className="text-sm text-white/60 hover:text-white transition-colors">YouTube</Link>
              <Link to="/follow/linkedin" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</Link>
              <Link to="/follow/x" className="text-sm text-white/60 hover:text-white transition-colors">X</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-2xl mx-auto border-t border-white/20 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Localization Toggles */}
        <div className="flex items-center gap-6">
          <button className="flex items-center text-sm text-white/90 hover:text-white transition-colors">
            <Globe size={16} className="mr-2" />
            English <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="flex items-center text-sm text-white/90 hover:text-white transition-colors">
            ₹ INR <ChevronDown size={14} className="ml-1" />
          </button>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
           <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">Terms</a>
           <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">Privacy</a>
           <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">Security Measures</a>
           <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">Sitemap</a>
           <span className="text-xs text-white/40">&copy; 2003-{new Date().getFullYear()} Kormyx, Inc.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
