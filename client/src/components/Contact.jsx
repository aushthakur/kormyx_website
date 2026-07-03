import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'SEO',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'SEO', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-blue-50 dark:bg-blue-900/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-6">
            Ready to scale? <br/> Let's talk.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light mb-8 max-w-md">
            Whether you need a complete website overhaul or a targeted SEO campaign, our team is ready to help you achieve your goals.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                📍
              </div>
              <p className="text-gray-700 dark:text-gray-300">123 Agency Ave, NY 10001</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                ✉️
              </div>
              <p className="text-gray-700 dark:text-gray-300">hello@kormyx.agency</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interested In</label>
              <select 
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="SEO">SEO & Content</option>
                <option value="Web Design">Web Design</option>
                <option value="Paid Media">Paid Media</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-[#27272a] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-md font-medium transition-colors"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <p className="text-green-600 text-sm text-center">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 text-sm text-center">An error occurred. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
