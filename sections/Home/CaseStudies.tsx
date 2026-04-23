import React from 'react';
import Link from 'next/link';

const CaseStudies = () => {
  const projects = [
    {
      title: 'E-commerce Overhaul',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
      href: '/projects/ecommerce',
    },
    {
      title: 'Fintech Mobile App',
      category: 'Mobile Apps',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
      href: '/projects/fintech',
    },
    {
      title: 'HealthCare SaaS',
      category: 'SaaS Products',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
      href: '/projects/healthcare',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Selected Work</h2>
          <p className="text-secondary text-lg">
            A showcase of recent projects where we’ve helped our clients achieve digital excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link key={index} href={project.href} className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-100">
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.category}
                </span>
                <h3 className="text-white text-2xl font-bold">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/projects" className="inline-flex items-center text-primary font-bold hover:underline">
            View All Case Studies
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
