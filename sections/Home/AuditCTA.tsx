'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchCode } from 'lucide-react';

const AuditCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass rounded-[64px] p-12 md:p-20 text-center overflow-hidden border border-white/10"
        >
          {/* Accent Glow */}
          <div className="absolute -top-20 -left-20 w-80 h-80 pointer-events-none" 
               style={{ background: 'radial-gradient(circle at center, rgba(123, 164, 208, 0.15), transparent 70%)' }} />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
              <SearchCode size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white font-display uppercase leading-[0.95]">
              Get a Free Business <br/> <span className="text-primary">Automation Audit.</span>
            </h2>
            <p className="text-light/60 text-lg mb-10 font-medium">
              We’ll analyze your current systems, identify manual bottlenecks, and show you exactly where automation can save you time and money.
            </p>
            <Link 
              href="/contact"
              className="px-10 py-5 rounded-2xl bg-white text-deep font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Book Free Audit Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditCTA;
