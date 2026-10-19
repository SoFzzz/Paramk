/**
 * Experiencia académica y laboral.
 * PLACEHOLDERS: la sección `work` y las fechas de los proyectos en equipo son de ejemplo.
 * EDÍTALAS con tus datos reales (empleos, prácticas, periodos). No se inventan empleadores.
 * La formación académica sale de `profile.education` (el semestre se calcula solo).
 */
import { game } from './game';
import { profile } from './profile';
import { projects } from './projects';

export type ExperienceItem = {
	id: string;
	title: string;
	org: string;
	/** Texto del periodo; si hay `startDate` ('YYYY-MM') se muestra "Desde <mes año>" y el semestre. */
	period: string;
	startDate?: string;
	description: string;
	tags?: string[];
	/** Enlace interno (p. ej. a la página del proyecto). */
	href?: string;
	/** true = contenido de ejemplo por reemplazar. */
	placeholder?: boolean;
};

const veltro = projects.find((p) => p.slug === 'veltro');

export const academic: ExperienceItem[] = [
	...profile.education.map((e, i) => ({
		id: `edu-${i}`,
		title: e.title,
		org: e.place,
		period: 'Actualidad',
		startDate: e.startDate,
		description: 'Pregrado en Ingeniería de Software: desarrollo móvil, backend, bases de datos y diseño de software.'
	})),
	{
		id: 'veltro',
		title: 'Veltro · proyecto en equipo',
		org: 'Universidad Cooperativa de Colombia',
		period: '[Periodo académico]',
		description: veltro?.role ?? '',
		tags: veltro?.stack,
		href: '/proyectos/veltro/',
		placeholder: true
	},
	{
		id: 'descending',
		title: 'Descending to my Heaven · proyecto en equipo',
		org: 'Universidad Cooperativa de Colombia',
		period: '[Periodo académico]',
		description: game.role,
		tags: game.stack,
		href: game.path,
		placeholder: true
	}
];

export const work: ExperienceItem[] = [
	{
		id: 'freelance',
		title: 'Desarrolladora freelance · proyectos personales',
		org: 'Independiente',
		period: '[Año] – Actualidad',
		description:
			'Idea, diseño y programación en solitario de Likka-Pet, WakeSync, ClearRead, Tarium y Notiz: apps Android y Wear OS, una app de escritorio, una web y backends.',
		tags: ['Kotlin', 'Python', 'FastAPI', 'Next.js'],
		href: '/proyectos/',
		placeholder: true
	},
	{
		id: 'trabajo-ejemplo',
		title: '[Cargo]',
		org: '[Empresa u organización]',
		period: '[Mes año] – [Mes año]',
		description: '[Describe tus responsabilidades y logros. Borra esta entrada si no aplica.]',
		placeholder: true
	}
];
