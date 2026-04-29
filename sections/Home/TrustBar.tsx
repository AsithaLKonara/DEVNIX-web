'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = () => {
  const categories = [
    'Hotels',
    'Restaurants',
    'Retail Stores',
    'E-commerce',
    'Growing Businesses'
  ];

  return (
    <section className="relative z-10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-8 glass rounded-[32px] border border-white/5">
          <div className="text-center md:text-left">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-light/40 mb-1">
              Built for Growth
            </h3>
            <p className="text-lg font-bold text-white">
              Systems powering modern enterprises
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-40">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-black uppercase tracking-widest">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
