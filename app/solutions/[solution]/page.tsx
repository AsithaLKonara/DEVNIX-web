import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { solution: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getSolutionContent(params.solution);
  
  if (!data) {
    return { title: 'Solution Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function SolutionPage({ params }: Props) {
  const data = getSolutionContent(params.solution);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
