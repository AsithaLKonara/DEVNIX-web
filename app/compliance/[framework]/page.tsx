import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComplianceContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { framework: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getComplianceContent(params.framework);
  
  if (!data) {
    return { title: 'Compliance Framework Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function CompliancePage({ params }: Props) {
  const data = getComplianceContent(params.framework);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
