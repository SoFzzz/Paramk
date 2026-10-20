/**
 * Siluetas del fondo: UNA fija por página (qué imagen, dónde, cómo se mueve). Los archivos están en `public/characters/`.
 *
 * Cada silueta es una imagen plana con transparencia: solo se usa su forma (máscara CSS),
 * así que se pinta del color que se indique. La clave es el `id` de la ruta (ver nav.ts).
 * El fondo de cada sección (cielo, estrellas, metro...) se elige con `scene` en nav.ts.
 *
 * pos  → dónde se coloca:
 *   'right' · 'right-tall'  figura alta a la derecha, apoyada abajo
 *   'bottom-wide'           grupo ancho abajo a la derecha
 *   'top-right'             figura colgando desde arriba a la derecha
 *   'run'                   grupo que cruza la pantalla por abajo
 *   'bust'                  busto recortado, pegado abajo y al borde derecho
 * anim → cómo se mueve: 'sway' péndulo · 'breathe' respira · 'float' flota · 'run' corre · 'none' quieta
 * from → desde qué ancho se ve ('sm' = siempre, 'md' = 768 px, 'lg' = 1024 px); smOpacity la muestra también en móvil.
 *
 * La de Contacto (banca) la dibuja MetroBackdrop, porque va sentada dentro del vagón.
 */
export type Silhouette = {
	src: string;
	pos: 'right' | 'right-tall' | 'bottom-wide' | 'top-right' | 'run' | 'bust';
	anim: 'sway' | 'breathe' | 'float' | 'run' | 'none';
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

export const silhouettes: Record<string, Silhouette | null> = {
	// Shiori mira hacia el menú, sobre el panel oscuro
	inicio: { src: c('shiori.webp'), pos: 'right-tall', anim: 'breathe', tone: 'accent', opacity: 0.9, from: 'sm' },
	// Quieta: el movimiento está en el mar
	'sobre-mi': { src: c('touhou.webp'), pos: 'bottom-wide', anim: 'none', tone: 'primary', opacity: 0.62, from: 'sm' },
	// Página nueva (columna de lectura a la izquierda): figura serena y quieta a la derecha
	'acerca-de-mi': { src: c('kyoko.png'), pos: 'right', anim: 'none', tone: 'primary', opacity: 0.2, from: 'sm' },
	// Busto recortado contra el borde derecho y el inferior; quieto
	experiencia: { src: c('chris.png'), pos: 'bust', anim: 'none', tone: 'primary', opacity: 0.2, from: 'sm' },
	proyectos: { src: c('holly-quintet.webp'), pos: 'top-right', anim: 'sway', tone: 'primary', opacity: 0.26, from: 'sm' },
	// Detalle de cada proyecto (cristales): quieta. Si el slug está en projectSilhouettes, usa la suya.
	proyecto: { src: c('astar.png'), pos: 'right', anim: 'none', tone: 'primary', opacity: 0.2, from: 'sm' },
	juego: { src: c('utena.webp'), pos: 'right', anim: 'float', tone: 'primary', opacity: 0.2, from: 'sm' },
	testimonios: { src: c('rias.png'), pos: 'bottom-wide', anim: 'sway', tone: 'primary', opacity: 0.3, from: 'sm', flip: true },
	contacto: null
};

const still = (file: string): Silhouette => ({ src: c(file), pos: 'right', anim: 'none', tone: 'primary', opacity: 0.2, from: 'sm' });

/** Silueta propia de cada proyecto, por slug (la carpeta de /proyectos/<slug>/). Los que no estén aquí usan `proyecto`. */
export const projectSilhouettes: Record<string, Silhouette> = {
	'likka-pet': still('archer.png'),
	wakesync: still('neon.png'),
	clearread: still('yami.png'),
	tarium: still('fuwamoco.png'),
	'notiz-java': still('fubuki.png'),
	veltro: still('astar.png')
};

/** Silueta de una ruta: por su id, o por el slug del proyecto en el detalle de proyecto. */
export function silhouetteFor(id: string, href: string): Silhouette | null {
	if (id === 'proyecto') {
		const slug = href.replace(/\/+$/, '').split('/').pop() ?? '';
		return projectSilhouettes[slug] ?? silhouettes.proyecto ?? null;
	}
	return silhouettes[id] ?? null;
}
