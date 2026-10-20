/**
 * Personal profile: name, role, tagline, bio, photo, CV, education and skills.
 * Used by Home, About me and Contact. The semester number is computed from `startDate` (see utils/date.ts).
 */
export const profile = {
	name: 'Paula Sofía González Zambrano',
	shortName: 'Paula Sofía González',
	role: 'Full Stack Developer Junior',
	studies: 'Ingeniería de Software · UCC',
	tagline: 'Me gusta convertir ideas en software y descubrir nuevas formas de construir tecnología.',
	/** Ruta de la foto procesada (WebP). Si es null se muestra el marcador. */
	photo: '/photo.webp' as string | null,
	/** Foto informal para "Acerca de mí". */
	photoCasual: '/photo-sof.png' as string | null,
	/** Perfil técnico (Sobre mí): cada especialidad se respalda con proyectos reales (slugs de projects.ts / game.ts). */
	specialties: [
		{
			title: 'Full stack · Java/Spring Boot + Next.js',
			text: 'APIs REST con autenticación JWT sobre PostgreSQL, MongoDB y Redis, y aplicaciones web con Next.js y TypeScript.',
			projects: ['veltro', 'notiz-java', 'tarium']
		},
		{
			title: 'Móvil · Android y Wear OS',
			text: 'Apps nativas con Kotlin y Jetpack Compose, incluida una app de reloj con mapas y vibración.',
			projects: ['likka-pet', 'wakesync']
		},
		{
			title: 'Backend en Python · FastAPI e IA',
			text: 'Servicios con FastAPI, OCR e integración de modelos de lenguaje (DeepSeek) en un lector de escritorio.',
			projects: ['clearread']
		},
		{
			title: 'Serverless · Cloudflare Workers',
			text: 'Lógica de servidor en el borde, desplegada como Workers para apoyar una app de Wear OS.',
			projects: ['wakesync']
		},
		{
			title: 'Búsqueda semántica y datos',
			text: 'PostgreSQL con pgvector para la búsqueda de productos por similitud, más caché con Redis y tiempo real con WebSocket.',
			projects: ['veltro', 'notiz-java']
		},
		{
			title: 'Videojuegos · Godot y GDScript',
			text: 'Lógica de juego y una IA táctica de jefes basada en utilidad, con pruebas automatizadas.',
			projects: ['descending-to-my-heaven']
		}
	],
	/** CV en PDF (se genera con `npm run cv` a partir de cv/cv.html). */
	cv: { href: '/cv/Paula-Sofia-Gonzalez-CV.pdf', label: 'Descargar CV (PDF)' },
	/** "Datos rápidos" de Acerca de mí. El semestre se calcula a partir de `education[0].startDate`. */
	quickFacts: {
		location: 'San Juan de Pasto, Nariño (Colombia)',
		languages: ['Español (nativo)', 'Inglés B2'],
		likes: ['Dibujar', 'Los RPG y los juegos de rol', 'Saltar la cuerda'],
		favoriteGames: ['Shin Megami Tensei: Devil Survivor', 'Growlanser IV']
	},
	education: [
		{
			title: 'Ingeniería de Software',
			place: 'Universidad Cooperativa de Colombia',
			/** Program start ('YYYY-MM'). The current semester is derived from it (semesters start in February and August). */
			startDate: '2024-08'
		}
	],
	skills: [
		{ group: 'Móvil y wearables', items: ['Kotlin', 'Jetpack Compose', 'Android', 'Wear OS'] },
		{ group: 'Backend', items: ['Java', 'Spring Boot', 'JWT', 'WebSocket', 'Python', 'FastAPI', 'Cloudflare Workers', 'Docker'] },
		{ group: 'Bases de datos', items: ['PostgreSQL', 'pgvector', 'MongoDB', 'Redis'] },
		{ group: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
		{ group: 'IA y servicios', items: ['DeepSeek API', 'OCR', 'Mapbox'] },
		{ group: 'Videojuegos', items: ['Godot', 'GDScript'] }
	]
};
