'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-[64px] p-16 md:p-24 text-center overflow-hidden border border-white/5"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-white font-display">
              Ready to <br/>
              <span className="text-primary">Automate Your Growth?</span>
            </h2>
            <p className="text-xl text-light/60 mb-12 font-medium">
              Join the forward-thinking businesses using Xonit to reclaimed their time and increase their margins.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/contact"
                className="px-10 py-5 rounded-2xl bg-primary text-deep font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_40px_rgba(123,164,208,0.4)]"
              >
                Book My Free Demo
              </Link>
              
              <Link 
                href="https://wa.me/yournumber"
                className="px-10 py-5 rounded-2xl glass border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/5 transition-all"
              >
                WhatsApp Chat
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
