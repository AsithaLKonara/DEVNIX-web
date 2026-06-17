import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocalServiceContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { location: string; service: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getLocalServiceContent(params.location, params.service);
  
  if (!data) {
    return { title: 'Local Service Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function LocalServicePage({ params }: Props) {
  const data = getLocalServiceContent(params.location, params.service);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
