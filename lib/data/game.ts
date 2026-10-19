/**
 * "Descending to my Heaven" video game: texts, tags, facts, features and links for its card and detail page.
 */
export type Game = {
	/** Detail page path (a public URL, so do not change it casually). */
	path: string;
	/** Title split in two lines for the big heading. */
	titleLines: [string, string];
	/** Text over the typographic cover art. */
	coverText: string;
	/** Tech tags shown on the card. */
	stack: string[];
	title: string;
	status: string;
	premise: string;
	genre: string;
	engine: string;
	platform: string;
	role: string;
	/** Sistemas del juego (no hay capturas todavía). */
	features: string[];
	links: { play?: string; repo?: string };
};

export const game: Game = {
	path: '/proyectos/descending-to-my-heaven/',
	titleLines: ['Descending', 'to my Heaven'],
	coverText: 'Boss rush · Godot',
	stack: ['Godot', 'GDScript'],
	title: 'Descending to my Heaven',
	status: 'Versión 1.0.0-rc1',
	premise:
		'Kaelen sube un templo de tres pisos sobre una isla flotante y se enfrenta a tres jefes para llegar a Elysia. Un boss rush en tercera persona con combate estilo soulslike y estética PSX.',
	genre: 'Boss rush 3D en tercera persona, estilo soulslike',
	engine: 'Godot 4.7 (GDScript)',
	platform: 'Windows',
	role: 'Proyecto colaborativo (equipo de 3): desarrollo de la lógica del videojuego y de la IA: la IA táctica de los jefes, el estado de juego y los ajustes guardados.',
	features: [
		'Tres jefes: Bone Dragon, Blackhorn y Mecha King Ghidorah.',
		'IA táctica de los jefes por utilidad: atacar, cortar el paso, esperar o flanquear, con memoria de combate.',
		'Estado de juego, menús y opciones guardadas: controles reasignables, volumen, pantalla e idioma (ES/EN).',
		'Soporte para mando de Xbox, final con diálogo y créditos.',
		'Pruebas automatizadas de la lógica en modo headless.'
	],
	links: { repo: 'https://github.com/SoFzzz/Descending-to-my-Heaven' }
};
