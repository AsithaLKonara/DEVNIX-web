import React from 'react';
import Button from '@/components/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-transparent">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-surface-200 shadow-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-surface-900">
              Trusted Software Partner
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1]">
            Building Scalable <span className="text-primary">Software Products</span> & Smart Solutions
          </h1>
          
          <p className="text-xl md:text-2xl text-surface-900 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            We help startups and enterprises design, build, and launch reliable digital products that scale with your business.
          </p>
          
          <div className="flex flex-row items-center justify-center space-x-6">
            <Button variant="primary" size="lg" href="/contact">
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" href="/projects">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
