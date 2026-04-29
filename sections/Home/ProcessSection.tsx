'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const steps = [
    {
      num: "01",
      title: "Book Free Demo",
      text: "We analyze your current manual work and show you the automation blueprint."
    },
    {
      num: "02",
      title: "System Setup",
      text: "We deploy and integrate the systems into your business operations."
    },
    {
      num: "03",
      title: "Accelerated Growth",
      text: "Monitor results, scale your revenue, and reclaim your time."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display">
            The Path to <span className="text-primary">Automation.</span>
          </h2>
          <p className="text-light/40 font-medium">Three steps to a more profitable, system-driven business.</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-12 glass rounded-[48px] border border-white/5 group hover:border-primary/20 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-deep border-4 border-white/5 flex items-center justify-center mb-8 shadow-2xl group-hover:border-primary/40 transition-all">
                  <span className="text-xl font-black text-primary">{step.num}</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                  {step.title}
                </h3>
                <p className="text-light/60 font-medium leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
