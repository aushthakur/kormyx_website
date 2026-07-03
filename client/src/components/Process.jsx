import React from 'react';

const Process = () => {
  const steps = [
    { num: '01', title: 'Discovery' },
    { num: '02', title: 'Strategy' },
    { num: '03', title: 'Design' },
    { num: '04', title: 'Execution' }
  ];

  return (
    <section className="section-spacing bg-cinematic-bg border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-24">
        <h2 className="text-submassive mb-8 md:mb-0">How we work</h2>
        <p className="text-body-cinematic max-w-sm">A rigorous, structured approach to creative problem-solving.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="border-t border-white/20 pt-8 group cursor-default">
            <span className="text-xs uppercase tracking-widest text-cinematic-muted block mb-16 transition-colors duration-300 group-hover:text-cinematic-accent">{step.num}</span>
            <h3 className="text-3xl font-light">{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
