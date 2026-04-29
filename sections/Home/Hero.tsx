'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden text-center">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-3 px-5 py-2 rounded-full glass border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.3)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light/60">
              Smart Systems for Growth
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tighter text-gradient text-glow font-display uppercase"
          >
            Increase Your Business <br className="hidden md:block" />
            Revenue <span className="text-white/20">with Smart Systems.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-light/60 mb-12 max-w-2xl leading-relaxed font-medium"
          >
            We build automation systems that handle customers, operations, and growth—so you don’t have to.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/contact"
              className="group relative px-8 py-4 rounded-2xl bg-primary text-deep font-black uppercase tracking-widest text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(123,164,208,0.3)] active:scale-95"
            >
              Book Free Demo
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            </Link>

            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/5 text-light font-bold text-sm hover:bg-white/5 transition-all">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-3 h-3 fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Watch Demo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] vertical-text">Scroll</span>
      </motion.div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default Hero;
