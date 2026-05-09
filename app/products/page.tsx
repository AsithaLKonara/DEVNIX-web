import React from 'react';
import ProductCard from '@/components/ProductCard';
import CTA from '@/sections/Home/CTA';

const ProductsPage = () => {
  const products = [
    { name: 'Weddinglk', description: 'A premium directory platform for wedding services, vendors, and couples.', href: 'https://wedding-lk.vercel.app/', image: '/projects/weddinglk.webp', features: ['Directory Platform', 'Next.js', 'Tailwind', 'Vercel'] },
    { name: 'Task nest', description: 'An intuitive task management system built for teams to collaborate efficiently.', href: 'https://task-nest-gamma.vercel.app/', image: '/projects/task-nest.webp', features: ['Task Management', 'React', 'Node.js', 'PostgreSQL'] },
    { name: 'Classified ad web', description: 'AI-powered classified ad platform with smart categorization and search.', href: 'https://ai-powered-classified-ad-web.vercel.app/', image: '/projects/classified-ad.webp', features: ['Classified Ads', 'Next.js', 'AI', 'Tailwind'] },
    { name: 'Ride taxi web', description: 'A modern ride-hailing and taxi booking web application.', href: 'https://ride-x-taxi-web.vercel.app/', image: '/projects/ride-taxi.webp', features: ['Transport', 'React', 'Maps API', 'Firebase'] },
    { name: 'A zone CNC web', description: 'Corporate website for a CNC manufacturing and engineering company.', href: 'https://a-zone-cnc-web.vercel.app/', image: '/projects/azone-cnc.webp', features: ['Corporate', 'Next.js', 'Framer Motion', 'Vercel'] },
    { name: 'Smart LMS', description: 'An interactive learning management system for schools and corporate training.', href: 'https://smart-lms-saas.vercel.app/', image: '/projects/smart-lms.webp', features: ['EdTech SaaS', 'React', 'NestJS', 'PostgreSQL'] },
    { name: 'Smart Hotel 2', description: 'A complete ecosystem for modern hospitality—from booking to billing.', href: 'https://smart-hotel-2.vercel.app/', image: '/projects/smart-hotel-2.webp', features: ['Hospitality SaaS', 'Next.js', 'TypeScript', 'Prisma'] },
    { name: 'Car sale', description: 'A comprehensive automotive marketplace for buying and selling vehicles.', href: 'https://car-sale-web.vercel.app/', image: '/projects/car-sale.webp', features: ['Automotive', 'React', 'Supabase', 'Tailwind'] },
    { name: 'Ominichat', description: 'Universal chatbot and communication platform for customer support.', href: 'https://universal-chatbot-psi.vercel.app/', image: '/projects/ominichat.webp', features: ['Communication', 'Next.js', 'OpenAI', 'WebSockets'] },
    { name: 'Smart Store', description: 'A powerful e-commerce platform for retail businesses to manage sales online.', href: 'https://smart-store-saas-demo.vercel.app/', image: '/projects/smart-store.webp', features: ['E-commerce SaaS', 'Next.js', 'Stripe', 'Prisma'] },
    { name: 'Facade Center', description: 'Professional corporate website for facade and architectural services.', href: 'https://facade-web-red.vercel.app/', image: '/projects/facade-center.webp', features: ['Corporate', 'React', 'Tailwind', 'Vercel'] },
    { name: 'Smart Hotel 1', description: 'Original hospitality management system with integrated booking engine.', href: 'https://smarthotel-demo.vercel.app/', image: '/projects/smart-hotel-1.webp', features: ['Hospitality', 'React', 'Node.js', 'MongoDB'] },
    { name: 'Automate Lanka', description: 'Business process automation platform tailored for Sri Lankan enterprises.', href: 'https://autolanka-frontend-app.vercel.app/', image: '/projects/automate-lanka.webp', features: ['Automation', 'Next.js', 'Tailwind', 'Supabase'] },
    { name: 'POS System', description: 'Cloud-based point-of-sale system designed for modern retail and restaurants.', href: 'https://facade-pos-frontend.vercel.app/', image: '/projects/pos-system.webp', features: ['Point of Sale', 'React', 'Redux', 'Node.js'] },
  ];

  return (
    <div className="pt-32 pb-12 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-24 text-center max-w-4xl flex flex-col items-center">
        <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full glass border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(123,164,208,0.5)]"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light/60">
            Proprietary Systems
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-gradient text-glow font-display uppercase">Our Products</h1>
        <p className="text-light/60 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
          Innovative software platforms built by Xonit to solve real-world industry challenges.
        </p>
      </div>

      <div className="container mx-auto px-6 mb-24 space-y-16">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      <CTA />
    </div>
  );
};

export default ProductsPage;
