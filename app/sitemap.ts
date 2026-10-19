import type { MetadataRoute } from 'next';
import { routes } from '@/lib/data/nav';
import { projects } from '@/lib/data/projects';
import { SITE_URL } from '@/lib/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = [...routes.map((r) => r.href), ...projects.map((p) => `/proyectos/${p.slug}/`)];
	return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
