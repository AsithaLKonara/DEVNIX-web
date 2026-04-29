import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, href }) => {
  return (
    <div className="p-10 glass rounded-[40px] border border-white/5 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(123,164,208,0.15)] transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all" />
      
      <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-deep transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{title}</h3>
      <p className="text-light/50 text-sm leading-relaxed mb-8 font-medium">
        {description}
      </p>
      <Link href={href} className="text-primary font-bold text-xs uppercase tracking-widest inline-flex items-center group-hover:gap-3 transition-all">
        Explore Solution
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default ServiceCard;
