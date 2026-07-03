import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      question: "How does Kormyx ensure data security?",
      answer: "Kormyx implements a zero-trust architecture with end-to-end encryption, regular third-party audits, and SOC 2 Type II compliance to ensure your data is always protected at the highest standards."
    },
    {
      question: "Can Kormyx integrate with our existing legacy systems?",
      answer: "Yes, our robust API and enterprise SDKs are specifically designed to bridge the gap between legacy infrastructure and modern edge-computing capabilities without disrupting your operations."
    },
    {
      question: "What is the typical timeline for deployment?",
      answer: "While enterprise deployments vary, our dedicated integration team typically completes full integration within 4-6 weeks, allowing you to see ROI much faster than traditional solutions."
    },
    {
      question: "How does pricing work for enterprise clients?",
      answer: "We offer custom volume-based pricing tailored to your specific architectural needs, usage patterns, and support requirements. Contact our sales team for a precise quote."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding faq-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Common <span className="gold-gradient-text">Inquiries</span></h2>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass-panel ${openIndex === index ? 'open' : ''} animate-fade-up`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`faq-icon ${openIndex === index ? 'rotate' : ''}`} 
                  size={24} 
                />
              </button>
              <div 
                className="faq-answer-wrapper" 
                style={{ 
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
