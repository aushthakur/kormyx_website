import React from 'react';

const Results = () => {
  const metrics = [
    { value: "$2B+", label: "Client Revenue Generated" },
    { value: "40%", label: "Average Conversion Increase" },
    { value: "0", label: "Compromises on Quality" }
  ];

  return (
    <section className="section-spacing bg-cinematic-bg border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
        {metrics.map((metric, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-7xl md:text-8xl font-light text-cinematic-text mb-6">
              {metric.value}
            </span>
            <span className="text-sm uppercase tracking-widest text-cinematic-muted">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Results;
