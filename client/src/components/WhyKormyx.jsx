import React from 'react';

const WhyKormyx = () => {
  return (
    <section id="approach" className="section-spacing bg-cinematic-secondary">
      <div className="max-w-5xl">
        <h2 className="text-sm uppercase tracking-[0.2em] text-cinematic-muted mb-12">Our Philosophy</h2>
        <h3 className="text-submassive leading-tight text-cinematic-text mb-12">
          Technology should be invisible. <br className="hidden md:block"/>
          <span className="text-cinematic-muted">The experience is what remains.</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32">
          <div>
            <h4 className="text-2xl font-light mb-6">Radical Simplicity</h4>
            <p className="text-body-cinematic">
              We strip away the unnecessary. Every pixel, every interaction, and every line of code serves a singular purpose: to connect with the user.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-light mb-6">Emotional Resonance</h4>
            <p className="text-body-cinematic">
              Logic builds the foundation, but emotion drives action. We design digital environments that feel as good as they function.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyKormyx;
