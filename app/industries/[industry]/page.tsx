import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndustryContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { industry: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getIndustryContent(params.industry);
  
  if (!data) {
    return { title: 'Industry Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function IndustryPage({ params }: Props) {
  const data = getIndustryContent(params.industry);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
