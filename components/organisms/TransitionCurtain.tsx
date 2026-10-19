'use client';

import { useEffect, useRef } from 'react';
import { registerCurtain } from '@/lib/motion/transition';

// Orden: secundario -> primario -> acento (el último entra y sale al final)
const colors = ['bg-secondary', 'bg-primary', 'bg-accent'];

/** Cortina diagonal de tres paneles + etiqueta del destino. La anima lib/motion/transition.ts. */
export default function TransitionCurtain() {
	const root = useRef<HTMLDivElement>(null);
	const label = useRef<HTMLSpanElement>(null);
	const panels = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (!root.current || !label.current) return;
		return registerCurtain({
			root: root.current,
			panels: panels.current.filter((p): p is HTMLDivElement => !!p),
			label: label.current
		});
	}, []);

	return (
		<div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden" style={{ visibility: 'hidden' }}>
			{colors.map((color, i) => (
				<div key={color} className="absolute inset-y-0 -left-[20%] w-[140%] -skew-x-12">
					<div
						ref={(el) => {
							panels.current[i] = el;
						}}
						className={`curtain-panel absolute inset-0 ${color}`}
					></div>
				</div>
			))}

			<div className="absolute inset-0 flex items-center justify-center">
				<span
					ref={label}
					className="font-display text-[clamp(3rem,14vw,11rem)] uppercase leading-none tracking-wide text-white"
					style={{ opacity: 0, transform: 'skewX(var(--skew))' }}
				></span>
			</div>
		</div>
	);
}
