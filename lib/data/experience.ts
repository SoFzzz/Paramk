/**
 * Experiencia: formación académica y proyectos de desarrollo (los de mi GitHub).
 * La formación sale de `profile.education` (el semestre se calcula solo).
 * Los periodos de cada proyecto van del repo creado al último push en GitHub.
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
	/** Logro o dato destacado (una línea). */
	achievement?: string;
	tags?: string[];
	/** Enlace interno (p. ej. a la página del proyecto). */
	href?: string;
	/** Repositorio en GitHub. */
	repo?: string;
	/** Etiqueta de modalidad (Colaborativo · equipo de 3, Personal). */
	badge?: string;
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

const fromProject = (slug: string, period: string, achievement: string, extra: Partial<ExperienceItem> = {}): ExperienceItem => {
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
		badge: p.kind === 'collaborative' ? 'Colaborativo · equipo de 3' : 'Personal',
		...extra
	};
};

/** Proyectos de desarrollo, del más reciente al más antiguo. */
export const projectExperience: ExperienceItem[] = [
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
	fromProject('clearread', 'Sep 2026 – Oct 2026', 'Un lector para estudiantes con dislexia: sílabas en color, lectura en voz alta y asistente de IA.'),
	fromProject('wakesync', 'Sep 2026 – Oct 2026', 'Una app de reloj que estima el reposo en el trayecto y avisa con vibración al llegar.'),
	fromProject('likka-pet', 'Sep 2026 – Oct 2026', 'Una mascota virtual que cuida la postura y frena la procrastinación.'),
	fromProject('notiz-java', 'May 2026 – Jun 2026', 'Backend académico con roles, JWT, chat en tiempo real y reportes en PDF, Excel y CSV.'),
	fromProject('tarium', 'Abr 2026', 'Reproductor web que une cuatro fuentes de música, con una API de respaldo (Tarium-BD).'),
	fromProject('veltro', 'Mar 2026 – May 2026', 'Escáner de productos con IA y búsqueda semántica con pgvector sobre una API REST con JWT.')
];
