import React from 'react';
import { Search, PenTool, Layout, BarChart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Search Engine Optimization",
      description: "Data-driven SEO strategies to improve your organic visibility and drive high-quality traffic to your website.",
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Content Marketing",
      description: "Compelling, audience-focused content that builds brand authority and nurtures leads through the funnel.",
      icon: <PenTool className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Web Design & Development",
      description: "Fast, responsive, and conversion-optimized websites built on modern tech stacks.",
      icon: <Layout className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Paid Media",
      description: "Highly targeted ad campaigns across Google, Meta, and LinkedIn to maximize your ROI.",
      icon: <BarChart className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-[#18181b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-6">
            Capabilities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            We offer end-to-end digital solutions designed to help ambitious brands scale efficiently and sustainably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-[#27272a] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
