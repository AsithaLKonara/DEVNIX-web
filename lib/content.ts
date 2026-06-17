import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ServiceData {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  slug: string;
  content: string;
  faqs?: { question: string; answer: string }[];
  process?: { step: string; description: string }[];
  technologies?: string[];
  industries?: string[];
  pricing?: string;
  timeline?: string;
}

export function getServiceContent(category: string, service?: string): ServiceData | null {
  try {
    let fullPath = '';
    
    if (service) {
      // Sub-service page (e.g. content/services/ai-development/ai-agent-development.md)
      fullPath = path.join(contentDirectory, 'services', category, `${service}.md`);
    } else {
      // Hub page (e.g. content/services/ai-development.md)
      fullPath = path.join(contentDirectory, 'services', `${category}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: category,
      slug: service || category,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading content for category: ${category}, service: ${service}`, error);
    return null;
  }
}

export function getIndustryContent(industry: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'industries', `${industry}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'industry',
      slug: industry,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading industry content for: ${industry}`, error);
    return null;
  }
}


export function getLocationContent(city: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'locations', `${city}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'location',
      slug: city,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading location content for: ${city}`, error);
    return null;
  }
}

export function getTechContent(tech: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'tech', `${tech}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'tech',
      slug: tech,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading tech content for: ${tech}`, error);
    return null;
  }
}

export interface CompareData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  content: string;
  winner?: string;
  pros?: string[];
  cons?: string[];
  features?: { feature: string; optionA: string; optionB: string }[];
}

export function getCompareContent(slug: string): CompareData | null {
  try {
    const fullPath = path.join(contentDirectory, 'compare', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      slug: slug,
      content: content,
      winner: data.winner,
      pros: data.pros || [],
      cons: data.cons || [],
      features: data.features || [],
    };
  } catch (error) {
    console.error(`Error reading compare content for: ${slug}`, error);
    return null;
  }
}

export interface CaseStudyData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  content: string;
  metrics?: { label: string; value: string }[];
  problem?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  client?: string;
  testimonial?: { quote: string; author: string; role: string };
}

export function getCaseStudyContent(slug: string): CaseStudyData | null {
  try {
    const fullPath = path.join(contentDirectory, 'case-studies', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      slug: slug,
      content: content,
      metrics: data.metrics || [],
      problem: data.problem || '',
      solution: data.solution || '',
      results: data.results || '',
      technologies: data.technologies || [],
      client: data.client || '',
      testimonial: data.testimonial,
    };
  } catch (error) {
    console.error(`Error reading case study content for: ${slug}`, error);
    return null;
  }
}

export function getAlternativeContent(slug: string): CompareData | null {
  try {
    const fullPath = path.join(contentDirectory, 'alternatives', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      slug: slug,
      content: content,
      winner: data.winner,
      pros: data.pros || [],
      cons: data.cons || [],
      features: data.features || [],
    };
  } catch (error) {
    console.error(`Error reading alternative content for: ${slug}`, error);
    return null;
  }
}

export interface BlogData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function getBlogContent(slug: string): BlogData | null {
  try {
    const fullPath = path.join(contentDirectory, 'resources', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      slug: slug,
      content: content,
      author: data.author || 'Engineering Team',
      date: data.date || '',
      readTime: data.readTime || '5 min read',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading blog content for: ${slug}`, error);
    return null;
  }
}

export interface GlossaryData {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  content: string;
  tldr: string;
  relatedServiceUrl?: string;
  relatedServiceLabel?: string;
}

export function getGlossaryContent(slug: string): GlossaryData | null {
  try {
    const fullPath = path.join(contentDirectory, 'glossary', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      slug: slug,
      content: content,
      tldr: data.tldr || '',
      relatedServiceUrl: data.relatedServiceUrl,
      relatedServiceLabel: data.relatedServiceLabel,
    };
  } catch (error) {
    console.error(`Error reading glossary content for: ${slug}`, error);
    return null;
  }
}

export function getSolutionContent(solution: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'solutions', `${solution}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'solution',
      slug: solution,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading solution content for: ${solution}`, error);
    return null;
  }
}

export function getFeatureContent(feature: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'features', `${feature}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'feature',
      slug: feature,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading feature content for: ${feature}`, error);
    return null;
  }
}

export function getRoleContent(role: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'roles', `${role}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'role',
      slug: role,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading role content for: ${role}`, error);
    return null;
  }
}

export function getEngagementContent(model: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'engagement', `${model}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'engagement',
      slug: model,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading engagement content for: ${model}`, error);
    return null;
  }
}

export function getMethodologyContent(method: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'methodologies', `${method}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'methodology',
      slug: method,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading methodology content for: ${method}`, error);
    return null;
  }
}

export function getPartnerContent(partner: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'partners', `${partner}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'partner',
      slug: partner,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading partner content for: ${partner}`, error);
    return null;
  }
}

export function getComplianceContent(framework: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'compliance', `${framework}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'compliance',
      slug: framework,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading compliance content for: ${framework}`, error);
    return null;
  }
}

export function getIntegrationContent(saas: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'integrations', `${saas}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'integration',
      slug: saas,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading integration content for: ${saas}`, error);
    return null;
  }
}

export function getStartupContent(stage: string): ServiceData | null {
  try {
    const fullPath = path.join(contentDirectory, 'startup', `${stage}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'startup',
      slug: stage,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading startup content for: ${stage}`, error);
    return null;
  }
}

export function getLocalServiceContent(location: string, service: string): ServiceData | null {
  try {
    const slug = `${location}-${service}`;
    const fullPath = path.join(contentDirectory, 'local-services', `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      description: data.description || '',
      keywords: data.keywords || [],
      category: 'local-service',
      slug: slug,
      content: content,
      faqs: data.faqs || [],
      process: data.process || [],
      technologies: data.technologies || [],
      industries: data.industries || [],
      pricing: data.pricing || '',
      timeline: data.timeline || '',
    };
  } catch (error) {
    console.error(`Error reading local service content for: ${location}-${service}`, error);
    return null;
  }
}
