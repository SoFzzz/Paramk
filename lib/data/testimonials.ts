/**
 * Testimonios de personas que conocen a Paula Sofía. Si una entrada no tiene `photo`,
 * se muestra un avatar con las iniciales del nombre.
 */
export type Testimonial = {
	name: string;
	role: string;
	/** Cómo se conocen / en qué contexto la vieron trabajar. */
	relation: string;
	quote: string;
	/** Ruta de la foto (en /public). Opcional. */
	photo?: string;
	/** Iniciales para el avatar cuando no hay foto. */
	initials: string;
};

export const testimonials: Testimonial[] = [
	{
		name: 'Bernardo Mejía',
		role: 'Primo · familia',
		relation: 'La conoce desde la infancia',
		quote:
			'Conozco a Sofía desde que éramos niños y la he visto pasar de curiosear con el computador a programar de verdad. Cuando se propone aprender algo, no lo suelta hasta que le sale.',
		photo: '/testimonials/bernardo.webp',
		initials: 'BM'
	},
	{
		name: 'Kevin Solarte',
		role: 'Compañero · Curso corto de HTML, SENA',
		relation: 'Compañeros de clase',
		quote:
			'Coincidimos en un curso corto de HTML en el SENA. Entendía rápido las ideas nuevas y siempre estaba dispuesta a explicarme lo que a mí no me quedaba claro.',
		initials: 'KS'
	},
	{
		name: 'Ing. Mario Castillo',
		role: 'Ingeniero de Sistemas · Revisor de prácticas, área de informática del colegio',
		relation: 'Supervisó sus prácticas del colegio',
		quote:
			'Revisé sus prácticas del colegio en el área de informática. Entregaba lo asignado a tiempo, preguntaba cuando tenía dudas y se notaba su interés por seguir en esta carrera.',
		photo: '/testimonials/mario.webp',
		initials: 'MC'
	}
];
