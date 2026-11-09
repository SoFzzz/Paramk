'use client';

import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { currentYear } from '@/lib/utils/date';

const photoShape = 'polygon(14% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 14%)';

/** Encabezado del inicio: foto, nombre, rol y "Portafolio <año>" (el año se corrige en el navegador). */
export default function HomeHeader() {
	const now = useClock();
	return (
		<header className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-4">
				{/* foto de perfil pequeña con el mismo corte del marco de las otras páginas y una sombra naranja */}
				<div className="relative h-14 w-12 shrink-0 md:h-[4.5rem] md:w-[3.85rem]">
					<div aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 bg-accent md:translate-x-1.5 md:translate-y-1.5" style={{ clipPath: photoShape }}></div>
					{profile.photo && (
						<Image
							src={profile.photo}
							alt={ui.photo.alt(profile.name)}
							width={440}
							height={520}
							sizes="64px"
							priority
							className="relative size-full object-cover"
							style={{ clipPath: photoShape, objectPosition: '50% 30%' }}
						/>
					)}
				</div>
				<div className="flex flex-col">
					<h1 className="m-0 font-display text-lg leading-tight tracking-wider text-primary uppercase md:text-xl">{profile.shortName}</h1>
					<p className="m-0 text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase md:text-[13px]">{profile.role}</p>
				</div>
			</div>
			<span className="hidden text-[13px] font-semibold tracking-[0.14em] text-secondary uppercase sm:inline">
				{ui.portfolio} {currentYear(now)}
			</span>
		</header>
	);
}
