import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIntegrationContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { saas: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getIntegrationContent(params.saas);
  
  if (!data) {
    return { title: 'Integration Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function IntegrationPage({ params }: Props) {
  const data = getIntegrationContent(params.saas);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
