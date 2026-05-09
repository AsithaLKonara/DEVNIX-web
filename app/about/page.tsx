import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Subtle background glow blobs */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24 flex flex-col items-center">
          <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full glass border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(123,164,208,0.5)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-light/60">
              Our Agency
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter text-gradient text-glow font-display uppercase">
            Our <span className="text-white/40">Story.</span>
          </h1>
          <p className="text-light/60 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
            Founded with a vision to revolutionize the digital landscape, Xonit Space has grown into a premier software development partner for businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="aspect-square glass rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden relative border border-white/10 shadow-2xl group">
            <Image 
              src="/logo/logo.jpg" 
              alt="Xonit Vision" 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent" />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white font-display">Who We Are</h2>
            <p className="text-light/60 text-base sm:text-lg leading-relaxed font-medium">
              At Xonit, we believe that great software is built on strong foundations. Our team of passionate developers, designers, and strategists work together to deliver exceptional digital products.
            </p>
            <p className="text-light/60 text-base sm:text-lg leading-relaxed font-medium">
              We don&apos;t just write code; we solve business problems. Our approach is deeply rooted in understanding our clients&apos; businesses and their users&apos; exact operational needs.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-white/5">
              <div>
                <h4 className="text-4xl sm:text-5xl font-black text-primary mb-2 text-glow">10+</h4>
                <p className="text-light/40 font-bold uppercase tracking-widest text-[10px]">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-4xl sm:text-5xl font-black text-primary mb-2 text-glow">5+</h4>
                <p className="text-light/40 font-bold uppercase tracking-widest text-[10px]">Expert Team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 md:p-24 text-center border border-white/5 relative overflow-hidden">
          {/* Background Glow inside banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-6">Our Mission</span>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold italic leading-relaxed text-glow">
              &quot;To empower businesses with innovative, scalable, and reliable software solutions that drive growth and create lasting value in the digital world.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
