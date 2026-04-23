import React from 'react';
import Button from '@/components/Button';

const CTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Build Your <span className="text-surface-900/40">Next Big Thing?</span>
          </h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you’re a startup looking for an MVP or an enterprise needing a custom system, we’re here to help you scale.
          </p>
          <div className="flex flex-col sm:row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button variant="secondary" size="lg" href="/contact" className="!bg-white !text-primary hover:!bg-surface-50">
              Start a Project
            </Button>
            <Button variant="ghost" size="lg" href="/services" className="!text-white hover:!bg-white/10 border border-white/20">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
