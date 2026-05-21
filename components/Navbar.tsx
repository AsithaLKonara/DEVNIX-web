'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        className="w-full h-16 md:h-20 flex items-center justify-between px-6 md:px-10 glass pointer-events-auto border-b border-white/10"
        style={{ borderRadius: 0 }}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/group-3.png"
              alt="Xonit Logo"
              width={200}
              height={80}
              className="h-10 md:h-7 w-auto object-contain drop-shadow-[0_0_20px_rgba(123,164,208,0.3)]"
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

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 glass p-8 flex flex-col space-y-6 md:hidden z-40 border-b border-white/10 pointer-events-auto"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-black uppercase tracking-widest transition-colors ${
                    isActive ? 'text-primary' : 'text-white hover:text-primary'
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
                className="w-full py-3 rounded-xl border border-white/10 text-white text-center font-bold uppercase tracking-widest text-xs"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white text-center font-bold uppercase tracking-widest text-xs"
              >
                Sign Up
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl bg-primary text-deep text-center font-black uppercase tracking-widest text-xs mt-2"
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
