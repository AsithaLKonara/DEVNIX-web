'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShoppingCart, CreditCard, Share2 } from 'lucide-react';

const Integrations = () => {
  const tools = [
    { name: "WhatsApp", icon: <MessageSquare className="w-8 h-8" /> },
    { name: "WooCommerce", icon: <ShoppingCart className="w-8 h-8" /> },
    { name: "Stripe", icon: <CreditCard className="w-8 h-8" /> },
    { name: "Zapier", icon: <Share2 className="w-8 h-8" /> },
    { name: "Shopify", icon: <ShoppingCart className="w-8 h-8" /> },
    { name: "PayPal", icon: <CreditCard className="w-8 h-8" /> },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle Hierarchy Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/[0.02] rounded-full blur-[80px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display uppercase">
            Works With Your <span className="text-primary">Existing Tools.</span>
          </h2>
          <p className="text-light/40 font-medium">Seamlessly sync our systems with the platforms you already use.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-4 px-8 py-5 glass rounded-2xl border border-white/5 grayscale hover:grayscale-0 transition-all"
            >
              <div className="text-primary opacity-60">
                {tool.icon}
              </div>
              <span className="text-white font-black uppercase tracking-widest text-sm">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
