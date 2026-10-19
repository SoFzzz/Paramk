'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';
import { useNavigate } from '../organisms/TransitionProvider';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * Enlace interno (envuelve next/link): el clic pasa por la cortina de transición y el historial jerárquico
 * (ver TransitionProvider). Clic con modificadores, botón central o target distinto se dejan al navegador.
 */
export default function TransitionLink({ href, onClick, target, ...rest }: Props) {
	const navigate = useNavigate();

	function handle(e: MouseEvent<HTMLAnchorElement>) {
		onClick?.(e);
		if (e.defaultPrevented) return;
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (target && target !== '_self')) return;
		e.preventDefault();
		navigate(href);
	}

	return <Link href={href} target={target} onClick={handle} {...rest} />;
}
