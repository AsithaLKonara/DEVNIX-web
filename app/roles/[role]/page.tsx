import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRoleContent } from '@/lib/content';
import { ServicePageTemplate } from '@/components/seo/ServicePageTemplate';

interface Props {
  params: { role: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = getRoleContent(params.role);
  
  if (!data) {
    return { title: 'Role Not Found' };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords.join(', '),
  };
}

export default function RolePage({ params }: Props) {
  const data = getRoleContent(params.role);

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
