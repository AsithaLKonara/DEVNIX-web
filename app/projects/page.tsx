import React from 'react';
import Link from 'next/link';
import CTA from '@/sections/Home/CTA';

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
    <div className="pt-32">
      <div className="container mx-auto px-6 mb-24 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Work</h1>
        <p className="text-secondary text-xl leading-relaxed">
          Explore our portfolio of successful projects and see how we’ve helped businesses achieve their digital goals.
        </p>
      </div>

      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-3xl border border-surface-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-[10px] font-bold text-surface-900 px-2 py-1 bg-surface-50 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="#" className="inline-flex items-center text-primary font-bold hover:underline">
                  View Case Study
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
};

export default ProjectsPage;
