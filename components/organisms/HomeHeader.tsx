'use client';

import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import { siteMeta } from '@/lib/data/site';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { currentYear } from '@/lib/utils/date';

/** Encabezado del inicio: logo, nombre, rol y "Portafolio <año>" (el año se corrige en el navegador). */
export default function HomeHeader() {
	const now = useClock();
	return (
		<header className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-3">
				<Image src={siteMeta.logo} alt="" width={40} height={40} priority className="size-9 md:size-10" />
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
