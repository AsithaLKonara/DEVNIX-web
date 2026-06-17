import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAlternativeContent } from '@/lib/content';
import { ComparisonTemplate } from '@/components/seo/ComparisonTemplate';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getAlternativeContent(params.slug);
  
  if (!data) {
    return { title: 'Alternative Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function AlternativePage({ params }: Props) {
  const data = getAlternativeContent(params.slug);

  if (!data) {
    notFound();
  }

  return <ComparisonTemplate data={data} />;
}
