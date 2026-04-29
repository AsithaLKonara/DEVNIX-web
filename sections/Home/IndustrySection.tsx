'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, Utensils, ShoppingBag, GraduationCap } from 'lucide-react';

const IndustrySection = () => {
  const industries = [
    {
      icon: <Hotel className="w-8 h-8" />,
      name: "Hotels & Villas",
      problem: "Double bookings and manual check-ins wasting staff time.",
      solution: "Fully automated reservation engine and guest communication."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      name: "Restaurants & Cafes",
      problem: "Losing customers due to slow table bookings and manual orders.",
      solution: "WhatsApp-based ordering and instant table reservation systems."
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      name: "Retail Shops",
      problem: "Fragmented inventory tracking and slow billing lines.",
      solution: "Cloud POS with real-time inventory sync across multiple outlets."
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      name: "Education Institutes",
      problem: "Manual attendance and inefficient inquiry management.",
      solution: "Automated student portals and inquiry-to-enrollment pipelines."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.01]">
      {/* Subtle Hierarchy Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display">
            Built for Your <span className="text-primary">Industry.</span>
          </h2>
          <p className="text-light/40 font-medium">Tailored automation strategies for businesses that demand excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 glass rounded-[40px] border border-white/5 group hover:border-primary/20 transition-all"
            >
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-deep transition-all duration-500 shrink-0">
                  {ind.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">{ind.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500/60 block mb-1">The Problem:</span>
                      <p className="text-light/50 text-sm font-medium">{ind.problem}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">Our Solution:</span>
                      <p className="text-white font-bold text-sm">{ind.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
