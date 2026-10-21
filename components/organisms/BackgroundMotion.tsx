'use client';
import type { CSSVars } from '@/lib/utils/css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { preload } from 'react-dom';
import { findNav, type Scene } from '@/lib/data/nav';
import { silhouetteFor, type Silhouette } from '@/lib/data/scene';
import FooterSilhouette from './backdrops/FooterSilhouette';
import MetroBackdrop, { METRO_GIRL_SRC } from './backdrops/MetroBackdrop';
import { BubblesBackdrop, CrossesBackdrop, HalftoneBackdrop, PetalsBackdrop, ShardsBackdrop } from './backdrops/LightBackdrops';
import SeaBackdrop from './backdrops/SeaBackdrop';
import SilhouetteLayer from './backdrops/SilhouetteLayer';
import StarsBackdrop from './backdrops/StarsBackdrop';

/** Fondo según la ruta actual: cada sección elige su escena (ver nav.ts) y su silueta fija (ver scene.ts). */
export default function RouteBackground() {
	const current = findNav(usePathname());
	const sil = silhouetteFor(current.id, current.href);
	// La silueta de esta página baja junto con el HTML (en el <head>), no después de hidratar.
	const src = sil ? sil.src : current.scene === 'metro' ? METRO_GIRL_SRC : null;
	if (src) preload(src, { as: 'image', fetchPriority: 'high', crossOrigin: 'anonymous' });

	// Con la pestaña oculta se pausan todas las animaciones del fondo (ver globals.css)
	useEffect(() => {
		const sync = () => {
			document.documentElement.dataset.tabHidden = document.hidden ? 'true' : 'false';
		};
		sync();
		document.addEventListener('visibilitychange', sync);
		return () => document.removeEventListener('visibilitychange', sync);
	}, []);

	return (
		<>
			<BackgroundMotion scene={current.scene} sil={sil} />
			{/* Segunda capa fija, FUERA del pie: la silueta en naranja, recortada a la zona del pie */}
			<FooterSilhouette />
		</>
	);
}

// Fondo vivo detrás del contenido.
export function BackgroundMotion({ scene = 'halftone', sil = null }: { scene?: Scene; sil?: Silhouette | null }) {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:paint]">
			{scene === 'split' ? (
				/* franjas muy suaves que se deslizan */
				<div
					className="pf-stripes absolute -inset-[10%] -rotate-[8deg]"
					style={
						{
							'--tile': '180px',
							'--dur': '9s',
							backgroundImage: 'repeating-linear-gradient(90deg, rgba(191,36,36,0.05) 0 90px, transparent 90px 180px)',
							backgroundSize: '180px 100%'
						} as CSSVars
					}
				></div>
			) : scene === 'bubbles' ? (
				<BubblesBackdrop />
			) : scene === 'halftone' ? (
				<HalftoneBackdrop />
			) : scene === 'shards' ? (
				<ShardsBackdrop />
			) : scene === 'crosses' ? (
				<CrossesBackdrop />
			) : scene === 'petals' ? (
				<PetalsBackdrop />
			) : scene === 'sea' ? (
				<SeaBackdrop />
			) : scene === 'stars' ? (
				<StarsBackdrop />
			) : scene === 'metro' ? (
				<MetroBackdrop />
			) : null}

			{scene === 'split' && (
				/* panel oscuro: franja inferior en móvil y diagonal a la derecha desde lg */
				<div
					data-bg="panel"
					className="absolute inset-x-0 bottom-0 h-[46vh] [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)] lg:inset-x-auto lg:top-0 lg:right-0 lg:h-full lg:w-[50%] lg:[clip-path:polygon(26%_0,100%_0,100%_100%,0_100%)]"
					style={{ background: 'linear-gradient(160deg, var(--color-secondary) 0%, color-mix(in oklab, var(--color-primary) 45%, var(--color-secondary)) 100%)' }}
				>
					<div
						className="pf-stripes-fast absolute -inset-[20%] -rotate-[8deg]"
						style={
							{
								'--tile': '120px',
								'--dur': '5s',
								backgroundImage: 'repeating-linear-gradient(90deg, rgba(242,149,68,0.09) 0 36px, transparent 36px 120px)',
								backgroundSize: '120px 100%'
							} as CSSVars
						}
					></div>
				</div>
			)}

			{sil && <SilhouetteLayer key={sil.src} sil={sil} />}
		</div>
	);
}
