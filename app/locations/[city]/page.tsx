import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getLocationContent(params.city);
  
  if (!data) {
    return { title: 'Location Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function LocationPage({ params }: Props) {
  const data = getLocationContent(params.city);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
