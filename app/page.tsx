import Hero from '@/sections/Home/Hero';
import ServicesSnapshot from '@/sections/Home/ServicesSnapshot';
import ProductsSection from '@/sections/Home/ProductsSection';
import CaseStudies from '@/sections/Home/CaseStudies';
import Process from '@/sections/Home/Process';
import CTA from '@/sections/Home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSnapshot />
      <ProductsSection />
      <CaseStudies />
      <Process />
      <CTA />
    </>
  );
}
