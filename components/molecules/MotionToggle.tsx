'use client';

import { ui } from '@/lib/data/ui';
import { useMotion } from '@/lib/motion/prefs';
import { cx } from '@/lib/utils/cx';

/** `inline`: versión dentro del pie (móvil). La fija solo se muestra desde `sm`, para no tapar contenido en pantallas pequeñas. */
export default function MotionToggle({ inline = false }: { inline?: boolean }) {
	const { on, setMotion } = useMotion();
	return (
		<button
			type="button"
			aria-pressed={on}
			onClick={() => setMotion(!on)}
			className={cx(
				'min-h-11 cursor-pointer items-center gap-2.5 border-2 border-primary bg-surface px-3.5 text-xs font-semibold tracking-widest text-primary uppercase shadow-[4px_4px_0_var(--color-secondary)] transition-transform hover:-translate-y-0.5',
				inline ? 'inline-flex self-start sm:hidden' : 'fixed right-5 bottom-5 z-40 hidden sm:inline-flex'
			)}
		>
			<span aria-hidden="true" className={cx('size-2.5 rounded-full', on ? 'bg-accent' : 'bg-muted/50')}></span>
			<span>
				{ui.motion.label}: {on ? ui.motion.yes : ui.motion.no}
			</span>
		</button>
	);
}
