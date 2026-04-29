import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Story</h1>
          <p className="text-secondary text-xl leading-relaxed">
            Founded with a vision to revolutionize the digital landscape in Sri Lanka, DevNix has grown into a premier software development partner for businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="aspect-square bg-surface-100 rounded-[3rem] overflow-hidden relative shadow-inner border border-surface-200">
            <Image 
              src="/logo/logo.jpg" 
              alt="Xonit Vision" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">Who We Are</h2>
            <p className="text-secondary text-lg mb-6 leading-relaxed">
              At DevNix, we believe that great software is built on strong foundations. Our team of passionate developers, designers, and strategists work together to deliver exceptional digital products.
            </p>
            <p className="text-secondary text-lg mb-10 leading-relaxed">
              We don’t just write code; we solve problems. Our approach is deeply rooted in understanding our clients' businesses and their users' needs.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">10+</h4>
                <p className="text-surface-900 font-bold uppercase tracking-widest text-xs">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">5+</h4>
                <p className="text-surface-900 font-bold uppercase tracking-widest text-xs">Expert Team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-50 rounded-[3rem] p-12 md:p-24 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-secondary text-2xl max-w-3xl mx-auto italic leading-relaxed">
            "To empower businesses with innovative, scalable, and reliable software solutions that drive growth and create lasting value in the digital world."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
