/**
 * Footer strings (Spanish). The nav links come from nav.ts (menuItems) and the social links from socials.ts;
 * only the texts that belong to the footer itself live here.
 */
import { siteName } from './site';

export const footer = {
	homeLabel: 'Inicio',
	navLabel: 'Navegación del pie de página',
	socialLabel: 'Contacto y redes',
	backToTop: 'Volver arriba',
	/** Texto del copyright; el año se pasa desde el componente. */
	copyright: (year: number) => `© ${year} ${siteName} · Hecho con Next.js, TypeScript y Tailwind CSS`
};
