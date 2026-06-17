import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTechContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { tech: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getTechContent(params.tech);
  
  if (!data) {
    return { title: 'Technology Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function TechPage({ params }: Props) {
  const data = getTechContent(params.tech);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
