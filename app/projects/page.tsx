'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CTASection from '@/sections/Home/CTASection';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'E-commerce Overhaul',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
      description: 'A complete redesign and migration for a major retail brand, resulting in a 40% increase in conversion rates.',
      tags: ['Next.js', 'Tailwind', 'Stripe'],
    },
    {
      title: 'Fintech Mobile App',
      category: 'Mobile Apps',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
      description: 'A secure and intuitive mobile wallet for seamless digital payments and peer-to-peer transfers.',
      tags: ['React Native', 'Firebase', 'Node.js'],
    },
    {
      title: 'HealthCare SaaS',
      category: 'SaaS Products',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
      description: 'An enterprise-grade SaaS platform for hospital management and data analytics.',
      tags: ['AWS', 'TypeScript', 'PostgreSQL'],
    },
    {
      title: 'Education Portal',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60',
      description: 'A multi-lingual learning platform serving thousands of students across Sri Lanka.',
      tags: ['React', 'NestJS', 'Redis'],
    },
    {
      title: 'Logistics Tracker',
      category: 'Custom Systems',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
      description: 'Real-time fleet tracking and optimization system for a national logistics provider.',
      tags: ['Go', 'Docker', 'Google Maps API'],
    },
    {
      title: 'Real Estate App',
      category: 'Mobile Apps',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60',
      description: 'A premium mobile experience for discovering and managing real estate listings.',
      tags: ['Flutter', 'Supabase', 'Cloudinary'],
    },
  ];

  return (
    <div className="pt-40 pb-20">
      <div className="container mx-auto px-6 mb-24 text-center max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-3 px-5 py-2 rounded-full glass border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#7BA4D0]"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light/60">
            Our Track Record
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-gradient text-glow font-display"
        >
          Built for <span className="text-white/40">Results.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-light/60 max-w-2xl font-medium"
        >
          Explore our portfolio of successful systems and see how we’ve helped businesses achieve their growth goals through smart automation.
        </motion.p>
      </div>

      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass rounded-[40px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/90 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 glass border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{project.title}</h3>
                <p className="text-light/50 text-sm mb-8 leading-relaxed font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-[10px] font-bold text-light/40 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="#" className="inline-flex items-center text-primary font-black uppercase tracking-widest text-[11px] group-hover:gap-3 transition-all">
                  Case Study
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default ProjectsPage;
