import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPartnerContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { partner: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getPartnerContent(params.partner);
  
  if (!data) {
    return { title: 'Partner Ecosystem Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function PartnerPage({ params }: Props) {
  const data = getPartnerContent(params.partner);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
