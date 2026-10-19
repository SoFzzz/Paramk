'use client';

import { profile } from '@/lib/data/profile';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import { academicSemester, formatMonthYear } from '@/lib/utils/date';

/** Formación: el semestre actual se calcula con la fecha del visitante (ver utils/date.ts). */
export default function EducationList() {
	const now = useClock();
	return (
		<div className="flex flex-col gap-3">
			<h2 className="font-display text-[1.75rem] tracking-wider text-primary uppercase">{ui.about.education}</h2>
			{profile.education.map((e) => (
				<div key={e.title} className="flex flex-col gap-1 bg-surface px-5 py-4 shadow-[6px_6px_0_var(--color-secondary)]">
					<span className="text-[17px] font-semibold">{e.title}</span>
					<span className="text-[15px] text-muted">
						{e.place} · {ui.semester(academicSemester(e.startDate, now), formatMonthYear(e.startDate))}
					</span>
				</div>
			))}
		</div>
	);
}
