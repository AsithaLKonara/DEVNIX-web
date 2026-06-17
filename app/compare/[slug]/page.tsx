import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCompareContent } from '@/lib/content';
import { ComparisonTemplate } from '@/components/seo/ComparisonTemplate';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getCompareContent(params.slug);
  
  if (!data) {
    return { title: 'Comparison Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function ComparePage({ params }: Props) {
  const data = getCompareContent(params.slug);

  if (!data) {
    notFound();
  }

  return <ComparisonTemplate data={data} />;
}
