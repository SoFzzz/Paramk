import type { CSSVars } from '@/lib/utils/css';

// Fondos animados para las páginas claras (en lugar de las franjas). Todos son CSS puro, de bajo contraste
// y solo animan transform/opacity. Los valores salen de fórmulas (no de Math.random) para que el servidor
// y el navegador pinten lo mismo.
const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-highlight)'];
const fadeLeft = 'linear-gradient(to left, #000 15%, rgba(0,0,0,0.25) 75%, transparent 100%)';

const bubbles = Array.from({ length: 18 }, (_, i) => ({
	left: (i * 37 + 9) % 96,
	top: (i * 53 + 11) % 92,
	size: 14 + ((i * 17) % 70),
	dur: 22 + ((i * 7) % 24),
	delay: -((i * 5.3) % 30),
	dx: (((i * 23) % 9) - 4) * 12,
	dy: (((i * 31) % 9) - 4) * 10,
	color: colors[i % 3],
	op: 0.1 + ((i * 3) % 4) * 0.035
}));

/** Acerca de mí: bolitas suaves de distintos tamaños que flotan despacio, de muy bajo contraste. */
export function BubblesBackdrop() {
	return (
		<div className="absolute inset-0">
			{bubbles.map((b, i) => (
				<div
					key={i}
					className="pf-bubble absolute rounded-full"
					style={
						{
							left: `${b.left}%`,
							top: `${b.top}%`,
							width: b.size,
							height: b.size,
							animationDuration: `${b.dur}s`,
							animationDelay: `${b.delay}s`,
							'--dx': `${b.dx}px`,
							'--dy': `${b.dy}px`,
							background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${b.color} 75%, white) 0%, ${b.color} 70%)`,
							opacity: b.op
						} as CSSVars
					}
				></div>
			))}
		</div>
	);
}

/** Experiencia: campo de puntos de semitono que se desliza en diagonal, más denso a la derecha. */
export function HalftoneBackdrop() {
	const layer = (tile: number, dur: number, r: number, color: string, rev?: boolean): CSSVars => ({
		'--tile': `${tile}px`,
		'--dur': `${dur}s`,
		backgroundImage: `radial-gradient(circle at center, ${color} ${r}px, transparent ${r + 0.8}px)`,
		backgroundSize: `${tile}px ${tile}px`,
		...(rev ? { animationDirection: 'reverse' } : {})
	});
	return (
		<div className="absolute inset-0" style={{ WebkitMaskImage: fadeLeft, maskImage: fadeLeft }}>
			<div className="pf-dots absolute" style={layer(30, 14, 3.4, 'rgba(191,36,36,0.2)')}></div>
			<div className="pf-dots absolute" style={layer(72, 26, 7, 'rgba(242,149,68,0.28)', true)}></div>
		</div>
	);
}

const shards = [
	{ top: -10, h: 70, w: 26, dur: 58, delay: -10, rgb: '191,36,36', a: 0.07, clip: '0 0, 100% 12%, 70% 100%, 10% 86%' },
	{ top: 20, h: 90, w: 34, dur: 76, delay: -44, rgb: '242,149,68', a: 0.09, clip: '20% 0, 100% 0, 80% 100%, 0 70%' },
	{ top: -20, h: 80, w: 20, dur: 50, delay: -30, rgb: '242,212,121', a: 0.1, clip: '0 18%, 90% 0, 100% 100%, 30% 80%' },
	{ top: 35, h: 75, w: 30, dur: 90, delay: -62, rgb: '191,36,36', a: 0.05, clip: '12% 0, 100% 30%, 86% 100%, 0 100%' },
	{ top: 0, h: 60, w: 16, dur: 44, delay: -2, rgb: '13,0,0', a: 0.035, clip: '0 0, 100% 20%, 60% 100%, 20% 70%' },
	{ top: 45, h: 70, w: 24, dur: 66, delay: -20, rgb: '242,149,68', a: 0.1, clip: '30% 0, 100% 10%, 70% 100%, 0 90%' }
];

/** Detalle de proyecto: cristales angulares que cruzan la pantalla (papel rasgado en diagonal). */
export function ShardsBackdrop() {
	return (
		<div className="absolute inset-0">
			{shards.map((s, i) => (
				<div
					key={i}
					className="pf-shard absolute left-0"
					style={{ top: `${s.top}vh`, height: `${s.h}vh`, width: `${s.w}vw`, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
				>
					<div className="size-full" style={{ background: `rgba(${s.rgb},${s.a})`, clipPath: `polygon(${s.clip})` }}></div>
				</div>
			))}
		</div>
	);
}

const shapes = [
	'polygon(35% 0, 65% 0, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0 65%, 0 35%, 35% 35%)',
	'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
	'polygon(50% 0, 100% 50%, 50% 100%, 0 50%, 50% 0, 50% 24%, 24% 50%, 50% 76%, 76% 50%, 50% 24%)'
];
const risers = Array.from({ length: 22 }, (_, i) => ({
	left: (i * 41 + 7) % 100,
	size: 14 + ((i * 11) % 26),
	dur: 20 + ((i * 7) % 18),
	delay: -((i * 3.1) % 30),
	color: colors[i % 3],
	op: 0.12 + ((i * 3) % 4) * 0.04,
	spin: (i % 2 ? 1 : -1) * (90 + ((i * 29) % 200)),
	y0: (i * 31) % 95,
	shape: shapes[i % 3]
}));

/** Videojuego: rombos y cruces geométricas que suben flotando y giran. */
export function CrossesBackdrop() {
	return (
		<div className="absolute inset-0">
			{risers.map((r, i) => (
				<div
					key={i}
					className="pf-rise absolute top-0"
					style={
						{
							left: `${r.left}%`,
							width: r.size,
							height: r.size,
							animationDuration: `${r.dur}s`,
							animationDelay: `${r.delay}s`,
							'--op': r.op,
							'--spin': `${r.spin}deg`,
							'--y0': `${r.y0}vh`
						} as CSSVars
					}
				>
					<div className="size-full" style={{ background: r.color, clipPath: r.shape }}></div>
				</div>
			))}
		</div>
	);
}

const petals = Array.from({ length: 26 }, (_, i) => ({
	left: (i * 37 + 5) % 100,
	size: 12 + ((i * 13) % 20),
	dur: 11 + ((i * 7) % 11),
	delay: -((i * 2.3) % 20),
	drift: ((i * 19) % 40) - 20,
	color: colors[(i * 2) % 3],
	op: 0.22 + ((i * 5) % 4) * 0.07,
	y0: (i * 23) % 95,
	confetti: i % 4 === 3
}));

/** Testimonios: pétalos y confeti que caen girando. */
export function PetalsBackdrop() {
	return (
		<div className="absolute inset-0">
			{petals.map((p, i) => (
				<div
					key={i}
					className="pf-fall absolute top-0"
					style={
						{
							left: `${p.left}%`,
							width: p.size,
							height: p.confetti ? p.size * 0.45 : p.size * 1.3,
							animationDuration: `${p.dur}s`,
							animationDelay: `${p.delay}s`,
							'--drift': `${p.drift}vw`,
							'--op': p.op,
							'--y0': `${p.y0}vh`
						} as CSSVars
					}
				>
					<div className="size-full" style={{ background: p.color, borderRadius: p.confetti ? '1px' : '100% 0 100% 0' }}></div>
				</div>
			))}
		</div>
	);
}
