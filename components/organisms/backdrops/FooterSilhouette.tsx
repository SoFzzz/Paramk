'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { findNav } from '@/lib/data/nav';
import { silhouetteFor } from '@/lib/data/scene';
import { MetroFooterGirl } from './MetroBackdrop';
import SilhouetteLayer from './SilhouetteLayer';

// Naranja del acento. La opacidad se queda baja a propósito: el texto blanco del pie debe seguir cumpliendo AA encima.
const ORANGE = 'var(--color-accent)';

/**
 * La silueta del fondo "continúa" en naranja sobre el pie de página. Para que NUNCA pueda alterar el layout,
 * no hay nada fijo dentro del pie: esta es una segunda capa `fixed` (con overflow oculto y `contain: paint`)
 * que vive junto al fondo, y su recorte (`clip-path`) deja ver solo lo que queda por debajo del borde superior
 * del pie. Ese borde llega en la variable `--footer-top` (px desde el borde superior de la ventana), que se
 * actualiza aquí al desplazar, al cambiar de tamaño y al cambiar de ruta.
 * Capas (todas en el mismo contexto de apilamiento de la raíz): fondo del pie (auto) < esta capa (z-1) < texto del pie (z-2).
 * Usa las mismas clases, medidas y animaciones que la original, así que se mueven a la vez.
 */
export default function FooterSilhouette() {
	const pathname = usePathname();
	const current = findNav(pathname);
	const sil = silhouetteFor(current.id, current.href);
	const metro = current.scene === 'metro';
	const ref = useRef<HTMLDivElement>(null);
	const hasContent = !!sil || metro;

	useEffect(() => {
		const layer = ref.current;
		if (!layer || !hasContent) return;
		let raf = 0;
		let last = NaN;
		const update = () => {
			raf = 0;
			const footer = document.querySelector('footer');
			if (!footer) return;
			const top = Math.round(footer.getBoundingClientRect().top);
			if (top === last) return;
			last = top;
			layer.style.setProperty('--footer-top', `${top}px`);
			// Pie fuera de la ventana: la capa no se pinta (visibility no reinicia las animaciones, display sí)
			layer.style.visibility = top >= innerHeight ? 'hidden' : 'visible';
		};
		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};
		update();
		const ro = new ResizeObserver(() => {
			last = NaN;
			schedule();
		});
		ro.observe(document.body);
		const footer = document.querySelector('footer');
		if (footer) ro.observe(footer);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			if (raf) cancelAnimationFrame(raf);
			ro.disconnect();
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
		};
	}, [pathname, hasContent]);

	if (!hasContent) return null;
	const opacity = current.id === 'inicio' ? 0.62 : 0.55;

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[1] overflow-hidden [contain:paint] [clip-path:inset(var(--footer-top,100%)_0_0_0)]"
			style={{ visibility: 'hidden' }}
		>
			{sil ? <SilhouetteLayer key={sil.src} sil={sil} tint={{ color: ORANGE, opacity }} /> : <MetroFooterGirl color={ORANGE} opacity={opacity} />}
		</div>
	);
}
