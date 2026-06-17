import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyContent } from '@/lib/content';
import { CaseStudyTemplate } from '@/components/seo/CaseStudyTemplate';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getCaseStudyContent(params.slug);
  
  if (!data) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function CaseStudyPage({ params }: Props) {
  const data = getCaseStudyContent(params.slug);

  if (!data) {
    notFound();
  }

  return <CaseStudyTemplate data={data} />;
}
