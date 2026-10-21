import type { CSSVars } from '@/lib/utils/css';

// Mar visto desde la cubierta de un barco, solo con siluetas del rojo pálido de la marca.
// El agua ocupa una franja bajo la línea de la baranda y se estrecha hacia la derecha, donde
// empieza la cubierta con la silueta (esa forma es el clip-path de abajo).
// Son capas de olas rellenas: las de arriba (lejos) son claras, pequeñas y lentas; las de abajo
// (cerca) son oscuras, grandes y más rápidas. Encima titilan pequeños brillos.
const TOP = 62; // vh, arriba del mar (desde md; en móvil es --sea-top: 50vh, ver .sea-clip)
// Móvil: el agua es una banda simple que ocupa la mitad inferior.
const waterSm = 'polygon(0 50vh, 100vw 47vh, 100vw 100%, 0 100%)';
const ROWS = 9;

const tone = (pct: number) => `color-mix(in oklab, var(--color-primary) ${pct}%, var(--color-background))`;

// Forma del agua (clip-path). Arriba: una línea de costa suave y ondulada. Abajo: el borde con la
// cubierta, que baja de derecha a izquierda; lo que queda debajo de él es la cubierta, libre de agua,
// donde está la silueta.
const bezier = (t: number, a: number, b: number, c: number, d: number) =>
	(1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;

const DECK_Y = 72; // vh, altura del borde de la cubierta a la derecha
const water = (() => {
	const pts: string[] = [];
	const N = 48;
	// borde de arriba, de izquierda a derecha
	for (let i = 0; i <= N; i++) {
		const x = (i / N) * 100;
		const y = TOP - 0.5 + 1.7 * Math.sin((x / 100) * 2 * Math.PI * 1.6 + 0.7) + 0.5 * Math.sin((x / 100) * 2 * Math.PI * 4.3);
		pts.push(`${x.toFixed(2)}vw ${y.toFixed(2)}vh`);
	}
	// borde con la cubierta, de derecha a izquierda: tramo casi plano y luego una curva suave hacia abajo
	const M = 40;
	for (let i = 0; i <= M; i++) {
		const t = i / M;
		const flat = t < 0.45;
		let x: number, y: number;
		if (flat) {
			x = 100 - (t / 0.45) * 52; // 100 → 48
			y = DECK_Y + 0.4 * Math.sin(t * 9 * Math.PI) * 0.6;
		} else {
			const u = (t - 0.45) / 0.55;
			x = bezier(u, 48, 42, 34, 26);
			y = bezier(u, DECK_Y, DECK_Y + 0.8, DECK_Y + 16, 100);
		}
		pts.push(`${x.toFixed(2)}vw ${y.toFixed(2)}vh`);
	}
	pts.push('0 100%');
	return `polygon(${pts.join(', ')})`;
})();

const rows = Array.from({ length: ROWS }, (_, i) => {
	const t = i / (ROWS - 1);
	const tile = Math.round(110 + 230 * t); // px, ancho de una ola
	return {
		off: 34 * Math.pow(t, 1.5), // vh bajo --sea-top
		tile,
		crest: tile / 4,
		dur: Math.round((18 - 10 * t) * 10) / 10,
		tone: 9 + Math.round(30 * t),
		rev: i % 2 === 1
	};
});

const glints = Array.from({ length: 14 }, (_, i) => ({
	left: (i * 53 + 7) % 100,
	off: 2 + ((i * 29) % 34), // vh bajo --sea-top
	w: 20 + ((i * 7) % 34),
	dur: 2.2 + ((i * 3) % 30) / 10,
	delay: -((i * 0.9) % 5)
}));

const mask = (tile: number) => {
	const m = `url(/scene/wave-fill.svg) repeat-x left top / ${tile}px 100%`;
	return { WebkitMask: m, mask: m };
};

export default function SeaBackdrop() {
	return (
		<div data-bg="sea" className="sea-clip absolute inset-0" style={{ '--clip-sm': waterSm, '--clip-md': water } as CSSVars}>
			<div className="absolute inset-0" style={{ background: tone(7) }}></div>

			{rows.map((r, i) => (
				<div key={i} className="absolute inset-x-0" style={{ top: `calc(var(--sea-top) + ${r.off}vh)`, height: `calc(100vh - var(--sea-top) - ${r.off}vh)` }}>
					{/* cresta de la ola (silueta) que se desliza; el cuerpo de abajo es liso */}
					<div
						className={`pf-mscroll absolute inset-x-0 top-0 ${r.rev ? 'pf-wave-rev' : ''}`}
						style={{ height: `${r.crest}px`, '--tile': `${r.tile}px`, '--dur': `${r.dur}s`, background: tone(r.tone), ...mask(r.tile) } as CSSVars}
					></div>
					<div className="absolute inset-x-0 bottom-0" style={{ top: `${r.crest - 1}px`, background: tone(r.tone) }}></div>
				</div>
			))}

			{glints.map((g, i) => (
				<span
					key={i}
					className="pf-glint absolute h-[2px] rounded-full bg-white"
					style={{ left: `${g.left}%`, top: `calc(var(--sea-top) + ${g.off}vh)`, width: `${g.w}px`, animationDuration: `${g.dur}s`, animationDelay: `${g.delay}s` }}
				></span>
			))}
		</div>
	);
}
