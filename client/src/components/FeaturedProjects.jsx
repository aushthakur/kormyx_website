import React, { useEffect, useRef } from 'react';

const FeaturedProjects = () => {
  const projects = [
    {
      title: "Elevating the digital presence of Lumina.",
      client: "Lumina",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
      title: "Redefining commerce for Vertex.",
      client: "Vertex",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section id="work" className="section-spacing bg-cinematic-bg">
      <div className="mb-24 md:mb-40">
        <h2 className="text-sm uppercase tracking-[0.2em] text-cinematic-muted mb-6">Selected Work</h2>
        <h3 className="text-submassive max-w-4xl leading-tight">
          We partner with visionaries to build category-defining experiences.
        </h3>
      </div>

      <div className="flex flex-col gap-32 md:gap-48">
        {projects.map((project, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 group`}>
            
            <div className="w-full md:w-3/5 overflow-hidden rounded-sm">
              <img 
                src={project.image} 
                alt={project.client} 
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            <div className="w-full md:w-2/5">
              <p className="text-sm tracking-widest uppercase text-cinematic-muted mb-6">{project.client}</p>
              <h4 className="text-3xl md:text-5xl font-light leading-tight mb-10 transition-colors duration-500 group-hover:text-cinematic-accent">
                {project.title}
              </h4>
              <a href="#" className="inline-block border-b border-cinematic-text/30 hover:border-cinematic-text pb-2 uppercase tracking-widest text-sm transition-all duration-300">
                View Project
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
