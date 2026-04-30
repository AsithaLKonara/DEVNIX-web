'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/services' },
    { name: 'Systems', href: '/products' },
    { name: 'Results', href: '/projects' },
    { name: 'Our Vision', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-16 md:h-20 flex items-center justify-between px-10 glass pointer-events-auto border-b border-white/10"
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center relative h-full">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
            <Image 
              src="/logo/cover logo transparent bg.png" 
              alt="Xonit Logo" 
              width={400} 
              height={160} 
              className="h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_20px_rgba(123,164,208,0.3)]"
              priority
            />
          </Link>
          {/* Spacer to maintain layout with absolute logo */}
          <div className="w-48 md:w-64"></div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-bold text-light/50 hover:text-white transition-all uppercase tracking-[0.2em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
          
          <Link 
            href="/contact" 
            className="px-6 py-2.5 rounded-xl bg-primary text-deep text-[12px] font-black uppercase tracking-widest hover:scale-110 hover:shadow-[0_0_30px_rgba(123,164,208,0.5)] active:scale-95 transition-all duration-300"
          >
            Book Free Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[100px] glass p-10 flex flex-col space-y-8 md:hidden z-40 border-b border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-black text-white uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-5 rounded-2xl bg-primary text-deep text-center font-black uppercase tracking-widest text-sm"
            >
              Book Free Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
