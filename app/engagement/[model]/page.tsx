import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEngagementContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { model: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getEngagementContent(params.model);
  
  if (!data) {
    return { title: 'Engagement Model Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function EngagementPage({ params }: Props) {
  const data = getEngagementContent(params.model);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
