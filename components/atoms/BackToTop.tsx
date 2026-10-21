'use client';

import { useEffect, useState } from 'react';
import { footer } from '@/lib/data/footer';

/*
 * Botón fijo "Volver arriba". Aparece tras bajar un poco (en móvil, solo al subir) y en escritorio se sitúa encima del interruptor de animaciones
 * (abajo a la derecha) para no taparlo. Usa desplazamiento instantáneo si las animaciones están apagadas.
 */
export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const small = window.matchMedia('(max-width: 639px)');
		let lastY = window.scrollY;
		let idle: ReturnType<typeof setTimeout> | undefined;
		let footerIn = false;
		let tall = window.scrollY > 400;
		let recentUp = false;
		const update = () => setVisible(tall && !footerIn && (!small.matches || recentUp));
		const onScroll = () => {
			const y = window.scrollY;
			tall = y > 400;
			// En móvil solo aparece al subir y se retira sola: no se queda sobre el contenido
			if (y < lastY - 4) {
				recentUp = true;
				clearTimeout(idle);
				idle = setTimeout(() => {
					recentUp = false;
					update();
				}, 2500);
			} else if (y > lastY + 4) recentUp = false;
			lastY = y;
			update();
		};
		const f = document.querySelector('footer');
		const io = f && typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => {
			footerIn = e.isIntersecting && small.matches;
			update();
		}) : null;
		if (f) io?.observe(f);
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		small.addEventListener('change', update);
		return () => {
			clearTimeout(idle);
			io?.disconnect();
			window.removeEventListener('scroll', onScroll);
			small.removeEventListener('change', update);
		};
	}, []);

	function toTop() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const instant = reduce || document.documentElement.dataset.motion === 'off';
		window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
	}

	if (!visible) return null;

	return (
		<button
			type="button"
			onClick={toTop}
			aria-label={footer.backToTop}
			title={footer.backToTop}
			className="fixed right-3 bottom-3 z-40 inline-flex size-11 -skew-x-[12deg] cursor-pointer items-center justify-center bg-primary text-background shadow-[4px_4px_0_var(--color-secondary)] transition-transform outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-5 sm:bottom-[5.5rem]"
		>
			<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" className="skew-x-[12deg]">
				<path d="M12 20V5M5 11l7-7 7 7" />
			</svg>
		</button>
	);
}
