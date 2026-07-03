import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, Loader2 } from 'lucide-react';
import saasImg from '../assets/saasservices.png';
import webImg from '../assets/DigitalMarkeing&Branding.png';
import logoBlack from '../assets/logoblack.png';

const QuestionnaireModal = ({ isOpen, onClose, serviceType }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ answers: [], contact: { name: '', email: '' } });
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({ answers: [], contact: { name: '', email: '' } });
      setCurrentAnswer('');
      setSubmitted(false);
      setIsSubmitting(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const questions = {
    web: [
      {
        question: "What's your site about?",
        options: ["E-commerce", "Portfolio", "Corporate", "Blog", "Other"],
        subtitle: "We'll tailor content and advice to your site needs."
      },
      {
        question: "What are your primary goals?",
        options: ["Sell products", "Generate leads", "Build brand awareness", "Share information"],
        subtitle: "This helps us structure your user journey."
      }
    ],
    saas: [
      {
        question: "What industry is your SaaS targeting?",
        options: ["Healthcare", "Real Estate", "Finance", "General B2B", "Other"],
        subtitle: "We'll adapt the architecture to your industry standards."
      },
      {
        question: "What core features do you need?",
        options: ["User Dashboards", "Payment Integration", "AI/Machine Learning", "Data Analytics"],
        subtitle: "Select the most critical capability for your MVP."
      }
    ]
  };

  const currentQuestions = questions[serviceType] || questions.web;
  const isContactStep = step > currentQuestions.length;

  const handleNext = async () => {
    if (isContactStep) {
      // Submit
      setIsSubmitting(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/project-query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceType,
            answers: formData.answers,
            contactInfo: formData.contact
          })
        });
        
        if (response.ok) {
          setSubmitted(true);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to connect to the server.");
      }
      setIsSubmitting(false);
    } else {
      // Save answer and go to next step
      if (currentAnswer) {
        setFormData(prev => ({
          ...prev,
          answers: [...prev.answers, { question: currentQuestions[step - 1].question, answer: currentAnswer }]
        }));
        setCurrentAnswer('');
        setStep(step + 1);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setCurrentAnswer(option);
  };

  const rightImage = serviceType === 'saas' ? saasImg : webImg;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="w-full max-w-6xl h-[95vh] md:h-[800px] max-h-[100vh] bg-white rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Top Right Controls (Mobile absolute, Desktop flex) */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-6">
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide drop-shadow-md">
            I'M JUST BROWSING
          </button>
          <button onClick={onClose} className="text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-md transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Left Side: Form Content */}
        <div className="w-full md:w-1/2 min-h-[500px] md:h-full bg-white p-6 sm:p-8 md:p-16 flex flex-col relative z-10">
          
          <div className="flex items-center mb-16">
            <img src={logoBlack} alt="Kormyx" className="h-8 md:h-10 w-auto" />
          </div>

          <div className="flex-grow flex flex-col justify-center max-w-md">
            {submitted ? (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-serif text-black mb-4">You're all set!</h2>
                <p className="text-gray-500 mb-8">
                  Our team has received your {serviceType === 'saas' ? 'SaaS' : 'Web'} development query. We'll be in touch shortly to discuss the next steps.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-black text-white px-8 py-4 rounded-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            ) : isContactStep ? (
              <div className="animate-in slide-in-from-right-8 duration-300">
                <h2 className="text-3xl font-medium text-black mb-2">Let's get in touch</h2>
                <p className="text-gray-500 mb-8 text-sm">Where should we send your tailored proposal?</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.contact.name}
                      onChange={(e) => setFormData(prev => ({...prev, contact: {...prev.contact, name: e.target.value}}))}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.contact.email}
                      onChange={(e) => setFormData(prev => ({...prev, contact: {...prev.contact, email: e.target.value}}))}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-8 duration-300" key={step}>
                <h2 className="text-3xl font-medium text-black mb-2">{currentQuestions[step-1].question}</h2>
                <p className="text-gray-500 mb-8 text-sm">{currentQuestions[step-1].subtitle}</p>
                
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
                  <div className="px-4 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Options
                  </div>
                  <ul className="flex flex-col">
                    {currentQuestions[step-1].options.map((opt) => (
                      <li key={opt}>
                        <button 
                          onClick={() => handleOptionSelect(opt)}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-md ${currentAnswer === opt ? 'bg-black text-white font-medium' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {!submitted && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                {/* Progress indicators */}
                {[...Array(currentQuestions.length + 1)].map((_, i) => (
                  <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i < step ? 'bg-black' : 'bg-gray-200'}`} />
                ))}
              </div>
              <button 
                onClick={handleNext}
                disabled={(!isContactStep && !currentAnswer) || (isContactStep && (!formData.contact.name || !formData.contact.email)) || isSubmitting}
                className="bg-black text-white px-8 py-3 rounded-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (isContactStep ? 'Submit' : 'Next')} 
                {!isSubmitting && !isContactStep && <ChevronRight size={18} />}
              </button>
            </div>
          )}

        </div>

        {/* Right Side: Image */}
        <div className="hidden md:block w-1/2 h-full bg-gray-100 relative">
          <img src={rightImage} alt="Showcase" className="w-full h-full object-cover grayscale opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20"></div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default QuestionnaireModal;
