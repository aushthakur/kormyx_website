import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScheduleModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState('idle');

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', date: '', time: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-black text-white border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="text-2xl font-light tracking-tight">Book a Meeting</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar size={32} />
                </div>
                <h3 className="text-2xl font-light mb-2">Meeting Scheduled!</h3>
                <p className="text-gray-400">Check your email for the Google Calendar invite.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      name="email" 
                      required
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="date" 
                      name="date" 
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>

                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select 
                      name="time" 
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-white transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Time</option>
                      {availableTimes.map(t => (
                        <option key={t} value={t} className="bg-gray-900">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">There was an error scheduling your meeting. Please try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black font-medium py-4 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Scheduling...' : 'Confirm Meeting'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScheduleModal;
