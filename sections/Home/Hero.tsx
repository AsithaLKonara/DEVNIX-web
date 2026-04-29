import React from 'react';
import Button from '@/components/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow [animation-delay:2s]"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 shadow-2xl mb-10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#8b5cf6]"></span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              The Blueprint of Digital Excellence
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold mb-10 leading-[1] tracking-tight font-display">
            Creating <span className="text-gradient">Impactful</span> <br /> Digital Products
          </h1>

          <p className="text-lg md:text-2xl text-secondary mb-16 max-w-4xl mx-auto leading-relaxed font-sans font-light">
            We are a full-service digital agency. From <span className="text-white font-medium italic">High-Scale Software</span> and <span className="text-white font-medium italic">Strategic Consulting</span> to <span className="text-white font-medium italic">Vibrant Marketing</span> and <span className="text-white font-medium italic">Premium Media Production</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow">
              Start Your Project
            </Button>
            <Button variant="secondary" size="lg" href="/projects" className="w-full sm:w-auto glass hover:bg-white/10">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
