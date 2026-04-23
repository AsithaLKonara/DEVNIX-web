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
    <div className="flex flex-col lg:row items-center gap-12 p-8 md:p-12 bg-white rounded-[2rem] border border-surface-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="w-full lg:w-1/2 aspect-video bg-gradient-to-br from-surface-50 to-surface-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-surface-200 font-bold text-4xl select-none">{name}</div>
        )}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <div className="w-full lg:w-1/2">
        <h3 className="text-3xl font-bold mb-4">{name}</h3>
        <p className="text-secondary text-lg mb-8">
          {description}
        </p>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-surface-900 font-medium">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button variant="primary" href={href}>
          View Product
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
