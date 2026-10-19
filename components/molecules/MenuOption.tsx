'use client';

import type { Ref } from 'react';
import { cx } from '@/lib/utils/cx';
import type { CSSVars } from '@/lib/utils/css';
import TransitionLink from '../atoms/TransitionLink';

type Props = {
	href: string;
	label: string;
	active: boolean;
	/** Desplazamiento horizontal escalonado en escritorio (px). */
	offset?: number;
	onFocus?: () => void;
	onMouseEnter?: () => void;
	ref?: Ref<HTMLAnchorElement>;
};

export default function MenuOption({ href, label, active, offset = 0, onFocus, onMouseEnter, ref }: Props) {
	const style: CSSVars = { transform: 'skewX(var(--skew))', marginLeft: `calc(${offset}px * var(--stagger, 0))` };
	return (
		<TransitionLink
			ref={ref}
			href={href}
			onFocus={onFocus}
			onMouseEnter={onMouseEnter}
			className="group relative inline-flex min-h-[2.75rem] items-center px-6 outline-none md:px-9"
			style={style}
		>
			{/* bloque rojo que se estira al enfocar */}
			<span
				aria-hidden="true"
				className={cx(
					'absolute inset-0 origin-left bg-primary shadow-[5px_5px_0_var(--color-secondary)] transition-transform duration-200 ease-snap md:shadow-[8px_8px_0_var(--color-secondary)]',
					active ? 'scale-x-100' : 'scale-x-0'
				)}
			></span>

			<span
				className={cx(
					'relative pt-[0.2em] pb-1.5 font-display text-[clamp(2rem,1.1rem+4vw,min(5.5rem,7.6vh))] leading-none tracking-wide whitespace-nowrap uppercase transition-[color,transform] duration-200 ease-out-expo',
					active ? 'translate-x-2 text-white' : 'text-primary'
				)}
			>
				{label}
			</span>

			{/* subrayado de acento */}
			<span
				aria-hidden="true"
				className={cx(
					'absolute bottom-1.5 left-6 right-6 h-1 origin-left bg-accent transition-transform duration-300 ease-out-expo md:bottom-2 md:left-9 md:right-9 md:h-1.5',
					active ? 'scale-x-100 delay-75' : 'scale-x-0'
				)}
			></span>
		</TransitionLink>
	);
}
