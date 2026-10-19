import type { ReactNode } from 'react';
import { ui } from '@/lib/data/ui';
import TransitionLink from './TransitionLink';

type Props = {
	href: string;
	variant?: 'primary' | 'secondary';
	external?: boolean;
	/** Descarga el archivo (omite el enrutador de Next y la cortina de transición) */
	download?: boolean;
	children: ReactNode;
};

/* Los estilos (.btn, .btn-fill...) viven en globals.css. Lo rojo es de quien está seleccionado (KeyNav pone
   `data-selected` con teclado o puntero); dentro de un `.btn-row` el rojo "se mueve" al botón seleccionado. */
export default function Button({ href, variant = 'primary', external = false, download = false, children }: Props) {
	const className =
		'btn relative inline-flex min-h-12 items-center gap-2.5 overflow-hidden px-6 text-[15px] font-semibold tracking-[0.08em] uppercase outline-none';
	const inner = (
		<>
			<span aria-hidden="true" className="btn-fill absolute inset-0"></span>
			<span className="btn-text relative inline-flex items-center gap-2.5">
				{children}
				{external && <span className="sr-only">{ui.newTab}</span>}
			</span>
			<span aria-hidden="true" className="btn-line absolute right-6 bottom-1.5 left-6 h-1 bg-accent"></span>
		</>
	);

	// Enlaces externos y descargas: <a> normal. Internos: pasan por la cortina de transición.
	if (external || download) {
		return (
			<a
				href={href}
				target={external ? '_blank' : undefined}
				rel={external ? 'noopener noreferrer' : undefined}
				download={download ? '' : undefined}
				data-variant={variant}
				className={className}
			>
				{inner}
			</a>
		);
	}
	return (
		<TransitionLink href={href} data-variant={variant} className={className}>
			{inner}
		</TransitionLink>
	);
}
