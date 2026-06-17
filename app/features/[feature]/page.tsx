import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFeatureContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { feature: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getFeatureContent(params.feature);
  
  if (!data) {
    return { title: 'Feature Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function FeaturePage({ params }: Props) {
  const data = getFeatureContent(params.feature);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
