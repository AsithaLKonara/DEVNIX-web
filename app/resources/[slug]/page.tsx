import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogContent } from '@/lib/content';
import { BlogTemplate } from '@/components/seo/BlogTemplate';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getBlogContent(params.slug);
  
  if (!data) {
    return { title: 'Resource Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function ResourcePage({ params }: Props) {
  const data = getBlogContent(params.slug);

  if (!data) {
    notFound();
  }

  return <BlogTemplate data={data} />;
}
