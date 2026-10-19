import type { Metadata } from 'next';
import { siteMeta } from './data/site';

/**
 * Metadatos de una página (sustituye a Seo.svelte): título, descripción, canonical y Open Graph.
 * `path` es la ruta con barra final; la URL absoluta se resuelve con `metadataBase` (layout raíz).
 */
export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: 'website',
			title,
			description,
			url: path,
			images: [siteMeta.ogImage],
			locale: siteMeta.locale
		},
		twitter: { card: 'summary_large_image', title, description, images: [siteMeta.ogImage] }
	};
}
