import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

const BASE_URL = 'https://xonitspace.com';

function getSlugsFromDirectory(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    }
  ];

  const mappings = [
    { dir: 'services', route: '/services/' },
    { dir: 'industries', route: '/industries/' },
    { dir: 'locations', route: '/locations/' },
    { dir: 'tech', route: '/tech/' },
    { dir: 'comparisons', route: '/comparisons/' },
    { dir: 'solutions', route: '/solutions/' },
    { dir: 'roles', route: '/role/' },
    { dir: 'case-studies', route: '/case-studies/' },
    { dir: 'alternatives', route: '/alternatives/' },
    { dir: 'engagement-models', route: '/engagement/' },
    { dir: 'features', route: '/features/' },
    { dir: 'methodologies', route: '/methodologies/' },
    { dir: 'partners', route: '/partners/' },
    { dir: 'compliance', route: '/compliance/' },
    { dir: 'integrations', route: '/integrations/' },
    { dir: 'startup', route: '/startup/' },
    { dir: 'blogs', route: '/blogs/' },
    { dir: 'glossary', route: '/glossary/' },
  ];

  mappings.forEach(({ dir, route }) => {
    const slugs = getSlugsFromDirectory(dir);
    slugs.forEach(slug => {
      sitemap.push({
        url: `${BASE_URL}${route}${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Local services are a special case: /[location]/[service]
  const localServicesDir = path.join(contentDirectory, 'local-services');
  if (fs.existsSync(localServicesDir)) {
    const files = fs.readdirSync(localServicesDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(localServicesDir, file), 'utf8');
      
      const locationMatch = content.match(/location:\s*"([^"]+)"/);
      const serviceMatch = content.match(/service:\s*"([^"]+)"/);

      if (locationMatch && serviceMatch) {
        // Convert to url-friendly slugs: lowercase, replace spaces with hyphens
        const locationStr = locationMatch[1].toLowerCase().replace(/\s+/g, '-');
        const serviceStr = serviceMatch[1].toLowerCase().replace(/\s+/g, '-');
        
        sitemap.push({
          url: `${BASE_URL}/${locationStr}/${serviceStr}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9, 
        });
      }
    }
  }

  return sitemap;
}
