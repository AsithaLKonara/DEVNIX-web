import React from 'react';
import ProductCard from '@/components/ProductCard';

const ProductsSection = () => {
  const products = [
    {
      name: 'SmartPOS',
      description: 'A comprehensive cloud-based point-of-sale system designed for modern retail and restaurants in Sri Lanka.',
      href: '/products/smartpos',
      features: ['Real-time Inventory', 'Multi-terminal Support', 'Offline Mode', 'Advanced Analytics'],
    },
    {
      name: 'LMS Pro',
      description: 'An interactive learning management system for schools and corporate training with virtual classrooms.',
      href: '/products/lms-pro',
      features: ['Live Streaming', 'Quiz Engine', 'Student Tracking', 'Mobile App'],
    },
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h2>
            <p className="text-secondary text-lg">
              Beyond custom services, we build proprietary platforms that solve industry-specific challenges.
            </p>
          </div>
          <a href="/products" className="text-primary font-bold hover:underline transition-all">View All Products →</a>
        </div>

        <div className="space-y-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
