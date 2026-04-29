import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, href, className = "" }) => {
  return (
    <div className={`p-8 glass rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden ${className}`}>
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-colors"></div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-secondary text-base leading-relaxed mb-8 opacity-80 group-hover:opacity-100">
          {description}
        </p>
        <Link href={href} className="text-white font-medium text-sm inline-flex items-center group-hover:text-primary transition-colors">
          Explore Service
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
