'use client';

// Preferencia de movimiento del visitante ("Animaciones sí/no").
// Valor inicial: lo que dejó el script de layout.tsx en <html data-motion> (elección guardada o preferencia del sistema).

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type MotionCtx = { on: boolean; setMotion: (on: boolean) => void };

const Ctx = createContext<MotionCtx>({ on: true, setMotion: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
	// true en servidor y en la hidratación; se corrige en el efecto (el script ya fijó data-motion antes de pintar)
	const [on, setOn] = useState(true);

	useEffect(() => {
		setOn(document.documentElement.dataset.motion !== 'off');
	}, []);

	const setMotion = useCallback((value: boolean) => {
		setOn(value);
		document.documentElement.dataset.motion = value ? 'on' : 'off';
		try {
			localStorage.setItem('pf-motion', value ? 'on' : 'off');
		} catch {
			/* sin almacenamiento: solo afecta a esta visita */
		}
	}, []);

	const value = useMemo(() => ({ on, setMotion }), [on, setMotion]);
	return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Hook reactivo para componentes. */
export const useMotion = () => useContext(Ctx);

/** Para código que no es reactivo (animaciones imperativas, manejadores de teclado). */
export const motionOn = () =>
	typeof document === 'undefined' || document.documentElement.dataset.motion !== 'off';

/** Script en línea (se ejecuta antes de pintar) que fija data-motion: elección guardada o preferencia del sistema. */
export const motionInitScript = `try{var s=localStorage.getItem('pf-motion');var r=matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.dataset.motion=s||(r?'off':'on')}catch(e){document.documentElement.dataset.motion='on'}`;
