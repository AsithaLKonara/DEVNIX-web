import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGlossaryContent } from '@/lib/content';
import { GlossaryTemplate } from '@/components/seo/GlossaryTemplate';

interface Props {
  params: { term: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getGlossaryContent(params.term);
  
  if (!data) {
    return { title: 'Term Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function GlossaryPage({ params }: Props) {
  const data = getGlossaryContent(params.term);

  if (!data) {
    notFound();
  }

  return <GlossaryTemplate data={data} />;
}
