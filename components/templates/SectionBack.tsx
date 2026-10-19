'use client';

import { useEffect } from 'react';
import { ui } from '@/lib/data/ui';
import TransitionLink from '../atoms/TransitionLink';
import { useNavigate } from '../organisms/TransitionProvider';

/** Botón "Volver" y tecla Esc: suben un nivel (a `href`) pasando por la cortina de transición. */
export default function SectionBack({ href }: { href: string }) {
	const navigate = useNavigate();

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			const t = e.target as HTMLElement | null;
			if (t?.closest('input, textarea, select, [contenteditable]')) return;
			e.preventDefault();
			navigate(href);
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [href, navigate]);

	return (
		<TransitionLink
			href={href}
			className="group relative inline-flex min-h-11 items-center gap-2.5 bg-primary pr-5 pl-3.5 text-sm font-semibold tracking-widest text-white uppercase outline-none [clip-path:polygon(0_50%,14px_0,100%_0,100%_100%,14px_100%)]"
		>
			<span className="relative inline-flex items-center gap-2.5 transition-transform duration-200 ease-out-expo group-data-[selected]:translate-x-1.5">
				<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2D479" strokeWidth="3" strokeLinecap="square">
					<path d="M15 5 8 12l7 7" />
				</svg>
				{ui.back}
			</span>
			<span
				aria-hidden="true"
				className="absolute right-5 bottom-1 left-6 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-data-[selected]:scale-x-100 group-data-[selected]:delay-75"
			></span>
		</TransitionLink>
	);
}
