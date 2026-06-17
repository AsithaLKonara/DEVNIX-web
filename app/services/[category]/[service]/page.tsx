import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { category: string; service: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getServiceContent(params.category, params.service);
  
  if (!data) {
    return { title: 'Service Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function ServicePage({ params }: Props) {
  const data = getServiceContent(params.category, params.service);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
