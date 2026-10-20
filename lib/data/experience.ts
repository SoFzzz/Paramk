/**
 * Experiencia: formación académica, experiencia laboral (freelance, con sus proyectos personales dentro) y proyectos en equipo.
 * La formación sale de `profile.education` (el semestre se calcula solo).
 * Los periodos de cada proyecto van del repo creado al último push en GitHub.
 */
import { game } from './game';
import { profile } from './profile';
import { projects } from './projects';

/** Proyecto anidado dentro de una entrada (p. ej. un proyecto personal dentro de la experiencia freelance). */
export type ExperienceSubItem = {
	id: string;
	title: string;
	/** Texto del periodo (p. ej. "Sep 2026 – Oct 2026"). */
	period: string;
	/** Plataforma o tecnología principal (p. ej. "Android"). */
	platform: string;
	achievement: string;
	/** Enlace interno a la página del proyecto. */
	href: string;
	/** Repositorio en GitHub. */
	repo: string;
};

export type ExperienceItem = {
	id: string;
	title: string;
	org: string;
	/** Texto del periodo; si hay `startDate` ('YYYY-MM') se muestra "Desde <mes año>" y el semestre. */
	period: string;
	startDate?: string;
	description: string;
	/** Logro o dato destacado (una línea). */
	achievement?: string;
	tags?: string[];
	/** Enlace interno (p. ej. a la página del proyecto). */
	href?: string;
	/** Repositorio en GitHub. */
	repo?: string;
	/** Etiqueta de modalidad (Colaborativo · equipo de 3, Personal, Freelance). */
	badge?: string;
	/** Proyectos anidados dentro de la entrada, del más reciente al más antiguo. */
	children?: ExperienceSubItem[];
};

export const academic: ExperienceItem[] = profile.education.map((e, i) => ({
	id: `edu-${i}`,
	title: e.title,
	org: e.place,
	period: 'Actualidad',
	startDate: e.startDate,
	description: 'Pregrado en Ingeniería de Software: desarrollo móvil, backend, bases de datos y diseño de software.'
}));

const bySlug = (slug: string) => {
	const p = projects.find((x) => x.slug === slug);
	if (!p) throw new Error(`Proyecto no encontrado: ${slug}`);
	return p;
};

/** Entrada de un proyecto personal anidada en la experiencia freelance. */
const personalSub = (slug: string, period: string, achievement: string): ExperienceSubItem => {
	const p = bySlug(slug);
	return { id: slug, title: p.title, period, platform: p.platform, achievement, href: `/proyectos/${p.slug}/`, repo: p.repo };
};

/** Entrada de un proyecto colaborativo, con su insignia de equipo. */
const teamItem = (slug: string, period: string, achievement: string): ExperienceItem => {
	const p = bySlug(slug);
	return {
		id: slug,
		title: p.title,
		org: p.platform,
		period,
		description: p.role,
		achievement,
		tags: p.stack,
		href: `/proyectos/${p.slug}/`,
		repo: p.repo,
		badge: 'Colaborativo · equipo de 3'
	};
};

/** Experiencia laboral: el trabajo freelance son mis proyectos personales (desde el primero, Tarium, en abril de 2026). Del más reciente al más antiguo. */
export const work: ExperienceItem[] = [
	{
		id: 'freelance',
		title: 'Desarrolladora freelance',
		org: 'Independiente · proyectos personales',
		period: 'Abr 2026 – Actualidad',
		description: 'Idea, diseño y programación en solitario de mis proyectos personales: apps Android y Wear OS, una app de escritorio, una web y backends.',
		tags: ['Kotlin', 'Jetpack Compose', 'Java', 'Spring Boot', 'Python', 'FastAPI', 'Next.js', 'TypeScript'],
		badge: 'Freelance',
		children: [
			personalSub('clearread', 'Sep 2026 – Oct 2026', 'Un lector para estudiantes con dislexia: sílabas en color, lectura en voz alta y asistente de IA.'),
			personalSub('wakesync', 'Sep 2026 – Oct 2026', 'Una app de reloj que estima el reposo en el trayecto y avisa con vibración al llegar.'),
			personalSub('likka-pet', 'Sep 2026 – Oct 2026', 'Una mascota virtual que cuida la postura y frena la procrastinación.'),
			personalSub('notiz-java', 'May 2026 – Jun 2026', 'Backend académico con roles, JWT, chat en tiempo real y reportes en PDF, Excel y CSV.'),
			personalSub('tarium', 'Abr 2026', 'Reproductor web que une cuatro fuentes de música, con una API de respaldo (Tarium-BD).')
		]
	}
];

/** Proyectos en equipo, del más reciente al más antiguo. */
export const team: ExperienceItem[] = [
	{
		id: 'descending',
		title: game.title,
		org: 'Videojuego · Windows',
		period: 'Oct 2026',
		description: game.role,
		achievement: 'IA táctica de tres jefes por utilidad, con memoria de combate y pruebas automatizadas.',
		tags: game.stack,
		href: game.path,
		repo: game.links.repo,
		badge: 'Colaborativo · equipo de 3'
	},
	teamItem('veltro', 'Mar 2026 – May 2026', 'Escáner de productos con IA y búsqueda semántica con pgvector sobre una API REST con JWT.')
];
