/**
 * Background silhouettes per section (which image, where, how it moves).
 * Siluetas del fondo. Los archivos están en `public/characters/`.
 *
 * Cada silueta es una imagen plana con transparencia: solo se usa su forma (máscara CSS),
 * así que se pinta del color que se indique. La clave es el `id` de la ruta (ver nav.ts).
 * El fondo de cada sección (cielo, estrellas, metro...) se elige con `scene` en nav.ts.
 *
 * Cada página tiene su propia BOLSA de siluetas (ninguna se comparte entre páginas) y en cada visita
 * se elige una al azar (en el navegador, después de montar; ver BackgroundMotion.tsx).
 * Si una bolsa tiene una sola, siempre sale esa (Inicio: Shiori).
 *
 * pos  → dónde se coloca:
 *   'right' · 'right-tall'  figura alta a la derecha, apoyada abajo
 *   'bottom-wide'           grupo ancho abajo a la derecha
 *   'top-right'             figura colgando desde arriba a la derecha
 *   'corner'                busto recortado: pegado a la esquina inferior derecha (borde izquierdo con degradado)
 *   'run'                   grupo que cruza la pantalla por abajo
 * anim → cómo se mueve:
 *   'sway' péndulo · 'breathe' respira · 'float' flota · 'run' corre · 'none' quieta
 *   'drift' entra deslizándose de lado y luego se mece · 'step' rebote suave de paso
 *   'tilt' inclinación lenta · 'flutter' ondeo (viento) · 'parallax' sube/baja un poco al hacer scroll
 * from → desde qué ancho se ve ('sm' = siempre, 'md' = 768 px, 'lg' = 1024 px); smOpacity la muestra también en móvil.
 *
 * La de Contacto (banca) la dibuja MetroBackdrop, porque va sentada dentro del vagón.
 */
export type Silhouette = {
	src: string;
	pos: 'right' | 'right-tall' | 'bottom-wide' | 'top-right' | 'corner' | 'run';
	anim: 'sway' | 'breathe' | 'float' | 'run' | 'none' | 'drift' | 'step' | 'tilt' | 'flutter' | 'parallax';
	/** Color de la silueta: rojo de la marca o naranja (para fondos oscuros). */
	tone: 'primary' | 'accent';
	opacity: number;
	from: 'sm' | 'md' | 'lg';
	/** Si se define, la silueta también se ve en móvil con esta opacidad (y smTone). */
	smOpacity?: number;
	smTone?: 'primary' | 'accent';
	flip?: boolean;
};

const c = (name: string) => `/characters/${name}`;

export const silhouettes: Record<string, Silhouette[]> = {
	// Shiori mira hacia el menú, sobre el panel oscuro (siempre ella)
	inicio: [{ src: c('shiori.webp'), pos: 'right-tall', anim: 'breathe', tone: 'accent', opacity: 0.9, from: 'sm' }],

	// Mar: figuras grandes y fuertes
	'sobre-mi': [
		{ src: c('touhou.webp'), pos: 'bottom-wide', anim: 'none', tone: 'primary', opacity: 0.62, from: 'sm' },
		{ src: c('saber-alter.png'), pos: 'bottom-wide', anim: 'flutter', tone: 'primary', opacity: 0.6, from: 'sm' },
		{ src: c('symphogear.png'), pos: 'bottom-wide', anim: 'drift', tone: 'primary', opacity: 0.58, from: 'sm' },
		{ src: c('chisato.png'), pos: 'right', anim: 'step', tone: 'primary', opacity: 0.55, from: 'sm' }
	],

	// Puntos de semitono: suaves
	experiencia: [
		{ src: c('madoka.png'), pos: 'bottom-wide', anim: 'breathe', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('edelgard.png'), pos: 'right', anim: 'tilt', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('archer.png'), pos: 'right', anim: 'drift', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('kyoko.png'), pos: 'right', anim: 'parallax', tone: 'primary', opacity: 0.2, from: 'sm' }
	],

	// Estrellas
	proyectos: [
		{ src: c('holly-quintet.webp'), pos: 'top-right', anim: 'sway', tone: 'primary', opacity: 0.26, from: 'sm' },
		{ src: c('cecilia.png'), pos: 'right', anim: 'float', tone: 'primary', opacity: 0.24, from: 'sm' },
		{ src: c('neon.png'), pos: 'right', anim: 'flutter', tone: 'primary', opacity: 0.24, from: 'sm' },
		{ src: c('fubuki.png'), pos: 'right', anim: 'step', tone: 'primary', opacity: 0.24, from: 'sm' }
	],

	// Detalle de cada proyecto (cristales)
	proyecto: [
		{ src: c('jack-frost.png'), pos: 'right', anim: 'float', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('astar.png'), pos: 'right', anim: 'sway', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('gigimurin.png'), pos: 'right', anim: 'step', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('korone.png'), pos: 'right', anim: 'parallax', tone: 'primary', opacity: 0.2, from: 'sm' }
	],

	// Videojuego (rombos y cruces)
	juego: [
		{ src: c('utena.webp'), pos: 'right', anim: 'float', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('chris.png'), pos: 'corner', anim: 'breathe', tone: 'primary', opacity: 0.22, from: 'sm' },
		{ src: c('sigurd.png'), pos: 'corner', anim: 'tilt', tone: 'primary', opacity: 0.22, from: 'sm', flip: true },
		{ src: c('lara.png'), pos: 'right', anim: 'drift', tone: 'primary', opacity: 0.2, from: 'sm' },
		{ src: c('silueta-festiva.png'), pos: 'bottom-wide', anim: 'step', tone: 'primary', opacity: 0.2, from: 'sm' }
	],

	// Pétalos
	testimonios: [
		{ src: c('rias.png'), pos: 'bottom-wide', anim: 'sway', tone: 'primary', opacity: 0.3, from: 'sm', flip: true },
		{ src: c('lala.png'), pos: 'right', anim: 'breathe', tone: 'primary', opacity: 0.24, from: 'sm' },
		{ src: c('yami.png'), pos: 'right', anim: 'flutter', tone: 'primary', opacity: 0.24, from: 'sm' },
		{ src: c('fuwamoco.png'), pos: 'right', anim: 'drift', tone: 'primary', opacity: 0.24, from: 'sm' }
	],

	contacto: []
};
