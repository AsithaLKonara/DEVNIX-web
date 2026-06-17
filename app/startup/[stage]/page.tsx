import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStartupContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { stage: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getStartupContent(params.stage);
  
  if (!data) {
    return { title: 'Startup Stage Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function StartupPage({ params }: Props) {
  const data = getStartupContent(params.stage);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
