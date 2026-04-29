'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

const WhyXonit = () => {
  const pillars = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Complete Systems, Not Software",
      desc: "We don't just build apps. We build the entire infrastructure that runs your business end-to-end."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automation + Marketing + Content",
      desc: "The perfect triple-threat. We combine technical automation with creative strategy to drive growth."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Built to Grow With You",
      desc: "Our modular architecture allows you to start small and scale into a global enterprise system."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-aqua-500/[0.005]">
      {/* Subtle Hierarchy Gradient */}
      <div className="absolute top-1/2 -left-24 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white font-display uppercase leading-[0.95]">
              Why Choose <span className="text-primary">Xonit.</span>
            </h2>
            <p className="text-light/40 text-lg font-medium">We separate ourselves from freelancers by focusing on the entire business ecosystem, not just the code.</p>
          </div>
          <div className="hidden md:block pb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Excellence in Engineering</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pillars.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-10 glass rounded-[48px] border border-white/5 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                {pill.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{pill.title}</h3>
              <p className="text-light/60 text-sm leading-relaxed font-medium">
                {pill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyXonit;
