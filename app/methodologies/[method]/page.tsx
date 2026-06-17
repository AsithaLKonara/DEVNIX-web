import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMethodologyContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { method: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getMethodologyContent(params.method);
  
  if (!data) {
    return { title: 'Methodology Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function MethodologyPage({ params }: Props) {
  const data = getMethodologyContent(params.method);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
