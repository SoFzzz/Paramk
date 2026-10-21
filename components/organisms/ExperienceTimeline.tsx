'use client';

import Tag from '@/components/atoms/Tag';
import TransitionLink from '@/components/atoms/TransitionLink';
import type { ExperienceItem, ExperienceSubItem } from '@/lib/data/experience';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { academicSemester, formatMonthYear } from '@/lib/utils/date';

const linkCls =
	"inline-flex min-h-11 w-fit items-center px-1 text-sm font-semibold sm:min-h-0 tracking-widest text-primary uppercase underline decoration-2 underline-offset-4 hover:bg-primary hover:text-white hover:no-underline data-[selected]:bg-primary data-[selected]:text-white data-[selected]:no-underline";

/** Etiqueta de fecha con el recorte en diagonal de la línea de tiempo. */
const dateChipCls =
	'w-fit max-w-full bg-secondary py-0.5 pr-4 pl-2.5 text-xs font-semibold tracking-widest text-white uppercase [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)]';

/** Proyecto anidado: una franja con regla izquierda y rombo naranja, dentro de la tarjeta. */
function SubEntry({ item }: { item: ExperienceSubItem }) {
	return (
		<li className="relative flex min-w-0 flex-col gap-1.5">
			<span
				aria-hidden="true"
				className="absolute top-1 -left-[1.47rem] size-3 rotate-45 border-2 border-primary bg-accent"
			></span>
			<span className={dateChipCls}>{item.period}</span>
			<h4 className="m-0 font-display text-lg leading-tight tracking-wide uppercase">{item.title}</h4>
			<span className="text-sm text-muted">{item.platform}</span>
			<p className="m-0 text-[15px] leading-relaxed">{item.achievement}</p>
			<div className="flex flex-wrap items-center gap-x-5 gap-y-1">
				<TransitionLink href={item.href} className={linkCls}>
					{ui.experience.viewProject} →
				</TransitionLink>
				<a href={item.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
					{ui.experience.repo} ↗<span className="sr-only"> {ui.newTab}</span>
				</a>
			</div>
		</li>
	);
}

/** Línea de tiempo vertical: marcadores angulares sobre una barra, una tarjeta por entrada. */
export default function ExperienceTimeline({ heading, items }: { heading: string; items: ExperienceItem[] }) {
	const now = useClock();
	return (
		<section className="flex min-w-0 flex-col gap-5">
			<h2 className="font-display text-[1.75rem] tracking-wider text-primary uppercase">{heading}</h2>
			<ol className="relative m-0 flex list-none flex-col gap-6 p-0 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[0.7rem] before:w-1 before:bg-secondary">
				{items.map((it) => (
					<li key={it.id} className="relative min-w-0">
						<span
							aria-hidden="true"
							className="absolute top-5 -left-[2.05rem] size-5 rotate-45 border-[3px] border-secondary bg-accent shadow-[3px_3px_0_var(--color-primary)]"
						></span>
						<div className="flex min-w-0 flex-col gap-2 bg-surface px-5 py-4 shadow-[6px_6px_0_var(--color-secondary)]">
							<span className={dateChipCls}>{it.startDate ? ui.since(formatMonthYear(it.startDate)) : it.period}</span>
							<h3 className="m-0 font-display text-xl leading-tight tracking-wide uppercase sm:text-2xl">{it.title}</h3>
							<span className="text-[15px] text-muted">
								{it.org}
								{it.startDate && ` · ${ui.semester(academicSemester(it.startDate, now), formatMonthYear(it.startDate))}`}
							</span>
							{it.badge && <span className="w-fit border-2 border-secondary px-2 py-0.5 text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{it.badge}</span>}
							<p className="m-0 text-base leading-relaxed">{it.description}</p>
							{it.achievement && <p className="m-0 text-base leading-relaxed font-medium">{it.achievement}</p>}
							{it.children && (
								<ul className="m-0 mt-2 flex list-none flex-col gap-5 border-l-2 border-primary p-0 pl-4">
									{it.children.map((c) => (
										<SubEntry key={c.id} item={c} />
									))}
								</ul>
							)}
							{it.tags && (
								<ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
									{it.tags.map((t) => (
										<li key={t}>
											<Tag size="sm">{t}</Tag>
										</li>
									))}
								</ul>
							)}
							{(it.href || it.repo) && (
								<div className="flex flex-wrap items-center gap-x-5 gap-y-1">
									{it.href && (
										<TransitionLink href={it.href} className={linkCls}>
											{ui.experience.viewProject} →
										</TransitionLink>
									)}
									{it.repo && (
										<a href={it.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
											{ui.experience.repo} ↗<span className="sr-only"> {ui.newTab}</span>
										</a>
									)}
								</div>
							)}
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
