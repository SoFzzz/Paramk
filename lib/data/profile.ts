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
	photo: '/photo-sof.png' as string | null,
	bio: [
		'Me gusta programar, experimentar con nuevas tecnologías y construir soluciones que tengan un propósito. Estoy explorando el mundo de la ciberseguridad y el cloud computing, dos áreas en las que quiero seguir creciendo. Cuando no estoy programando, probablemente estoy jugando algún RPG.',
		'He desarrollado apps para Android y Wear OS, una aplicación de escritorio y varios backends, además de un videojuego.'
	],
	/** CV en PDF (se genera con `npm run cv` a partir de cv/cv.html). */
	cv: { href: '/cv/Paula-Sofia-Gonzalez-CV.pdf', label: 'Descargar CV (PDF)' },
	/** "Datos rápidos" de Sobre mí. El semestre se calcula a partir de `education[0].startDate`. */
	quickFacts: {
		location: 'San Juan de Pasto, Nariño (Colombia)',
		languages: ['Español (nativo)', 'Inglés B2'],
		interests: ['Dibujar', 'Los RPG y los juegos de rol', 'Saltar la cuerda'],
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
		{ group: 'Backend', items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'TypeScript', 'Cloudflare Workers'] },
		{ group: 'Bases de datos', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
		{ group: 'Frontend', items: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS'] },
		{ group: 'IA y servicios', items: ['DeepSeek API', 'OCR', 'Mapbox'] },
		{ group: 'Diseño y herramientas', items: ['Design systems', 'Git y GitHub'] }
	]
};
