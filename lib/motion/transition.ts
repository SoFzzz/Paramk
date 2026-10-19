// Animación de la cortina de transición con la Web Animations API (sustituye a anime.js).
import { motionOn } from './prefs';

export type CurtainParts = {
	root: HTMLElement;
	/** Paneles internos (se animan con translateX). */
	panels: HTMLElement[];
	label: HTMLElement;
};

let curtain: CurtainParts | null = null;

export function registerCurtain(parts: CurtainParts) {
	curtain = parts;
	return () => {
		curtain = null;
	};
}

// Equivalentes de las curvas de anime.js
const IN_OUT_QUART = 'cubic-bezier(0.76, 0, 0.24, 1)';
const OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Anima un elemento y devuelve una promesa que se resuelve al terminar (el estado final se queda con fill: both). */
function play(el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
	return el.animate(keyframes, { fill: 'both', ...options }).finished.then(
		() => undefined,
		() => undefined // cancelada: no es un error
	);
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Anima todos los paneles con retardo escalonado y espera a que acaben. */
function playPanels(panels: HTMLElement[], from: string, to: string, step: number) {
	return Promise.all(
		panels.map((p, i) =>
			play(p, [{ transform: `translateX(${from})` }, { transform: `translateX(${to})` }], {
				duration: 260,
				delay: i * step,
				easing: IN_OUT_QUART
			})
		)
	);
}

/**
 * Cierra la cortina, ejecuta el cambio de ruta (`swap`) y la abre de nuevo.
 * Con las animaciones desactivadas (preferencia del sistema o interruptor) no hay cortina: solo se hace el cambio.
 */
export async function runTransition(label: string, swap: () => Promise<unknown>) {
	if (!curtain || !motionOn()) {
		await swap();
		return;
	}
	const { root, panels, label: labelEl } = curtain;
	labelEl.textContent = label;

	try {
		root.style.visibility = 'visible';
		root.style.opacity = '1';
		labelEl.style.opacity = '0';

		// 1) Los paneles entran en diagonal
		await playPanels(panels, '-130%', '0%', 60);
		void play(
			labelEl,
			[
				{ opacity: 0, translate: '-40px 0' },
				{ opacity: 1, translate: '0 0' }
			],
			{ duration: 260, easing: OUT_EXPO }
		);

		// 2) Cambio de ruta bajo la cortina
		await swap();
		await wait(80);

		// 3) Los paneles salen (la etiqueta se desvanece en paralelo)
		void play(labelEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: 'linear' });
		await playPanels(panels, '0%', '130%', 50);
	} finally {
		// Se cancelan las animaciones y se vuelve al estado de reposo (fuera de pantalla y oculta)
		for (const el of [root, labelEl, ...panels]) el.getAnimations().forEach((a) => a.cancel());
		root.style.visibility = 'hidden';
		root.style.opacity = '0';
		labelEl.style.opacity = '0';
	}
}
