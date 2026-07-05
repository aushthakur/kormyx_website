import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, CalendarPlus, ChevronRight, Briefcase, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleCalendarLogo from '../assets/gooogle-calender-logo.jpeg';

const ScheduleModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    selectedServices: []
  });
  
  const [currentService, setCurrentService] = useState({
    service: '',
    subService: ''
  });
  
  const [status, setStatus] = useState('idle');

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const serviceOptions = {
    'SaaS Development': ['Architecture', 'MVP Build', 'Scaling & Ops'],
    'Web Development': ['Corporate Site', 'E-commerce', 'Web App'],
    'App Development': ['iOS Native', 'Android Native', 'Cross-Platform'],
    'Digital Marketing': ['SEO', 'Paid Ads', 'Social Media Management'],
    'Brand Positioning': ['Brand Identity', 'Market Strategy', 'Rebranding']
  };

  const generateCalendarUrl = () => {
    if (!formData.date || !formData.time) return '#';
    let [time, modifier] = formData.time.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = (parseInt(hours, 10) + 12).toString();
    
    const startStr = `${formData.date.replace(/-/g, '')}T${hours.padStart(2, '0')}${minutes}00Z`;
    const endHour = (parseInt(hours, 10) + 1).toString();
    const endStr = `${formData.date.replace(/-/g, '')}T${endHour.padStart(2, '0')}${minutes}00Z`;

    const serviceList = formData.selectedServices.map(s => `${s.service} (${s.subService})`).join(', ');
    const title = encodeURIComponent(`Strategy Meeting: Kormyx`);
    const details = encodeURIComponent(`Discovery call booked via Kormyx.\n\nRequested Services:\n${serviceList}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startStr}/${endStr}`;
  };

  const handleAddService = () => {
    if (currentService.service && currentService.subService) {
      setFormData({
        ...formData,
        selectedServices: [...formData.selectedServices, currentService]
      });
      setCurrentService({ service: '', subService: '' });
    }
  };

  const handleRemoveService = (index) => {
    const updated = [...formData.selectedServices];
    updated.splice(index, 1);
    setFormData({ ...formData, selectedServices: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Auto-add the currently selected service if they forgot to click '+'
    const finalServices = [...formData.selectedServices];
    if (currentService.service && currentService.subService) {
      finalServices.push(currentService);
    }

    if (finalServices.length === 0) {
       alert("Please add at least one service.");
       return;
    }

    setStatus('submitting');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectedServices: finalServices })
      });
      
      if (response.ok) {
        setStatus('success');
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-[#050505] text-white border border-white/10 rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden font-sans my-8 max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <X size={24} />
          </button>

          {/* Left Panel: Branding & Details */}
          <div className="md:w-5/12 bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Let's discuss your next breakthrough.</h2>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                Schedule a one-on-one discovery call with our experts. We'll dive deep into your architecture, market positioning, and technical strategy.
              </p>
            </div>

            <div className="mt-8 md:mt-auto border border-white/10 rounded-sm p-6 relative overflow-hidden flex items-center gap-6">
              <img src={GoogleCalendarLogo} alt="Google Calendar" className="h-16 md:h-20 object-contain" />
              <div>
                <p className="text-white/50 font-bold uppercase tracking-widest text-[10px] mb-1">
                  Powered By
                </p>
                <p className="text-white/80 text-xs leading-relaxed">
                  Meetings sync directly to your workspace. Secure, encrypted, and seamless.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Form Area */}
          <div className="md:w-7/12 p-8 md:p-12 relative h-full overflow-y-auto custom-scrollbar">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-ping opacity-20"></div>
                  <CalendarPlus size={40} className="text-white" />
                </div>
                <h3 className="text-4xl font-light mb-4">Slot Secured.</h3>
                <p className="text-white/60 mb-10 max-w-sm mx-auto">Your strategy session has been booked. A calendar invite has been dispatched to {formData.email}.</p>
                
                <a 
                  href={generateCalendarUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all"
                >
                  <Calendar size={20} /> 
                  <span>Add to Google Calendar</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Selected Services Display */}
                  {formData.selectedServices.length > 0 && (
                    <div className="col-span-1 md:col-span-2 space-y-3 mb-2">
                      <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Added Services</label>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedServices.map((srv, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm flex items-center gap-3">
                            <div className="text-sm">
                              <span className="font-bold text-white">{srv.service}</span>
                              <span className="text-white/50 text-xs ml-2">({srv.subService})</span>
                            </div>
                            <button type="button" onClick={() => handleRemoveService(idx)} className="text-red-400 hover:text-red-300">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Service Selection */}
                  <div className="col-span-1 md:col-span-2 bg-[#0A0A0A] p-6 border border-white/5 rounded-sm space-y-4">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Add Service to Meeting</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <select 
                          value={currentService.service}
                          onChange={(e) => setCurrentService({ service: e.target.value, subService: '' })}
                          className="w-full bg-[#050505] border border-white/10 text-white rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors appearance-none text-sm"
                        >
                          <option value="" disabled>Select Primary Service</option>
                          {Object.keys(serviceOptions).map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {currentService.service && (
                        <div className="flex gap-2">
                          <select 
                            value={currentService.subService}
                            onChange={(e) => setCurrentService({ ...currentService, subService: e.target.value })}
                            className="flex-1 bg-[#050505] border border-white/10 text-white rounded-sm py-4 px-4 focus:outline-none focus:border-white/40 transition-colors appearance-none text-sm"
                          >
                            <option value="" disabled>Select Focus Area</option>
                            {serviceOptions[currentService.service].map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                          <button 
                            type="button"
                            onClick={handleAddService}
                            disabled={!currentService.subService}
                            className="bg-white text-black px-4 rounded-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input 
                        type="text" 
                        name="name" 
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input 
                        type="date" 
                        name="date" 
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors [&::-webkit-calendar-picker-indicator]:invert opacity-90 text-sm"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-1">Time (EST)</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <select 
                        name="time" 
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full bg-[#0A0A0A] border border-white/10 text-white rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-white/40 transition-colors appearance-none text-sm"
                      >
                        <option value="" disabled>Select Slot</option>
                        {availableTimes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-4">System error. Please try again or contact support.</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full mt-8 bg-white text-black font-bold uppercase tracking-widest text-sm py-5 rounded-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === 'submitting' ? 'Processing...' : 'Confirm Strategy Session'}
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
