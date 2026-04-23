import React from 'react';
import Image from 'next/image';
import Button from './Button';

interface ProductCardProps {
  name: string;
  description: string;
  href: string;
  image?: string;
  features: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, href, image, features }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12 glass rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden group border-white/40">
      <div className="w-full lg:w-1/2 aspect-video bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/20 shadow-inner">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-primary/20 font-bold text-6xl select-none mb-4 group-hover:scale-110 transition-transform duration-500">{name.charAt(0)}</div>
            <div className="text-surface-900 font-bold text-2xl opacity-40">{name}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="w-full lg:w-1/2 text-left">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
          Proprietary Software
        </div>
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-surface-900 leading-tight">{name}</h3>
        <p className="text-secondary text-lg mb-8 leading-relaxed">
          {description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-surface-900 font-semibold group/item">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 shadow-md group-hover/item:scale-110 transition-transform">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {feature}
            </div>
          ))}
        </div>
        
        <Button variant="primary" href={href} className="group/btn">
          Explore {name}
          <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
