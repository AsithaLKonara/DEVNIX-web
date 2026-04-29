'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, DollarSign } from 'lucide-react';

const ROISection = () => {
  const outcomes = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Faster Response Time",
      desc: "Go from hours to milliseconds. Instant engagement means zero missed opportunities."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "More Bookings",
      desc: "Automated funnels convert browsers into customers while you sleep."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Reduced Workload",
      desc: "Remove 80% of repetitive manual tasks, freeing your team for high-value work."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Increased Revenue",
      desc: "Optimized operations and better customer experience lead to a direct boost in margins."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-purple-500/[0.01]">
      {/* Subtle Hierarchy Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-aqua/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white font-display uppercase leading-[0.95]">
            What This Means for <br className="hidden md:block"/><span className="text-primary">Your Business.</span>
          </h2>
          <p className="text-aqua/40 text-lg font-medium italic">We don't sell features. We sell business outcomes that connect directly with your bottom line.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-[40px] overflow-hidden border border-white/5">
          {outcomes.map((out, i) => (
            <div key={i} className="p-12 glass-panel group hover:bg-white/[0.05] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {out.icon}
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{out.title}</h3>
              <p className="text-light/60 text-sm leading-relaxed font-medium">
                {out.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ROISection;
