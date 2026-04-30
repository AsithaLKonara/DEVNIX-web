'use client';

import React, { useState } from 'react';
import Button from '@/components/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-8 text-white font-display tracking-tighter">Let’s Build Something <span className="text-primary">Great Together</span></h1>
            <p className="text-light/60 text-xl mb-12 leading-relaxed max-w-lg font-medium">
              Have a project in mind? We’d love to hear from you. Our team of experts is ready to help you turn your idea into reality.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-4 shrink-0 shadow-[0_0_20px_rgba(123,164,208,0.2)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Email Us</h4>
                  <p className="text-light/50">info@xonit.space</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-4 shrink-0 shadow-[0_0_20px_rgba(123,164,208,0.2)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white">Our Location</h4>
                  <p className="text-light/50">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder-white/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder-white/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-bold text-white mb-2 uppercase tracking-widest">Project Type</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white [&>option]:bg-deep [&>option]:text-white"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="saas">SaaS Product</option>
                  <option value="custom">Custom System</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2 uppercase tracking-widest">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-white placeholder-white/30"
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full !py-4 text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(123,164,208,0.3)] hover:scale-105 transition-all">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
