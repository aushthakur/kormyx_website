import React from 'react';

const Testimonials = () => {
  return (
    <section className="section-spacing bg-cinematic-secondary">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-3xl md:text-5xl font-light leading-tight mb-16 italic text-cinematic-muted">
          "Working with Kormyx felt less like hiring an agency and more like finding a partner who genuinely cares about our vision as much as we do."
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover grayscale" />
          </div>
          <p className="text-sm uppercase tracking-widest text-cinematic-text">Elena Rostova</p>
          <p className="text-xs uppercase tracking-widest text-cinematic-muted">CEO, Vertex</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
