'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareX, Clock, Activity } from 'lucide-react';

const ProblemSection = () => {
  const problems = [
    {
      icon: <MessageSquareX className="w-8 h-8 text-primary" />,
      title: "Losing Customers",
      text: "Slow replies kill sales. If you don't answer in minutes, they've already moved to your competitor."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Manual Workload",
      text: "Wasting hours on repetitive tasks, billing, and scheduling instead of focusing on actual business growth."
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "Operational Chaos",
      text: "Managing without a centralized system leads to errors, missed bookings, and stressed teams."
    }
  ];

  return (
    <section className="py-24 relative bg-purple-500/[0.005]">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.05), transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, rgba(123, 164, 208, 0.03), transparent 70%)' }} />

      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display">
            The Cost of <span className="text-primary">Staying Manual.</span>
          </h2>
          <p className="text-light/40 font-medium">Running a business without automation is like driving with the handbrake on.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              className="p-10 rounded-[40px] glass-panel border border-white/5 group transition-all"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                {prob.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tighter">
                {prob.title}
              </h3>
              <p className="text-light/60 leading-relaxed text-sm">
                {prob.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
