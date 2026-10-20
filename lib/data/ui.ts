/**
 * UI copy: page titles, SEO descriptions, headings, button labels and aria-labels.
 * Every user-facing string that is not profile/project/game/social data lives here (Spanish text).
 */
import { game } from './game';
import { routes } from './nav';
import { profile } from './profile';
import { siteName } from './site';

/** Section titles come from the navigation labels (nav.ts) so they are defined once. */
const navLabel = (id: string) => routes.find((r) => r.id === id)?.label ?? '';

/** Full document title for a section page: "Section · Site name". */
export const pageTitle = (title: string) => `${title} · ${siteName}`;

export const ui = {
	skipLink: 'Saltar al contenido',
	back: 'Volver',
	newTab: '(se abre en una pestaña nueva)',
	menuLabel: 'Menú principal',
	/** Word shown next to the current year in the home header. */
	portfolio: 'Portafolio',
	keys: { move: 'Mover', select: 'Seleccionar', back: 'Volver', enter: 'Enter', esc: 'Esc' },
	motion: { label: 'Animaciones', yes: 'sí', no: 'no' },
	photo: {
		placeholderLabel: 'Espacio para la foto de perfil',
		placeholderText: '[Tu foto · recorte]',
		alt: (name: string) => `Retrato de ${name}`
	},
	/** Text for the education period: "5.º semestre · desde agosto de 2024". */
	semester: (n: number, since: string) => `${n}.º semestre · desde ${since}`,
	since: (date: string) => `Desde ${date}`,
	card: {
		projectLabel: (title: string) => `Proyecto ${title}`,
		artLabel: (title: string) => `Arte de ${title}`,
		view: 'Ver proyecto',
		repo: 'Repositorio',
		gameBadge: navLabel('juego')
	},
	home: {
		title: `${profile.shortName} · ${profile.role}`,
		description: `Portafolio de ${profile.shortName}, ${profile.role} y estudiante de Ingeniería de Software. Apps Android, Wear OS y escritorio con Kotlin, Python y FastAPI.`
	},
	about: {
		title: navLabel('sobre-mi'),
		description:
			'Perfil técnico de Paula Sofía González: full stack con Java, Spring Boot y Next.js, desarrollo móvil Android y Wear OS, backends en Python y videojuegos con Godot.',
		profile: 'Perfil técnico',
		provenBy: 'Lo demuestro en',
		skills: 'Habilidades',
		education: 'Formación'
	},
	aboutMe: {
		title: navLabel('acerca-de-mi'),
		description: 'Quién soy más allá del código: de Pasto, Nariño, estudiante de Ingeniería de Software, y lo que me gusta hacer: dibujar, los RPG y saltar la cuerda.',
		intro: 'Quién soy más allá del código.',
		whoTitle: 'Quién soy',
		who: [
			'Soy Paula Sofía, estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia y vivo en San Juan de Pasto, Nariño.',
			'Fuera del computador me gusta dibujar, perderme en los RPG y en los juegos de rol, y saltar la cuerda para despejar la cabeza. Mis juegos favoritos son Shin Megami Tensei: Devil Survivor y Growlanser IV.'
		],
		quickFacts: {
			title: 'Datos rápidos',
			location: 'Ubicación',
			semester: 'Semestre',
			languages: 'Idiomas',
			likes: 'Me gusta',
			favoriteGames: 'Juegos favoritos'
		}
	},
	experience: {
		title: navLabel('experiencia'),
		description:
			'Experiencia de Paula Sofía González: Ingeniería de Software en la UCC y los proyectos de desarrollo de su GitHub, con fechas, rol y tecnologías.',
		intro: 'Mi experiencia: la universidad donde estudio, mi trabajo freelance y los proyectos de desarrollo que tengo en GitHub.',
		academic: 'Experiencia académica',
		work: 'Experiencia laboral',
		projects: 'Proyectos de desarrollo',
		viewProject: 'Ver proyecto',
		repo: 'GitHub'
	},
	testimonials: {
		title: navLabel('testimonios'),
		description: 'Lo que dicen familiares, compañeros e ingenieros que me han visto trabajar y aprender: Paula Sofía González.',
		intro: 'Lo que dicen familia, compañeros e ingenieros que me han visto aprender y trabajar.',
		quoteLabel: (name: string) => `Testimonio de ${name}`,
		photoAlt: (name: string) => `Foto de perfil de ${name}`
	},
	projects: {
		title: navLabel('proyectos'),
		description:
			'Veltro, Descending to my Heaven, Tarium, Notiz, Likka-Pet, WakeSync y ClearRead: apps, backends y un videojuego, en equipo y en solitario.',
		intro:
			'Backends, apps de Android, reloj y escritorio, una web y un videojuego. Unos los hice en equipo y otros en solitario; cada uno tiene su repositorio.',
		collaborative: 'En equipo',
		personal: 'En solitario'
	},
	project: {
		type: 'Tipo',
		platform: 'Plataforma',
		role: 'Mi rol',
		stack: 'Tecnologías',
		highlights: 'Lo más destacado',
		repo: 'Ver repositorio',
		notFound: 'Proyecto no encontrado'
	},
	game: {
		title: navLabel('juego'),
		description: `${game.title}, videojuego de ${profile.shortName}.`,
		coverLabel: (title: string) => `Portada tipográfica de ${title}`,
		genre: 'Género',
		engine: 'Motor',
		platform: 'Plataforma',
		role: 'Mi rol',
		features: 'Sistemas del juego',
		play: 'Jugar',
		repo: 'Repositorio'
	},
	contact: {
		title: navLabel('contacto'),
		description: 'Escríbeme por WhatsApp, correo o LinkedIn, usa el formulario o revisa mi código en GitHub.',
		intro: 'Escríbeme por WhatsApp, correo o LinkedIn, usa el formulario o revisa mi código en GitHub.',
		form: {
			title: 'Escríbeme',
			name: 'Nombre',
			email: 'Correo',
			message: 'Mensaje',
			submit: 'Enviar mensaje',
			errors: {
				name: 'Cuéntame tu nombre para saber a quién responder.',
				email: 'Escribe un correo válido, por ejemplo nombre@correo.com.',
				message: 'Escribe un mensaje de al menos 10 caracteres.'
			},
			subject: (name: string) => `Contacto desde el portafolio — ${name}`,
			doneTitle: '¡Listo!',
			doneText: 'Se abrió tu aplicación de correo con el mensaje. Solo falta que le des a enviar. Si no se abrió, escríbeme directamente a',
			again: 'Escribir otro mensaje'
		}
	}
};
