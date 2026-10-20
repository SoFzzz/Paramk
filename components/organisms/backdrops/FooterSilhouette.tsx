'use client';
import { usePathname } from 'next/navigation';
import { findNav } from '@/lib/data/nav';
import { silhouetteFor } from '@/lib/data/scene';
import { MetroFooterGirl } from './MetroBackdrop';
import SilhouetteLayer from './SilhouetteLayer';

// Naranja del acento. La opacidad se queda baja a propósito: el texto blanco del pie debe seguir cumpliendo AA encima.
const ORANGE = 'var(--color-accent)';

/**
 * Copia de la silueta de la página actual, fija y en naranja, que se ve solo sobre el pie de página.
 * Va dentro de un contenedor con `clip-path` (lo pone Footer.tsx): ese recorte también corta a los hijos
 * `position: fixed`, así la silueta del fondo "pasa" al pie sin tapar su texto. Usa las mismas clases,
 * medidas y animaciones que la original, así que se mueven a la vez.
 */
export default function FooterSilhouette() {
	const current = findNav(usePathname());
	const sil = silhouetteFor(current.id, current.href);
	const metro = current.scene === 'metro';
	if (!sil && !metro) return null;
	const color = ORANGE;
	const opacity = current.id === 'inicio' ? 0.62 : 0.55;

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
			{sil ? <SilhouetteLayer key={sil.src} sil={sil} tint={{ color, opacity }} /> : <MetroFooterGirl color={color} opacity={opacity} />}
		</div>
	);
}
