import React from 'react';

const Process = () => {
  const steps = [
    { title: 'Discover', description: 'We dive deep into your business needs and project goals.' },
    { title: 'Design', description: 'Creating intuitive UI/UX that delights your users.' },
    { title: 'Develop', description: 'Building robust, scalable code using modern tech stacks.' },
    { title: 'Deploy', description: 'Launching your product and providing ongoing support.' },
  ];

  return (
    <section className="py-24 bg-surface-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.1" />
           <path d="M0,70 Q25,20 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Process</h2>
          <p className="text-surface-300 text-lg">
            A structured approach to turning your vision into a successful digital product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-surface-800 border-4 border-surface-900 shadow-xl flex items-center justify-center text-3xl font-bold text-primary mb-8 group-hover:scale-110 transition-transform duration-300 relative">
                 <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-0 group-hover:opacity-100"></div>
                 {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-surface-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
