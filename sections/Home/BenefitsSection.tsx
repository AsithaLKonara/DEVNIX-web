'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, UserCheck, ShieldCheck } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap className="text-primary" />,
      stat: "24/7",
      title: "Instant Response",
      text: "Customers never wait. Our systems answer, qualify, and book leads while you sleep."
    },
    {
      icon: <TrendingUp className="text-primary" />,
      stat: "+45%",
      title: "Revenue Growth",
      text: "Capture every missed opportunity and upsell services automatically through smart flows."
    },
    {
      icon: <UserCheck className="text-primary" />,
      stat: "-80%",
      title: "Manual Overhead",
      text: "Cut out the repetitive busywork. Let the system handle the billing and guest management."
    },
    {
      icon: <ShieldCheck className="text-primary" />,
      stat: "100%",
      title: "Operational Control",
      text: "Zero errors, zero missed bookings. Everything synced in one professional dashboard."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display">
            Why Our Clients <span className="text-primary">Scale Faster.</span>
          </h2>
          <p className="text-light/40 font-medium">Outcomes that matter most to your business bottom line.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((ben, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[40px] glass-panel border border-white/5 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                {ben.icon}
              </div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter font-display">
                {ben.stat}
              </div>
              <h3 className="text-lg font-black text-primary uppercase tracking-widest mb-4">
                {ben.title}
              </h3>
              <p className="text-light/60 text-sm leading-relaxed font-medium">
                {ben.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
