import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white mb-6 block">
              DevNix<span className="text-primary">.lk</span>
            </Link>
            <p className="text-surface-200 text-sm leading-relaxed mb-6">
              Building and deploying scalable software products and smart business solutions globally from Sri Lanka.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-surface-200 hover:text-primary text-sm transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="text-surface-200 hover:text-primary text-sm transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services" className="text-surface-200 hover:text-primary text-sm transition-colors">SaaS Products</Link></li>
              <li><Link href="/services" className="text-surface-200 hover:text-primary text-sm transition-colors">Custom Systems</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-surface-200 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="text-surface-200 hover:text-primary text-sm transition-colors">Our Work</Link></li>
              <li><Link href="/products" className="text-surface-200 hover:text-primary text-sm transition-colors">Products</Link></li>
              <li><Link href="/contact" className="text-surface-200 hover:text-primary text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-surface-200">
              <li>Email: info@devnix.lk</li>
              <li>Location: Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:row items-center justify-between">
          <p className="text-surface-200 text-sm mb-4 md:mb-0">
            © {currentYear} DevNix.lk. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-surface-200 hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-surface-200 hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-surface-200 hover:text-primary transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
