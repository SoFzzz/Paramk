'use client';

import { profile } from '@/lib/data/profile';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { academicSemester } from '@/lib/utils/date';

/** Datos rápidos: ficha en el estilo del sitio. El semestre se calcula con la fecha del visitante (igual que Formación). */
export default function QuickFacts() {
	const now = useClock();
	const f = profile.quickFacts;
	const q = ui.aboutMe.quickFacts;
	const rows: Array<{ label: string; value: string }> = [
		{ label: q.location, value: f.location },
		{ label: q.semester, value: `${academicSemester(profile.education[0].startDate, now)}.º · ${profile.education[0].title}` },
		{ label: q.languages, value: f.languages.join(' · ') },
		{ label: q.likes, value: f.likes.join(', ') },
		{ label: q.favoriteGames, value: f.favoriteGames.join(' · ') }
	];
	return (
		<section className="flex flex-col gap-3">
			<h2 className="font-display text-[1.75rem] tracking-wider text-primary uppercase">{q.title}</h2>
			<dl className="m-0 flex max-w-xl flex-col bg-surface px-5 py-2 shadow-[6px_6px_0_var(--color-secondary)]">
				{rows.map((r) => (
					<div key={r.label} className="grid grid-cols-1 gap-0.5 border-b-2 border-secondary/15 py-3 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
						<dt className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase sm:pt-1">
							<span className="mr-2 inline-block h-2 w-2 -skew-x-12 bg-primary align-middle"></span>
							{r.label}
						</dt>
						<dd className="m-0 text-[15px] leading-snug font-medium sm:text-base">{r.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
