import React from 'react';
import Button from '@/components/Button';

const CTA = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem]">
          <h2 className="text-4xl md:text-7xl font-bold text-surface-900 mb-8 leading-tight">
            Ready to Build Your <span className="text-primary/40">Next Big Thing?</span>
          </h2>
          <p className="text-secondary text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you’re a startup looking for an MVP or an enterprise needing a custom system, we’re here to help you scale.
          </p>
          <div className="flex flex-row items-center justify-center space-x-6">
            <Button variant="primary" size="lg" href="/contact">
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" href="/services">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
