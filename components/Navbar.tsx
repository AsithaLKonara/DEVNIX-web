'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

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
        className="w-full h-16 md:h-20 flex items-center justify-between px-6 md:px-10 glass pointer-events-auto border-b border-white/10 z-50"
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/group-3.png"
              alt="Xonit Logo"
              width={180}
              height={72}
              className="h-9 md:h-6 w-auto object-contain drop-shadow-[0_0_20px_rgba(123,164,208,0.3)]"
              priority
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] font-bold transition-all uppercase tracking-[0.2em] relative group ${
                  isActive ? 'text-primary' : 'text-light/50 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}

          <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
            <Link
              href="/login"
              className="text-[12px] font-bold text-white hover:text-primary transition-colors uppercase tracking-widest"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[12px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-primary text-deep text-[12px] font-black uppercase tracking-widest hover:scale-110 hover:shadow-[0_0_30px_rgba(123,164,208,0.5)] active:scale-95 transition-all duration-300 ml-4"
            >
              Book Free Demo
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Backdrop for Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-30 md:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 glass p-6 flex flex-col space-y-2 md:hidden z-40 border-b border-white/10 pointer-events-auto"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center min-h-[48px] px-3 rounded-lg text-sm font-black uppercase tracking-widest transition-colors ${
                    isActive ? 'text-primary bg-white/5' : 'text-white hover:text-primary hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center min-h-[48px] rounded-xl border border-white/10 text-white text-center font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center min-h-[48px] rounded-xl bg-white/10 text-white text-center font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
              >
                Sign Up
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center min-h-[52px] rounded-xl bg-primary text-deep text-center font-black uppercase tracking-widest text-xs mt-2 hover:opacity-90 active:scale-95 transition-all"
              >
                Book Free Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
