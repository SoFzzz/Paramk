/**
 * Projects list: title, summary, platform, stack, role, repository, screenshots and card colours.
 * Add or edit a project here; its detail page (/proyectos/<slug>/) and the sitemap are generated from this list.
 */
/** Captura de pantalla. `src` va. */
export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
	slug: string;
	title: string;
	summary: string;
	platform: string;
	stack: string[];
	/** Colores propios de la tarjeta (no son colores de la interfaz). */
	cover: { bg: string; dot: string; ink: string; chipBg: string; chipInk: string };
	repo: string;
	/** Demo en vivo (sitio desplegado). Sin él, la tarjeta muestra "Demo no disponible". */
	demo?: string;
	/** Enlaces extra (repositorio de la API…). */
	links?: { label: string; href: string }[];
	role: string;
	/** Colaborativo o personal; se muestra como insignia y agrupa la lista. */
	kind: 'collaborative' | 'personal';
	/** Puntos técnicos clave para la página del proyecto. */
	highlights?: string[];
	/** shots[0] es la portada de la tarjeta; sin capturas la tarjeta usa una portada tipográfica. */
	shots?: Shot[];
	/** Videos de demostración (sin audio) que se muestran en la sección #demo de la página del proyecto. */
	videos?: { src: string; title: string; poster?: string; width: number; height: number }[];
	logo?: Shot;
};

/** Textos de los enlaces de repositorio y demo (tarjetas, página del proyecto y del videojuego). */
export const linkLabels = {
	github: 'GitHub',
	demo: 'Demo',
	demoVideo: 'Demo (video)',
	demoUnavailable: 'Demo no disponible',
	/** Título de la sección de videos en la página del proyecto (id="demo"). */
	videoSection: 'Demo en video'
};

export const kindLabel: Record<Project['kind'], string> = { collaborative: 'Colaborativo', personal: 'Personal' };

export const projects: Project[] = [
	{
		slug: 'likka-pet',
		title: 'Likka-Pet',
		summary: 'Una mascota virtual que te regaña cuando procrastinas y te cuida la postura del cuello.',
		platform: 'Android',
		stack: ['Kotlin', 'Compose', 'Python', 'DeepSeek'],
		cover: { bg: '#F2C94C', dot: 'rgba(13,0,0,0.18)', ink: '#0D0000', chipBg: '#0D0000', chipInk: '#F2C94C' },
		repo: 'https://github.com/SoFzzz/Likka-Pet',
		kind: 'personal',
		role: 'Proyecto personal: idea, planificación, diseño y programación.',
		shots: [
			{ src: '/projects/likka-pet/panel.webp', alt: 'Pantalla principal de Likka-Pet: la mascota vigila el tiempo en redes del día, con avisos, días de racha y botón para pausar', width: 540, height: 1200 },
			{ src: '/projects/likka-pet/niveles.webp', alt: 'Pantalla "Cómo funciona": los tres niveles de aviso de Likka, de susurro a furia', width: 540, height: 1200 },
			{ src: '/projects/likka-pet/susurro.webp', alt: 'Likka se asoma sobre otra app y muestra un mensaje para dejar de mirar las redes', width: 540, height: 1200 },
			{ src: '/projects/likka-pet/furia.webp', alt: 'Nivel 3 de Likka: pantalla completa con la mascota furiosa y cuenta regresiva para volver al inicio', width: 540, height: 1200 },
			{ src: '/projects/likka-pet/ajustes.webp', alt: 'Ajustes de Likka-Pet: tema, idioma, apps vigiladas y mensajes con IA', width: 540, height: 1200 }
		]
	},
	{
		slug: 'wakesync',
		title: 'WakeSync',
		summary:
			'Un smartwatch que estima tu reposo en el trayecto y te avisa con vibración cuando estás por llegar.',
		platform: 'Wear OS',
		stack: ['Kotlin', 'Wear OS', 'Cloudflare Workers', 'Mapbox'],
		cover: { bg: '#2A5FD0', dot: 'rgba(255,255,255,0.28)', ink: '#ffffff', chipBg: '#0D0000', chipInk: '#ffffff' },
		repo: 'https://github.com/SoFzzz/WakeSync',
		kind: 'personal',
		role: 'Proyecto personal: idea, planificación, diseño y programación.',
		shots: [
			{ src: '/projects/wakesync/inicio.webp', alt: 'Pantalla de inicio de WakeSync en el reloj, con los modos Siesta y Siesta con destino', width: 454, height: 454 },
			{ src: '/projects/wakesync/mapa-destino.webp', alt: 'Mapa en el reloj para elegir el destino del trayecto, con un marcador y el botón Fijar destino', width: 454, height: 454 },
			{ src: '/projects/wakesync/transito.webp', alt: 'Seguimiento del trayecto en el reloj, con la distancia que falta para llegar al destino', width: 454, height: 454 },
			{ src: '/projects/wakesync/siesta-destino.webp', alt: 'Siesta con destino: nivel de reposo, ritmo cardíaco y distancia al destino en la pantalla del reloj', width: 454, height: 454 },
			{ src: '/projects/wakesync/alarma.webp', alt: 'Alerta en el reloj al acercarse al destino, con el botón para descartar la alarma', width: 454, height: 454 }
		],
		videos: [{ src: '/projects/wakesync/demo.mp4', title: 'Demostración', poster: '/projects/wakesync/demo-poster.webp', width: 640, height: 640 }],
		logo: { src: '/projects/wakesync/logo.webp', alt: 'Logo de WakeSync', width: 120, height: 142 }
	},
	{
		slug: 'clearread',
		title: 'ClearRead',
		summary:
			'Un lector para estudiantes con dislexia: sílabas en color, lectura en voz alta y un asistente de IA.',
		platform: 'Windows',
		stack: ['Python', 'OCR', 'FastAPI', 'DeepSeek'],
		cover: { bg: '#392F5A', dot: 'rgba(244,208,111,0.35)', ink: '#F4D06F', chipBg: '#F4D06F', chipInk: '#0D0000' },
		repo: 'https://github.com/SoFzzz/ClearRead',
		kind: 'personal',
		role: 'Proyecto personal: idea, planificación, diseño y programación.',
		shots: [
			{ src: '/projects/clearread/lectura-voz.webp', alt: 'Lectura en voz alta en ClearRead: la palabra que suena resaltada, la línea actual marcada y las sílabas en dos colores', width: 1280, height: 800 },
			{ src: '/projects/clearread/inicio-biblioteca.webp', alt: 'Inicio de ClearRead en modo claro: continuar lectura, subir un PDF o una foto, cifras de lectura y biblioteca con carpetas', width: 1280, height: 800 },
			{ src: '/projects/clearread/asistente-ia.webp', alt: 'Menú contextual sobre una palabra y panel del asistente de IA con el párrafo simplificado', width: 1280, height: 792 },
			{ src: '/projects/clearread/lectura-oscuro.webp', alt: 'Lectura en modo oscuro con las sílabas alternadas en amarillo y lila', width: 1280, height: 800 },
			{ src: '/projects/clearread/ajustes.webp', alt: 'Ajustes de lectura de ClearRead en modo oscuro: tema, fuente, espacios del texto, sílabas de colores, voz y vista previa', width: 1280, height: 684 }
		],
		videos: [
			{ src: '/projects/clearread/demo-1.mp4', title: 'Parte 1', poster: '/projects/clearread/demo-1-poster.webp', width: 1280, height: 668 },
			{ src: '/projects/clearread/demo-2.mp4', title: 'Parte 2', poster: '/projects/clearread/demo-2-poster.webp', width: 1280, height: 668 }
		]
	},
	{
		slug: 'veltro',
		title: 'Veltro',
		summary:
			'El backend de un sistema de inventario y punto de venta para pequeños negocios, con un escáner de productos asistido por IA.',
		platform: 'API REST',
		stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'pgvector', 'JWT'],
		cover: { bg: '#A61F1F', dot: 'rgba(242,212,121,0.28)', ink: '#F2D479', chipBg: '#0D0000', chipInk: '#F2D479' },
		repo: 'https://github.com/SoFzzz/Veltro',
		kind: 'collaborative',
		role: 'Proyecto colaborativo (equipo de 3): desarrollo del backend, con foco en el escáner de IA, la base de datos y la validación.',
		highlights: [
			'API REST con autenticación JWT (acceso y refresh), roles y límite de intentos de login.',
			'Productos, categorías, inventario, ventas, compras a proveedores con recepción parcial, alertas de stock, reportes en PDF y Excel, y auditoría.',
			'PostgreSQL con pgvector para la búsqueda semántica de productos (índice HNSW) y migraciones con Flyway.',
			'Escáner de productos con IA: visión, CLIP (ONNX) y segmentación.',
			'Patrones de diseño: State en ventas y órdenes, Strategy, Chain of Responsibility en las alertas, Command en la auditoría y eventos de dominio.',
			'Más de 70 archivos de prueba (unitarias, de controlador y de integración) y despliegue con Docker.',
			'El repositorio contiene solo el backend: no incluye el frontend.'
		]
	},
	{
		slug: 'tarium',
		title: 'Tarium',
		summary:
			'Un reproductor de música web que reúne tu biblioteca local, Spotify, Jamendo, Deezer y YouTube en una sola interfaz.',
		platform: 'Web',
		stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind'],
		cover: { bg: '#0D0000', dot: 'rgba(242,149,68,0.26)', ink: '#F29544', chipBg: '#F29544', chipInk: '#0D0000' },
		repo: 'https://github.com/SoFzzz/Tarium-Frontend',
		demo: 'https://tarium-frontend.vercel.app',
		links: [{ label: 'API (Tarium-BD)', href: 'https://github.com/SoFzzz/Tarium-BD' }],
		kind: 'personal',
		role: 'Proyecto personal: programación de la aplicación web y de su API de respaldo.',
		shots: [
			{ src: '/projects/tarium/inicio.webp', alt: 'Inicio de Tarium en modo claro: recomendaciones de música libre y botón para iniciar sesión', width: 1600, height: 771 },
			{ src: '/projects/tarium/oscuro.webp', alt: 'Inicio de Tarium en modo oscuro, con las mismas recomendaciones musicales', width: 1600, height: 774 },
			{ src: '/projects/tarium/lista.webp', alt: 'Biblioteca local de Tarium con tres archivos de audio importados, para reproducir, borrar o marcar como favorito', width: 1600, height: 778 },
			{ src: '/projects/tarium/canciones.webp', alt: 'Reproductor de Tarium con la canción en curso, su carátula y la cola de reproducción', width: 1600, height: 772 }
		],
		highlights: [
			'Reproduce desde cuatro fuentes de música y la biblioteca local de archivos de audio, con cola, favoritos y playlists.',
			'Inicio de sesión con Spotify, búsqueda, playlists y recomendaciones desde rutas de servidor de Next.js.',
			'Un adaptador de audio por fuente, combinados en uno solo, y una cola de reproducción hecha con una lista doblemente enlazada.',
			'API de respaldo en Express con TypeScript: playlists, favoritos e historial, con autenticación de Supabase.',
			'Pruebas con Vitest y Testing Library, y despliegue del frontend en Vercel.'
		]
	},
	{
		slug: 'notiz-java',
		title: 'Notiz',
		summary:
			'El backend de una plataforma de gestión académica: calificaciones, matrículas, horarios, mensajería y reportes.',
		platform: 'API REST',
		stack: ['Java 21', 'Spring Boot', 'MongoDB', 'Redis', 'WebSocket'],
		cover: { bg: '#F29544', dot: 'rgba(13,0,0,0.16)', ink: '#0D0000', chipBg: '#0D0000', chipInk: '#F29544' },
		repo: 'https://github.com/SoFzzz/Notiz-Java',
		kind: 'personal',
		role: 'Proyecto personal: diseño y programación del backend.',
		highlights: [
			'Roles de administrador, profesor, estudiante y acudiente, con autenticación JWT e inicio de sesión con Google (OAuth2).',
			'Calificaciones con escalas y criterios configurables, periodos académicos, materias, matrículas y horarios.',
			'Chat y foros en tiempo real con WebSocket (STOMP), con Redis para caché.',
			'Reportes en PDF, Excel y CSV, y correos transaccionales con SendGrid.',
			'Documentación de ingeniería: requisitos, diagramas UML y colección de Postman.',
			'Cuenta con una sola prueba automatizada (arranque del contexto).'
		]
	}
];
