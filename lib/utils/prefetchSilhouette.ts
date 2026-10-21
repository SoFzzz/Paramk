import { preload } from 'react-dom';
import { findNav } from '@/lib/data/nav';
import { silhouetteFor } from '@/lib/data/scene';
import { METRO_GIRL_SRC } from '@/components/organisms/backdrops/MetroBackdrop';

const done = new Set<string>();

/** Al mostrar intención de ir a una ruta interna (hover, foco, toque), baja ya la silueta de esa página. */
export function prefetchSilhouette(href: string) {
	if (!href.startsWith('/') || href.startsWith('//')) return;
	const path = href.split(/[?#]/)[0];
	if (done.has(path)) return;
	done.add(path);
	const nav = findNav(path);
	const sil = silhouetteFor(nav.id, nav.href);
	const src = sil ? sil.src : nav.scene === 'metro' ? METRO_GIRL_SRC : null;
	if (src) preload(src, { as: 'image', fetchPriority: 'low', crossOrigin: 'anonymous' });
}
