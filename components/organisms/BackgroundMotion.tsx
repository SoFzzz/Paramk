'use client';
import type { CSSVars } from '@/lib/utils/css';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { findNav, type Scene } from '@/lib/data/nav';
import { silhouettes, type Silhouette } from '@/lib/data/scene';
import MetroBackdrop from './backdrops/MetroBackdrop';
import { CrossesBackdrop, HalftoneBackdrop, PetalsBackdrop, ShardsBackdrop, SunburstBackdrop } from './backdrops/LightBackdrops';
import SeaBackdrop from './backdrops/SeaBackdrop';
import SilhouetteLayer from './backdrops/SilhouetteLayer';
import StarsBackdrop from './backdrops/StarsBackdrop';

const lastPick: Record<string, number> = {};

/** Elige una silueta al azar de la bolsa de la página, tras montar (evita diferencias servidor/navegador) y sin repetir la anterior. */
function usePick(id: string): Silhouette | null {
	const pool = silhouettes[id] ?? [];
	const [pick, setPick] = useState<{ id: string; i: number } | null>(null);
	useEffect(() => {
		if (pool.length < 2) return;
		let i = Math.floor(Math.random() * pool.length);
		if (i === lastPick[id]) i = (i + 1) % pool.length;
		lastPick[id] = i;
		setPick({ id, i });
	}, [id, pool.length]);
	if (pool.length === 1) return pool[0];
	return pick && pick.id === id ? (pool[pick.i] ?? null) : null;
}

/** Fondo según la ruta actual: cada sección elige su escena (ver nav.ts) y una silueta de su bolsa (ver scene.ts). */
export default function RouteBackground() {
	const current = findNav(usePathname());
	return <BackgroundMotion scene={current.scene} sil={usePick(current.id)} />;
}

// Fondo vivo detrás del contenido.
export function BackgroundMotion({ scene = 'halftone', sil = null }: { scene?: Scene; sil?: Silhouette | null }) {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
			{scene === 'split' ? (
				<SunburstBackdrop />
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
