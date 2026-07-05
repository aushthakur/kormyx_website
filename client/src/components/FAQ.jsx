import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What Does a Digital Marketing Agency Actually Do for Your Business?",
      answer: "A full-service digital marketing agency acts as your strategic growth partner. We handle everything from brand positioning and SEO to content creation and paid advertising. Our primary goal is to increase your online visibility, drive targeted traffic to your website, and ultimately convert those visitors into paying customers or high-quality leads."
    },
    {
      question: "How Much Does Digital Marketing Cost for Small Businesses?",
      answer: "Digital marketing costs vary widely based on your goals, competition, and the channels used. We offer tailored packages that ensure maximum ROI for your specific budget. Most small to medium businesses allocate between $1,000 to $5,000 per month for comprehensive services, but we also provide custom project-based pricing to fit your immediate needs."
    },
    {
      question: "How Do I Choose a Website Design and Development Company?",
      answer: "When selecting a development partner, look for a strong portfolio, transparent communication, and a focus on both aesthetics and performance. A great agency won't just build a pretty site; they will build a high-performing, SEO-optimized platform designed specifically to achieve your business objectives and provide a seamless user experience."
    },
    {
      question: "What Makes a High-Converting Website Design?",
      answer: "High-converting websites combine stunning visuals with strategic user experience (UX) design. Key elements include fast load times, mobile responsiveness, clear calls-to-action (CTAs), intuitive navigation, and compelling copy that directly addresses your target audience's pain points. Every element should guide the user toward a specific goal."
    },
    {
      question: "How Long Does It Take to See Results from Digital Marketing?",
      answer: "While paid advertising (PPC) can generate immediate traffic and leads, organic strategies like SEO and content marketing typically take 3 to 6 months to show significant momentum. We focus on a hybrid approach, providing you with quick wins while simultaneously building a strong foundation for long-term, sustainable growth."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-black py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Common <span className="text-white/50">Questions</span></h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/10 bg-[#050505] transition-colors duration-300 animate-fade-up ${openIndex === index ? 'border-white/30' : 'hover:border-white/20'}`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <button 
                className="w-full text-left flex justify-between items-center p-6 md:p-8 bg-transparent border-none text-white text-lg md:text-xl font-medium cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown 
                  className={`text-white/50 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              <div 
                className="overflow-hidden transition-all duration-300" 
                style={{ 
                  maxHeight: openIndex === index ? '300px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <p className="px-6 md:px-8 pb-6 md:pb-8 text-white/60 leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
