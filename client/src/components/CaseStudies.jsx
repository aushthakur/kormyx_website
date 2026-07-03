import React from 'react';

const CaseStudies = () => {
  const cases = [
    {
      client: "TechFlow",
      category: "SEO & Content",
      title: "Increasing organic traffic by 300% in 6 months",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
      client: "Lumina Retail",
      category: "Web Design",
      title: "A modern ecommerce experience boosting conversions by 45%",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop"
    },
    {
      client: "Vertex Capital",
      category: "Paid Media",
      title: "Lowering CAC by 60% through targeted B2B campaigns",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="work" className="py-24 bg-white dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-6">
              Selected Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              We partner with forward-thinking companies to deliver measurable results. Here are a few of our favorite success stories.
            </p>
          </div>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
            View All Case Studies &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <a key={index} href="#" className="group block">
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.client}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.category}</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
