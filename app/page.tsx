import Hero from '@/sections/Home/Hero';
import TrustBar from '@/sections/Home/TrustBar';
import ProblemSection from '@/sections/Home/ProblemSection';
import BeforeAfter from '@/sections/Home/BeforeAfter';
import SolutionSection from '@/sections/Home/SolutionSection';
import IndustrySection from '@/sections/Home/IndustrySection';
import DemoSection from '@/sections/Home/DemoSection';
import ROISection from '@/sections/Home/ROISection';
import WhyXonit from '@/sections/Home/WhyXonit';
import ProcessSection from '@/sections/Home/ProcessSection';
import Integrations from '@/sections/Home/Integrations';
import FAQSection from '@/sections/Home/FAQSection';
import AuditCTA from '@/sections/Home/AuditCTA';
import CTASection from '@/sections/Home/CTASection';
import SecuritySection from '@/sections/Home/SecuritySection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar />
      <ProblemSection />
      <BeforeAfter />
      <SolutionSection />
      <IndustrySection />
      <DemoSection />
      <ROISection />
      <WhyXonit />
      <ProcessSection />
      <Integrations />
      <FAQSection />
      <AuditCTA />
      <SecuritySection />
      <CTASection />
    </div>
  );
}
