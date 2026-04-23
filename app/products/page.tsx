import React from 'react';
import ProductCard from '@/components/ProductCard';
import CTA from '@/sections/Home/CTA';

const ProductsPage = () => {
  const products = [
    {
      name: 'SmartPOS',
      description: 'A comprehensive cloud-based point-of-sale system designed for modern retail and restaurants. Features real-time inventory, multi-terminal support, and advanced analytics.',
      href: '/contact',
      features: ['Real-time Inventory', 'Multi-terminal Support', 'Offline Mode', 'Advanced Analytics', 'Customer Loyalty', 'Tax Compliance'],
    },
    {
      name: 'LMS Pro',
      description: 'An interactive learning management system for schools and corporate training. Includes live classrooms, quiz engines, and mobile app integration.',
      href: '/contact',
      features: ['Live Streaming', 'Quiz Engine', 'Student Tracking', 'Mobile App', 'Course Builder', 'Resource Library'],
    },
    {
        name: 'HealthSync',
        description: 'A specialized platform for clinic management and patient records. Secure, reliable, and compliant with health data standards.',
        href: '/contact',
        features: ['Appointment Booking', 'Patient Records', 'E-Prescription', 'Billing & Insurance', 'Secure Data Storage', 'Staff Scheduling'],
      },
  ];

  return (
    <div className="pt-32">
      <div className="container mx-auto px-6 mb-24 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Products</h1>
        <p className="text-secondary text-xl leading-relaxed">
          Innovative software platforms built by DevNix to solve real-world industry challenges.
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
