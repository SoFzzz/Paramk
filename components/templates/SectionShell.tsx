import type { ReactNode } from 'react';
import SectionTitle from '../atoms/SectionTitle';
import SectionBack from './SectionBack';

/**
 * Estructura común de las páginas de sección: botón Volver (y Esc), título, introducción opcional y contenido.
 * El SEO se define en cada página con `metadata` / `generateMetadata` (ver lib/seo.ts).
 */
export default function SectionShell({
	title,
	intro,
	backHref = '/',
	aside,
	children
}: {
	title: string;
	intro?: string;
	/** Nivel superior al que vuelve el botón Volver y la tecla Esc. */
	backHref?: string;
	/** Contenido opcional a la derecha del título (solo desde lg; por debajo se oculta), para equilibrar el peso visual. */
	aside?: ReactNode;
	children: ReactNode;
}) {
	return (
		<div className="relative mx-auto flex max-w-[90rem] flex-col gap-8 px-4 pt-5 pb-16 sm:px-8 lg:pb-28 lg:gap-10 lg:px-[4.5rem] lg:pt-10">
			<header className="flex flex-wrap items-center justify-between gap-4">
				<SectionBack href={backHref} />
			</header>

			<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
				<div className="flex flex-col gap-3">
					<SectionTitle>{title}</SectionTitle>
					{intro && <p className="mt-1 ml-1 w-fit max-w-xl bg-background/85 px-3 py-1.5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
				</div>
				{aside && <div className="min-w-0 max-lg:hidden lg:w-[46%] lg:max-w-[40rem] xl:w-[52%] xl:max-w-[52rem]">{aside}</div>}
			</div>

			{children}
		</div>
	);
}
