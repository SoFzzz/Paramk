'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { findNav } from '@/lib/data/nav';
import { runTransition } from '@/lib/motion/transition';

/**
 * Navegación con cortina e historial jerárquico: Inicio (0) → sección (1) → detalle (2).
 * - Bajar un nivel agrega una entrada al historial.
 * - Ir a una página del mismo nivel (o superior sin haber estado ahí) reemplaza la entrada actual.
 * - Subir (Volver, Esc) retrocede en el historial si el destino ya está atrás.
 * Así el botón Atrás del navegador recorre detalle → sección → Inicio → fuera del sitio.
 * Toda navegación interna iniciada por la app (TransitionLink, MainMenu, Esc) pasa por `navigate`.
 */
type Navigate = (href: string) => void;

const Ctx = createContext<Navigate>(() => {});

/** Función de navegación con cortina (para enlaces, menú y teclas). */
export const useNavigate = () => useContext(Ctx);

const depth = (p: string) => p.split('/').filter(Boolean).length;

/** Ruta normalizada con barra final, sin consulta ni hash. */
const normalize = (p: string) => (p.endsWith('/') ? p : p + '/');

export default function TransitionProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();

	// Estado mutable (no provoca render): rutas visitadas alineadas con el historial y posición actual
	const s = useRef({
		trail: [] as string[],
		idx: 0,
		busy: false,
		internalPop: false,
		path: pathname,
		waiter: null as null | { target: string | null; resolve: () => void }
	});

	// Cada cambio de ruta: inicializa el rastro y despierta a quien espera que la nueva página esté lista
	useEffect(() => {
		const st = s.current;
		st.path = pathname;
		if (st.trail.length === 0) st.trail = [pathname];
		const w = st.waiter;
		if (w && (w.target === null || w.target === pathname)) {
			st.waiter = null;
			w.resolve();
		}
	}, [pathname]);

	// Atrás/adelante del navegador (sin cortina): se ajusta la posición en el rastro; si el salto es desconocido, se reinicia.
	useEffect(() => {
		function onPop() {
			const st = s.current;
			if (st.internalPop) return;
			const path = normalize(location.pathname);
			if (st.trail[st.idx - 1] === path) st.idx--;
			else if (st.trail[st.idx + 1] === path) st.idx++;
			else {
				st.trail = [path];
				st.idx = 0;
			}
		}
		window.addEventListener('popstate', onPop);
		return () => window.removeEventListener('popstate', onPop);
	}, []);

	/** Espera a que la ruta cambie (a `target`, o a cualquiera si es null), con un tope de seguridad. */
	const waitForPath = useCallback((target: string | null) => {
		return new Promise<void>((resolve) => {
			const timer = setTimeout(done, 2500);
			function done() {
				clearTimeout(timer);
				if (s.current.waiter?.resolve === done) s.current.waiter = null;
				resolve();
			}
			s.current.waiter = { target, resolve: done };
		});
	}, []);

	const navigate = useCallback<Navigate>(
		(href) => {
			const st = s.current;
			if (st.busy) return;
			const url = new URL(href, location.href);
			if (url.origin !== location.origin) {
				location.href = href;
				return;
			}
			const to = normalize(url.pathname);
			if (to === normalize(st.path)) return;

			st.busy = true;
			const from = depth(st.path);
			const dest = depth(to);
			const label = findNav(to).label;

			let swap: () => Promise<unknown>;
			const back = dest < from && st.idx > 0 ? st.trail.lastIndexOf(to, st.idx - 1) : -1;
			if (back >= 0) {
				// El destino ya está atrás en el historial: se retrocede en vez de apilar otra entrada
				const delta = back - st.idx;
				swap = () => {
					st.internalPop = true;
					const done = waitForPath(to).finally(() => {
						st.internalPop = false;
						st.idx = back;
					});
					history.go(delta);
					return done;
				};
			} else {
				const replace = dest <= from;
				swap = () => {
					if (replace) {
						st.trail[st.idx] = to;
						router.replace(to + url.search + url.hash);
					} else {
						st.trail = [...st.trail.slice(0, st.idx + 1), to];
						st.idx++;
						router.push(to + url.search + url.hash);
					}
					return waitForPath(to);
				};
			}
			runTransition(label, swap).finally(() => {
				st.busy = false;
			});
		},
		[router, waitForPath]
	);

	const value = useMemo(() => navigate, [navigate]);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
