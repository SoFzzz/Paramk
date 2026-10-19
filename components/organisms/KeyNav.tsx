'use client';

// Navegación con teclado estilo Persona para las páginas de sección:
//   · Flechas (y W/A/S/D) mueven la selección en esa dirección sobre el contenido (navegación espacial).
//     Si no hay nada seleccionado, la primera pulsación selecciona el primer elemento (el botón Volver).
//     Si en esa dirección no hay más elementos, no se intercepta la tecla y la página se desplaza normal.
//   · Dos niveles opcionales: un elemento con `data-nav-group` (p. ej. una tarjeta) es una unidad en el
//     nivel 1. Enter sobre ella entra (selecciona su primer enlace/botón); dentro, las flechas solo
//     recorren sus controles y Esc vuelve a la tarjeta. Esc en el nivel 1 vuelve atrás (SectionBack).
//   · Enter activa el elemento seleccionado (nativo: tiene el foco real).
// La selección es el atributo `data-selected` (vacío): única fuente de verdad del resaltado. La ponen las flechas
// (con foco real), Tab (al enfocar) y el puntero (al moverse sobre un elemento, sin foco real); gana el último
// que se use. Los componentes estilizan solo [data-selected] (bloque rojo estilo menú del inicio), no :hover.
// En el inicio las teclas las gestiona MainMenu; aquí solo se muestra la ayuda.

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ui } from '@/lib/data/ui';
import { motionOn } from '@/lib/motion/prefs';

const SELECTOR = 'a[href], button:not([disabled]), [role="button"]';
const GROUP = '[data-nav-group]';
type Dir = 'up' | 'down' | 'left' | 'right';
const DIRS: Record<string, Dir> = {
	ArrowUp: 'up', w: 'up', W: 'up',
	ArrowDown: 'down', s: 'down', S: 'down',
	ArrowLeft: 'left', a: 'left', A: 'left',
	ArrowRight: 'right', d: 'right', D: 'right'
};

// Curvas de anime.js equivalentes
const OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
const OUT_BACK = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const main = () => document.getElementById('contenido');
const visible = (el: HTMLElement) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
const groupOf = (el: Element | null) => (el?.closest(GROUP) as HTMLElement | null) ?? null;

/** Elemento "actual": el seleccionado (si lo puso el puntero el foco real puede estar en otro lado) o el foco. */
function cursor(): HTMLElement | null {
	const s = main()?.querySelector<HTMLElement>('[data-selected]');
	return s ?? (document.activeElement as HTMLElement | null);
}

/** Nivel 1: grupos (tarjetas) y controles sueltos. Sin grupos, todos los controles. */
function topItems(): HTMLElement[] {
	const m = main();
	if (!m) return [];
	return [...m.querySelectorAll<HTMLElement>(`${SELECTOR}, ${GROUP}`)].filter((el) => (el.matches(GROUP) || !el.closest(GROUP)) && visible(el));
}

/** Nivel 2: controles dentro de un grupo. */
function innerItems(g: HTMLElement): HTMLElement[] {
	return [...g.querySelectorAll<HTMLElement>(SELECTOR)].filter(visible);
}

/** Mejor candidato en una dirección: prioriza cercanía en el eje y poca desviación en el otro. */
function pick(from: HTMLElement, list: HTMLElement[], dir: Dir) {
	const r = from.getBoundingClientRect();
	const cx = r.left + r.width / 2;
	const cy = r.top + r.height / 2;
	let best: HTMLElement | null = null;
	let bestScore = Infinity;
	for (const el of list) {
		if (el === from || from.contains(el) || el.contains(from)) continue;
		const b = el.getBoundingClientRect();
		const dx = b.left + b.width / 2 - cx;
		const dy = b.top + b.height / 2 - cy;
		const [along0, cross] = dir === 'up' || dir === 'down' ? [dy, dx] : [dx, dy];
		const sign = dir === 'down' || dir === 'right' ? 1 : -1;
		const along = along0 * sign;
		if (along < 4) continue;
		// Si se solapan en el eje transversal (misma columna/fila), cuenta menos la desviación
		const overlap =
			dir === 'up' || dir === 'down'
				? Math.min(r.right, b.right) - Math.max(r.left, b.left) > 0
				: Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 0;
		const score = along + Math.abs(cross) * (overlap ? 0.5 : 3);
		if (score < bestScore) {
			bestScore = score;
			best = el;
		}
	}
	return best;
}

/** Deja `data-selected` solo en `el` (o en ninguno). */
function mark(el: HTMLElement | null) {
	for (const old of document.querySelectorAll('[data-selected]')) if (old !== el) old.removeAttribute('data-selected');
	el?.setAttribute('data-selected', '');
}

function select(el: HTMLElement) {
	mark(el);
	el.focus({ preventScroll: true });
	const r = el.getBoundingClientRect();
	if (r.top < 80 || r.bottom > innerHeight - 80) {
		el.scrollIntoView({ block: 'center', behavior: motionOn() ? 'smooth' : 'auto' });
	}
}

export default function KeyNav() {
	const pathname = usePathname();
	const isHome = pathname === '/';
	const isHomeRef = useRef(isHome);
	isHomeRef.current = isHome;
	const arrowRef = useRef<SVGSVGElement>(null);
	const hideRef = useRef<() => void>(() => {});

	useEffect(() => {
		let current: HTMLElement | null = null;
		let lastX = -1;
		let lastY = -1;
		const arrow = () => arrowRef.current;

		function hideArrow() {
			current = null;
			const a = arrow();
			if (a) a.style.opacity = '0';
		}
		function hide() {
			hideArrow();
			mark(null);
		}
		hideRef.current = hide;

		/** Flechita junto al control seleccionado dentro de una tarjeta (solo transform/opacity). */
		function place(el: HTMLElement, animated: boolean) {
			const m = main();
			const a = arrow();
			if (!a || !m) return;
			const mr = m.getBoundingClientRect();
			const r = el.getBoundingClientRect();
			const x = Math.max(2, r.left - mr.left - 18);
			const y = r.top - mr.top + r.height / 2 - 10;
			a.style.opacity = '1';
			a.style.transform = `translate(${x}px, ${y}px)`;
			if (animated && motionOn()) {
				a.animate([{ transform: `translate(${x - 12}px, ${y}px)` }, { transform: `translate(${x}px, ${y}px)` }], { duration: 260, easing: OUT_BACK });
			}
		}

		function onKey(e: KeyboardEvent) {
			if (isHomeRef.current || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
			if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable]')) return;
			const a = cursor();

			// Selección puesta por el puntero (sin foco real): Enter activa el elemento seleccionado
			if (e.key === 'Enter' && a && a !== document.activeElement && a.hasAttribute('data-selected')) {
				e.preventDefault();
				if (a.matches(GROUP)) {
					const first = innerItems(a)[0];
					if (first) select(first);
				} else a.click();
				return;
			}

			// Enter sobre una tarjeta: entra a sus controles
			if (e.key === 'Enter' && a && a.matches(GROUP) && e.target === a) {
				const first = innerItems(a)[0];
				if (first) {
					e.preventDefault();
					select(first);
				}
				return;
			}

			const dir = DIRS[e.key];
			if (!dir) return;
			const g = a ? groupOf(a) : null;
			const inner = !!g && a !== g;
			const list = inner ? innerItems(g!) : topItems();
			if (!list.length) return;
			if (inner) {
				// Dentro de una tarjeta la selección no sale de ella (y no se desplaza la página)
				e.preventDefault();
				const next = pick(a!, list, dir);
				if (next) select(next);
				return;
			}
			const onItem = a && list.includes(a);
			if (!onItem) {
				// Foco en el cuerpo: primera pulsación = primer elemento. Foco en otro control (p. ej. el botón de animaciones): no se toca.
				if (a && a !== document.body && !a.hasAttribute('data-selected')) return;
				e.preventDefault();
				select(list[0]);
				return;
			}
			const next = pick(a!, list, dir);
			if (next) {
				e.preventDefault();
				select(next);
			}
		}

		/** Esc dentro de una tarjeta vuelve a la tarjeta. En captura para que SectionBack (volver atrás) no lo reciba. */
		function onEscCapture(e: KeyboardEvent) {
			if (isHomeRef.current || e.key !== 'Escape' || e.ctrlKey || e.metaKey || e.altKey) return;
			if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable]')) return;
			const a = cursor();
			const g = a ? groupOf(a) : null;
			if (!g || a === g || !main()?.contains(g)) return;
			e.preventDefault();
			e.stopImmediatePropagation();
			select(g);
		}

		function onFocusIn(e: FocusEvent) {
			const el = e.target as HTMLElement;
			if (isHomeRef.current || !el.matches?.(`${SELECTOR}, ${GROUP}`) || !main()?.contains(el)) return;
			// Foco por ratón: sin selección. Foco por teclado (Tab, flechas): selección visible.
			// (la selección actual, que puede venir del puntero, se conserva)
			if (!el.matches(':focus-visible')) return;
			mark(el);
			if (el.matches(GROUP) || !groupOf(el)) {
				hideArrow();
			} else {
				current = el;
				place(el, true);
			}
		}

		function onFocusOut(e: FocusEvent) {
			if (!(e.relatedTarget instanceof HTMLElement) || !main()?.contains(e.relatedTarget)) hide();
		}

		/** El puntero manda si es el último en usarse: selecciona (sin foco real) el elemento sobre el que se mueve. */
		function onPointerMove(e: PointerEvent) {
			if (isHomeRef.current || e.pointerType === 'touch') return;
			// Chrome emite movimientos sintéticos al desplazar la página: sin cambio de coordenadas no cuentan
			if (e.clientX === lastX && e.clientY === lastY) return;
			lastX = e.clientX;
			lastY = e.clientY;
			const m = main();
			const t = e.target as Element | null;
			const el = t?.closest<HTMLElement>(`${SELECTOR}, ${GROUP}`);
			if (!m || !el || !m.contains(el) || el.hasAttribute('data-selected')) return;
			mark(el);
			// La flechita del nivel 2 es solo del teclado
			hideArrow();
		}

		function reposition() {
			if (current && document.contains(current)) place(current, false);
			else hide();
		}

		window.addEventListener('keydown', onKey);
		window.addEventListener('focusin', onFocusIn);
		window.addEventListener('focusout', onFocusOut);
		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('resize', reposition);
		window.addEventListener('keydown', onEscCapture, { capture: true });
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('focusin', onFocusIn);
			window.removeEventListener('focusout', onFocusOut);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('resize', reposition);
			window.removeEventListener('keydown', onEscCapture, { capture: true });
		};
	}, []);

	// Entrada escalonada de los elementos de cada sección (como el menú del inicio)
	useEffect(() => {
		hideRef.current();
		if (isHome || !motionOn()) return;
		const frame = requestAnimationFrame(() => {
			const list = topItems().slice(0, 14);
			list.forEach((el, i) => {
				el.animate(
					[
						{ transform: 'translateY(18px)', opacity: 0 },
						{ transform: 'translateY(0)', opacity: 1 }
					],
					// fill: 'backwards' los mantiene ocultos durante el retardo; al terminar se quita todo (como `revert`)
					{ duration: 480, delay: 200 + i * 60, easing: OUT_EXPO, fill: 'backwards' }
				);
			});
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, isHome]);

	return (
		<>
			{/* Flechita del nivel 2 (dentro de una tarjeta): dentro de <main> para que se desplace con la página */}
			<svg
				ref={arrowRef}
				aria-hidden="true"
				className="pointer-events-none absolute top-0 left-0 z-30 text-primary opacity-0 max-sm:hidden"
				width="14"
				height="20"
				viewBox="0 0 14 20"
				fill="none"
				stroke="currentColor"
				strokeWidth="4"
				strokeLinecap="square"
			>
				<path d="M3 2l8 8-8 8" />
			</svg>

			{/* Ayuda de teclado: solo en escritorio */}
			<p
				className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-3 border-2 border-secondary bg-surface/90 px-3 py-1.5 text-xs font-semibold tracking-widest text-secondary uppercase lg:flex"
				aria-hidden="true"
			>
				<span className="flex items-center gap-1.5">
					<kbd className="flex items-center gap-0.5">
						{[0, 180, 270, 90].map((deg) => (
							<svg key={deg} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" style={{ transform: `rotate(${deg}deg)` }}>
								<path d="M12 20V5M5 11l7-7 7 7" />
							</svg>
						))}
					</kbd>{' '}
					{ui.keys.move}
				</span>
				<span>
					<kbd className="font-sans">{ui.keys.enter}</kbd> {ui.keys.select}
				</span>
				{!isHome && (
					<span>
						<kbd className="font-sans">{ui.keys.esc}</kbd> {ui.keys.back}
					</span>
				)}
			</p>
		</>
	);
}
