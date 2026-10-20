'use client';
import type { CSSVars } from '@/lib/utils/css';
import { usePathname } from 'next/navigation';
import { findNav, type Scene } from '@/lib/data/nav';
import { silhouetteFor, type Silhouette } from '@/lib/data/scene';
import MetroBackdrop from './backdrops/MetroBackdrop';
import { BubblesBackdrop, CrossesBackdrop, HalftoneBackdrop, PetalsBackdrop, ShardsBackdrop } from './backdrops/LightBackdrops';
import SeaBackdrop from './backdrops/SeaBackdrop';
import SilhouetteLayer from './backdrops/SilhouetteLayer';
import StarsBackdrop from './backdrops/StarsBackdrop';

/** Fondo según la ruta actual: cada sección elige su escena (ver nav.ts) y su silueta fija (ver scene.ts). */
export default function RouteBackground() {
	const current = findNav(usePathname());
	return <BackgroundMotion scene={current.scene} sil={silhouetteFor(current.id, current.href)} />;
}

// Fondo vivo detrás del contenido.
export function BackgroundMotion({ scene = 'halftone', sil = null }: { scene?: Scene; sil?: Silhouette | null }) {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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
