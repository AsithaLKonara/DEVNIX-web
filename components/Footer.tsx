'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const links = {
    solutions: [
      { name: 'Hotel System', href: '/products' },
      { name: 'WhatsApp Bot', href: '/products' },
      { name: 'Smart POS', href: '/products' },
      { name: 'Custom CRM', href: '/products' },
    ],
    company: [
      { name: 'Our Vision', href: '/about' },
      { name: 'Case Studies', href: '/projects' },
      { name: 'Partner with Us', href: '/contact' },
    ],
    contact: [
      { name: 'contact@xonitspace.com', href: 'mailto:contact@xonitspace.com' },
      { name: '+94 77 050 6722', href: 'tel:+94770506722' },
      { name: 'WhatsApp Support', href: 'https://wa.me/94770506722' },
      { name: 'Colombo, Sri Lanka', href: '#' },
    ]
  };

  return (
    <footer className="relative z-10 pt-24 pb-12 overflow-hidden glass border-t border-white/10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-8 block">
              <img 
                src="/logo/logo only colored transparent bg.png" 
                alt="Xonit Logo" 
                className="h-40 w-auto object-contain"
              />
            </Link>
            <p className="text-light/40 text-sm leading-relaxed font-medium">
              We build smart automation systems that handle customers, operations, and growth—so you don't have to.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Solutions</h4>
            <ul className="space-y-4">
              {links.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-light/60 hover:text-white text-sm font-bold transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Company</h4>
            <ul className="space-y-4">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-light/60 hover:text-white text-sm font-bold transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Connect</h4>
            <ul className="space-y-4">
              {links.contact.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-light/60 hover:text-white text-sm font-bold transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-light/20 text-[10px] font-black uppercase tracking-[0.4em]">
            © {currentYear} Xonit. Systems of Excellence.
          </p>
          <div className="flex space-x-8">
            <a href="https://www.facebook.com/share/1BszvMAhV8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-light/20 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Facebook</a>
            <a href="https://www.tiktok.com/@xonit.space?_r=1&_t=ZS-967WbkiqDLN" target="_blank" rel="noopener noreferrer" className="text-light/20 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">TikTok</a>
            <a href="https://github.com/Xonit-Space" target="_blank" rel="noopener noreferrer" className="text-light/20 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
