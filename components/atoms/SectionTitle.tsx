import type { ReactNode } from 'react';

export default function SectionTitle({ children }: { children: ReactNode }) {
	return (
		<h1
			className="inline-block self-start bg-primary px-6 pt-[0.2em] pr-10 pb-1 font-display text-[clamp(3rem,2rem+6vw,6rem)] leading-[1.05] tracking-wide text-white uppercase shadow-[6px_6px_0_var(--color-secondary)] md:shadow-[8px_8px_0_var(--color-secondary)]"
			style={{ transform: 'skewX(var(--skew))' }}
		>
			{children}
		</h1>
	);
}
