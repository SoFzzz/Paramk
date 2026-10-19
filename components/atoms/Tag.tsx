import type { ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

export default function Tag({
	kind = 'tech',
	size = 'md',
	children
}: {
	kind?: 'tech' | 'status';
	size?: 'sm' | 'md';
	children: ReactNode;
}) {
	if (kind === 'status') {
		return (
			<span className="inline-flex items-center gap-2 bg-accent px-3.5 py-1.5 text-[13px] font-semibold tracking-widest text-text uppercase [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)]">
				<span aria-hidden="true" className="size-2 rounded-full bg-text"></span>
				{children}
			</span>
		);
	}
	return (
		<span className={cx('bg-chip font-semibold text-secondary', size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-[13px]')}>
			{children}
		</span>
	);
}
