'use client';

import { ui } from '@/lib/data/ui';
import { useMotion } from '@/lib/motion/prefs';
import { cx } from '@/lib/utils/cx';

export default function MotionToggle() {
	const { on, setMotion } = useMotion();
	return (
		<button
			type="button"
			aria-pressed={on}
			onClick={() => setMotion(!on)}
			className="fixed right-3 bottom-3 z-40 inline-flex min-h-11 cursor-pointer items-center gap-2.5 border-2 border-primary bg-surface px-3.5 text-xs font-semibold tracking-widest text-primary uppercase shadow-[4px_4px_0_var(--color-secondary)] transition-transform hover:-translate-y-0.5 sm:right-5 sm:bottom-5 max-sm:size-11 max-sm:justify-center max-sm:px-0"
		>
			<span aria-hidden="true" className={cx('size-2.5 rounded-full', on ? 'bg-accent' : 'bg-muted/50')}></span>
			<span className="max-sm:sr-only">
				{ui.motion.label}: {on ? ui.motion.yes : ui.motion.no}
			</span>
		</button>
	);
}
