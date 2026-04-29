'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need technical knowledge?",
      a: "No. We handle everything from setup to deployment. You get a simple dashboard to manage your entire business system without touching a single line of code."
    },
    {
      q: "How long does the setup take?",
      a: "Standard systems are deployed within 7-14 days. Custom enterprise solutions may take longer depending on the complexity of your business logic."
    },
    {
      q: "Can it integrate with my existing tools?",
      a: "Yes. We support all major platforms including WhatsApp Official API, WooCommerce, Shopify, Stripe, and custom CRMs."
    },
    {
      q: "Is the WhatsApp official API used?",
      a: "Absolutely. We only use official Meta WhatsApp Business API to ensure your account security and long-term stability."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display uppercase">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h2>
          <p className="text-light/40 font-medium">Reducing hesitation by providing clear answers to common business concerns.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-[32px] border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-lg font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-light/40 group-hover:text-primary transition-all">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-light/60 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
