/**
 * "Descending to my Heaven" video game: texts, tags, facts, features and links for its card and detail page.
 */
import type { Shot } from '@/lib/data/projects';

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
	/** Sistemas del juego. */
	features: string[];
	links: { play?: string; repo?: string };
	/** Capturas en orden; la primera es la portada de la tarjeta. Sin capturas se usa la portada tipográfica. */
	shots?: Shot[];
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
	links: { repo: 'https://github.com/SoFzzz/Descending-to-my-Heaven' },
	shots: [
		{
			src: '/projects/descending-to-my-heaven/portada.png',
			alt: 'Menú principal de Descending to my Heaven con las opciones Iniciar, Opciones, Créditos y Salir sobre un cielo estrellado',
			width: 1268,
			height: 714
		},
		{
			src: '/projects/descending-to-my-heaven/captura-2.png',
			alt: 'Menú de pausa con las opciones Continuar, Opciones, Volver al menú principal y Salir del juego, sobre un patio envuelto en niebla',
			width: 1285,
			height: 709
		},
		{
			src: '/projects/descending-to-my-heaven/captura-3.png',
			alt: 'Kaelen con su espada roja frente al templo de tres pisos, bajo un cielo gris con niebla',
			width: 875,
			height: 495
		},
		{
			src: '/projects/descending-to-my-heaven/captura-4.png',
			alt: 'Combate contra Mecha King Ghidorah, el jefe mecánico de alas doradas, junto a la protagonista en una arena amurallada',
			width: 879,
			height: 446
		},
		{
			src: '/projects/descending-to-my-heaven/captura-5.png',
			alt: 'Combate contra Blackhorn y sus enemigos de máscara de pico en una sala de columnas, con un círculo rojo que marca la zona de ataque',
			width: 878,
			height: 492
		},
		{
			src: '/projects/descending-to-my-heaven/captura-6.png',
			alt: 'Combate contra Bone Dragon sobre un círculo rojo de ataque, en un pasillo de piedra en penumbra',
			width: 876,
			height: 492
		}
	]
};
