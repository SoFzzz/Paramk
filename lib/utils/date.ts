/** Date helpers shared by the site. Pure functions: pass `now` explicitly so they work at build time and in the browser. */

const MONTHS = [
	'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
	'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/** Calendar year of a date. */
export function currentYear(now: Date): number {
	return now.getFullYear();
}

/** Parses 'YYYY-MM' into numeric year and month (1-12). */
function parseMonth(value: string): { year: number; month: number } {
	const [year, month] = value.split('-').map(Number);
	return { year, month };
}

/** Index of the academic semester a month belongs to: semesters start in February and August (January closes the previous one). */
function semesterIndex(year: number, month: number): number {
	if (month >= 8) return year * 2 + 1;
	if (month >= 2) return year * 2;
	return (year - 1) * 2 + 1;
}

/** Academic semester number (1-based) at `now` for a program that started in `start` ('YYYY-MM'). */
export function academicSemester(start: string, now: Date): number {
	const s = parseMonth(start);
	return semesterIndex(now.getFullYear(), now.getMonth() + 1) - semesterIndex(s.year, s.month) + 1;
}

/** Formats 'YYYY-MM' as Spanish "agosto de 2024". */
export function formatMonthYear(value: string): string {
	const { year, month } = parseMonth(value);
	return `${MONTHS[month - 1]} de ${year}`;
}
