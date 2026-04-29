'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Cloud } from 'lucide-react';

const SecuritySection = () => {
  const items = [
    { icon: <Shield />, text: "Data Protection" },
    { icon: <Cloud />, text: "99.9% Uptime Cloud" },
    { icon: <Lock />, text: "Enterprise Security" }
  ];

  return (
    <section className="py-12 relative border-y border-white/5 bg-white/[0.005]">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 opacity-30 hover:opacity-60 transition-opacity">
              <div className="text-primary">{item.icon}</div>
              <span className="text-white font-black uppercase tracking-[0.2em] text-[10px]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
