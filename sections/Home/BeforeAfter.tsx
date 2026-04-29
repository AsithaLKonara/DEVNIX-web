'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2 } from 'lucide-react';

const BeforeAfter = () => {
  const points = [
    { 
      before: "Manual, slow replies", 
      after: "Instant, AI-powered responses 24/7" 
    },
    { 
      before: "Missed bookings & lost leads", 
      after: "Automated booking & lead capture" 
    },
    { 
      before: "Chaotic manual tracking", 
      after: "Full operational control from one dashboard" 
    },
    { 
      before: "Stressed staff handling repetitive tasks", 
      after: "Staff focused on high-value growth work" 
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display uppercase">
            Before Xonit <span className="text-primary">vs After Xonit</span>
          </h2>
          <p className="text-light/40 font-medium">The transformation from operational chaos to automated excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-[48px] overflow-hidden border border-white/5 shadow-2xl">
          {/* Before */}
          <div className="p-12 md:p-16 bg-white/[0.02] flex flex-col items-center md:items-start">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/60 mb-10">Status: Inefficient</h3>
            <div className="space-y-8 w-full">
              {points.map((p, i) => (
                <div key={i} className="flex items-start gap-4 opacity-40">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <p className="text-light/80 font-medium">{p.before}</p>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="p-12 md:p-16 bg-primary/[0.03] flex flex-col items-center md:items-start relative">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Status: Automated</h3>
            <div className="space-y-8 w-full">
              {points.map((p, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-white font-black uppercase tracking-tight text-lg">{p.after}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
