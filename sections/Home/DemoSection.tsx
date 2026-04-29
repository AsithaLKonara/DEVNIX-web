'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const DemoSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const demos = [
    {
      title: "Chatbot Flow",
      category: "WhatsApp Automation",
      image: "https://images.unsplash.com/photo-1577563906417-45a18e02947c?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    },
    {
      title: "Hotel Dashboard",
      category: "HMS System",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    },
    {
      title: "POS Checkout",
      category: "Billing System",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white font-display">
            See the <span className="text-primary">Systems in Action.</span>
          </h2>
          <p className="text-light/40 font-medium">Real demos of how our automation handles the hard work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              onClick={() => setActiveVideo(demo.videoUrl)}
              className="relative aspect-video rounded-3xl overflow-hidden glass cursor-pointer group border border-white/5"
            >
              <img 
                src={demo.image} 
                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                alt={demo.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/90 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{demo.category}</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">{demo.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary text-deep flex items-center justify-center shadow-[0_0_30px_rgba(123,164,208,0.5)]">
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-deep/90 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video glass rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X size={20} />
              </button>
              <iframe
                src={activeVideo}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DemoSection;
