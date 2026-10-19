'use client';

import Tag from '@/components/atoms/Tag';
import TransitionLink from '@/components/atoms/TransitionLink';
import type { ExperienceItem } from '@/lib/data/experience';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { academicSemester, formatMonthYear } from '@/lib/utils/date';

/** Línea de tiempo vertical: marcadores angulares sobre una barra, una tarjeta por entrada. */
export default function ExperienceTimeline({ heading, items }: { heading: string; items: ExperienceItem[] }) {
	const now = useClock();
	return (
		<section className="flex min-w-0 flex-col gap-5">
			<h2 className="font-display text-[1.75rem] tracking-wider text-primary uppercase">{heading}</h2>
			<ol className="relative m-0 flex list-none flex-col gap-6 p-0 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[0.7rem] before:w-1 before:bg-secondary">
				{items.map((it) => (
					<li key={it.id} className="relative">
						<span
							aria-hidden="true"
							className="absolute top-5 -left-[2.05rem] size-5 rotate-45 border-[3px] border-secondary bg-accent shadow-[3px_3px_0_var(--color-primary)]"
						></span>
						<div className="flex flex-col gap-2 bg-surface px-5 py-4 shadow-[6px_6px_0_var(--color-secondary)]">
							<span className="w-fit bg-secondary py-0.5 pr-4 pl-2.5 text-xs font-semibold tracking-widest text-white uppercase [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)]">
								{it.startDate ? ui.since(formatMonthYear(it.startDate)) : it.period}
							</span>
							<h3 className="m-0 font-display text-xl leading-tight tracking-wide uppercase sm:text-2xl">{it.title}</h3>
							<span className="text-[15px] text-muted">
								{it.org}
								{it.startDate && ` · ${ui.semester(academicSemester(it.startDate, now), formatMonthYear(it.startDate))}`}
							</span>
							<p className="m-0 text-base leading-relaxed">{it.description}</p>
							{it.tags && (
								<ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
									{it.tags.map((t) => (
										<li key={t}>
											<Tag size="sm">{t}</Tag>
										</li>
									))}
								</ul>
							)}
							{it.href && (
								<TransitionLink
									href={it.href}
									className="w-fit px-1 text-sm font-semibold tracking-widest text-primary uppercase underline decoration-2 underline-offset-4 data-[selected]:bg-primary data-[selected]:text-white data-[selected]:no-underline"
								>
									{ui.experience.viewProject} →
								</TransitionLink>
							)}
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
