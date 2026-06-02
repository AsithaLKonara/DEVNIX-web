import React from 'react';

const CaseStudies = () => {
  const projects = [
    { title: 'Smart Hotel OS', category: 'Hospitality SaaS', href: 'https://smarthotelos.vercel.app/', image: '/projects/smart-hotel-os.png' },
    { title: 'Weddinglk', category: 'Directory Platform', href: 'https://wedding-lk.vercel.app/', image: '/projects/weddinglk.webp' },
    { title: 'Task nest', category: 'Task Management', href: 'https://task-nest-gamma.vercel.app/', image: '/projects/task-nest.webp' },
    { title: 'Classified ad web', category: 'Classified Ads', href: 'https://ai-powered-classified-ad-web.vercel.app/', image: '/projects/classified-ad.webp' },
    { title: 'Ride taxi web', category: 'Transport', href: 'https://ride-x-taxi-web.vercel.app/', image: '/projects/ride-taxi.webp' },
    { title: 'A zone CNC web', category: 'Corporate', href: 'https://a-zone-cnc-web.vercel.app/', image: '/projects/azone-cnc.webp' },
    { title: 'Smart LMS', category: 'EdTech SaaS', href: 'https://smart-lms-saas.vercel.app/', image: '/projects/smart-lms.webp' },
    { title: 'Car sale', category: 'Automotive', href: 'https://car-sale-web.vercel.app/', image: '/projects/car-sale.webp' },
    { title: 'Ominichat', category: 'Communication', href: 'https://universal-chatbot-psi.vercel.app/', image: '/projects/ominichat.webp' },
    { title: 'Smart Store', category: 'E-commerce SaaS', href: 'https://smart-store-saas-demo.vercel.app/', image: '/projects/smart-store.webp' },
    { title: 'Facade Center', category: 'Corporate', href: 'https://facade-web-red.vercel.app/', image: '/projects/facade-center.webp' },
    { title: 'Smart Hotel 1', category: 'Hospitality', href: 'https://smarthotel-demo.vercel.app/', image: '/projects/smart-hotel-1.webp' },
    { title: 'Automate Lanka', category: 'Automation', href: 'https://autolanka-frontend-app.vercel.app/', image: '/projects/automate-lanka.webp' },
    { title: 'POS System', category: 'Point of Sale', href: 'https://facade-pos-frontend.vercel.app/', image: '/projects/pos-system.webp' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a key={index} href={project.href} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-100 block shadow-sm hover:shadow-xl transition-shadow duration-300 border border-surface-200">
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-surface-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900/95 via-surface-900/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.category}
                </span>
                <h3 className="text-white text-2xl font-bold">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
