'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Hotel, Bot, CreditCard, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const SolutionSection = () => {
  const solutions = [
    {
      title: "Hotel Management System",
      description: "A complete ecosystem for modern hospitality—from booking to billing.",
      features: ["Real-time Bookings", "Inventory Sync", "Guest Management"],
      icon: <Hotel className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "WhatsApp Automation",
      description: "AI-powered chatbots that handle inquiries and bookings 24/7.",
      features: ["Auto-replies", "Lead Capture", "Session Handover"],
      icon: <Bot className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Smart POS System",
      description: "Speed up your sales with an intuitive, cloud-based billing system.",
      features: ["Sales Tracking", "Inventory Alerts", "Multiple Outlets"],
      icon: <CreditCard className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white font-display">
            One System. <span className="text-primary">Total Control.</span>
          </h2>
          <p className="text-light/40 font-medium">Purpose-built systems designed for your specific business outcomes.</p>
        </div>

        <div className="space-y-12">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 p-12 rounded-[48px] glass border border-white/5`}
            >
              <div className="flex-1 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {sol.icon}
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{sol.title}</h3>
                <p className="text-light/60 text-lg leading-relaxed">{sol.description}</p>
                <ul className="space-y-3">
                  {sol.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-light/80 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
              
              <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden relative group">
                <img 
                  src={sol.image} 
                  alt={sol.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
