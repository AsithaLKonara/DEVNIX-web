'use client';

import { motion } from 'framer-motion';
import CTASection from '@/sections/Home/CTASection';

const ProjectsPage = () => {
  const projects = [
    { title: 'Smart Hotel OS', category: 'Hospitality SaaS', href: 'https://smarthotelos.vercel.app/', image: '/projects/smart-hotel-os.webp', description: 'A complete ecosystem for modern hospitality—from booking to billing.', tags: ['Next.js', 'TypeScript', 'Prisma'] },
    { title: 'Weddinglk', category: 'Directory Platform', href: 'https://wedding-lk.vercel.app/', image: '/projects/weddinglk.webp', description: 'A premium directory platform for wedding services, vendors, and couples.', tags: ['Next.js', 'Tailwind', 'Vercel'] },
    { title: 'Task nest', category: 'Task Management', href: 'https://task-nest-gamma.vercel.app/', image: '/projects/task-nest.webp', description: 'An intuitive task management system built for teams to collaborate efficiently.', tags: ['React', 'Node.js', 'PostgreSQL'] },
    { title: 'Classified ad web', category: 'Classified Ads', href: 'https://ai-powered-classified-ad-web.vercel.app/', image: '/projects/classified-ad.webp', description: 'AI-powered classified ad platform with smart categorization and search.', tags: ['Next.js', 'AI', 'Tailwind'] },
    { title: 'Ride taxi web', category: 'Transport', href: 'https://ride-x-taxi-web.vercel.app/', image: '/projects/ride-taxi.webp', description: 'A modern ride-hailing and taxi booking web application.', tags: ['React', 'Maps API', 'Firebase'] },
    { title: 'A zone CNC web', category: 'Corporate', href: 'https://a-zone-cnc-web.vercel.app/', image: '/projects/azone-cnc.webp', description: 'Corporate website for a CNC manufacturing and engineering company.', tags: ['Next.js', 'Framer Motion', 'Vercel'] },
    { title: 'Smart LMS', category: 'EdTech SaaS', href: 'https://smart-lms-saas.vercel.app/', image: '/projects/smart-lms.webp', description: 'An interactive learning management system for schools and corporate training.', tags: ['React', 'NestJS', 'PostgreSQL'] },
    { title: 'Car sale', category: 'Automotive', href: 'https://car-sale-web.vercel.app/', image: '/projects/car-sale.webp', description: 'A comprehensive automotive marketplace for buying and selling vehicles.', tags: ['React', 'Supabase', 'Tailwind'] },
    { title: 'Ominichat', category: 'Communication', href: 'https://universal-chatbot-psi.vercel.app/', image: '/projects/ominichat.webp', description: 'Universal chatbot and communication platform for customer support.', tags: ['Next.js', 'OpenAI', 'WebSockets'] },
    { title: 'Smart Store', category: 'E-commerce SaaS', href: 'https://smart-store-saas-demo.vercel.app/', image: '/projects/smart-store.webp', description: 'A powerful e-commerce platform for retail businesses to manage sales online.', tags: ['Next.js', 'Stripe', 'Prisma'] },
    { title: 'Facade Center', category: 'Corporate', href: 'https://facade-web-red.vercel.app/', image: '/projects/facade-center.webp', description: 'Professional corporate website for facade and architectural services.', tags: ['React', 'Tailwind', 'Vercel'] },
    { title: 'Smart Hotel 1', category: 'Hospitality', href: 'https://smarthotel-demo.vercel.app/', image: '/projects/smart-hotel-1.webp', description: 'Original hospitality management system with integrated booking engine.', tags: ['React', 'Node.js', 'MongoDB'] },
    { title: 'Automate Lanka', category: 'Automation', href: 'https://autolanka-frontend-app.vercel.app/', image: '/projects/automate-lanka.webp', description: 'Business process automation platform tailored for Sri Lankan enterprises.', tags: ['Next.js', 'Tailwind', 'Supabase'] },
    { title: 'POS System', category: 'Point of Sale', href: 'https://facade-pos-frontend.vercel.app/', image: '/projects/pos-system.webp', description: 'Cloud-based point-of-sale system designed for modern retail and restaurants.', tags: ['React', 'Redux', 'Node.js'] },
  ];

  return (
    <div className="pt-32 sm:pt-40 pb-20 relative overflow-hidden">
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
          className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter text-gradient text-glow font-display uppercase"
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
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-60"
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
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-black uppercase tracking-widest text-[11px] group-hover:gap-3 transition-all">
                  Watch Live
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
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
