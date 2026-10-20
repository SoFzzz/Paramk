/**
 * Navigation: menu entries (label, URL, background scene) and the route lookup used by the layout.
 * Edit labels or add sections here; sitemap.ts also reads the routes from this file.
 */
import { game } from './game';

/** Escena de fondo: 'split' panel oscuro + rayos · 'halftone' puntos · 'shards' cristales · 'crosses' rombos y cruces · 'petals' pétalos · 'sea' mar · 'stars' estrellas · 'metro' vagón. */
export type Scene = 'split' | 'halftone' | 'shards' | 'crosses' | 'petals' | 'sea' | 'stars' | 'metro' | 'sunburst';

export type NavItem = {
	id: string;
	label: string;
	href: string;
	scene: Scene;
};

/** Opciones del menú principal. */
export const menuItems: NavItem[] = [
	{ id: 'sobre-mi', label: 'Sobre mí', href: '/sobre-mi/', scene: 'sea' },
	{ id: 'acerca-de-mi', label: 'Acerca de mí', href: '/acerca-de-mi/', scene: 'sunburst' },
	{ id: 'experiencia', label: 'Experiencia', href: '/experiencia/', scene: 'halftone' },
	{ id: 'proyectos', label: 'Proyectos', href: '/proyectos/', scene: 'stars' }, // incluye el videojuego
	{ id: 'testimonios', label: 'Testimonios', href: '/testimonios/', scene: 'petals' },
	{ id: 'contacto', label: 'Contacto', href: '/contacto/', scene: 'metro' }
];

/** Todas las rutas (el menú más las que no aparecen en él). */
export const routes: NavItem[] = [
	{ id: 'inicio', label: 'Inicio', href: '/', scene: 'split' },
	...menuItems,
	{
		id: 'juego',
		label: 'Videojuego',
		href: game.path,
		scene: 'crosses'
	}
];

/** Busca la entrada de una ruta. */
export function findNav(pathname: string): NavItem {
	const clean = pathname.replace(/\/+$/, '') || '/';
	const exact = routes.find((n) => n.href.replace(/\/+$/, '') === clean);
	if (exact) return exact;
	// Cualquier otra subruta de /proyectos/ (detalle de cada proyecto)
	if (clean.startsWith('/proyectos/')) {
		return { id: 'proyecto', label: 'Proyectos', href: clean + '/', scene: 'shards' };
	}
	return routes[0];
}
