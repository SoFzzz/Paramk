import type { CSSVars } from '@/lib/utils/css';

// Estrellas mágicas: unas caen sin parar por toda la pantalla y otras titilan arriba a la derecha,
// alrededor de la silueta. Los valores salen de una fórmula (no de Math.random) para que sean
// iguales en el servidor y en el navegador.
const colors = ['var(--color-primary)', 'var(--color-accent)', 'var(--color-highlight)'];

const falling = Array.from({ length: 34 }, (_, i) => ({
	left: (i * 37 + 11) % 100,
	size: 9 + ((i * 13) % 18),
	dur: 8 + ((i * 7) % 9),
	delay: -((i * 1.9) % 14),
	drift: ((i * 17) % 50) - 25, // vw
	color: colors[i % 3],
	op: 0.45 + ((i * 5) % 4) * 0.12,
	y0: (i * 29) % 95 // vh, posición fija si no hay animación
}));

const twinkles = Array.from({ length: 14 }, (_, i) => ({
	left: 50 + ((i * 19) % 46),
	top: 3 + ((i * 23) % 36),
	size: 12 + ((i * 7) % 18),
	dur: 2 + ((i * 3) % 4),
	delay: -((i * 0.7) % 3),
	color: colors[(i + 1) % 3],
	op: 0.7
}));

export default function StarsBackdrop() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			{falling.map((s, i) => (
				<span
					key={`f${i}`}
					className="pf-star pf-fall"
					style={
						{
							left: `${s.left}%`,
							width: `${s.size}px`,
							height: `${s.size}px`,
							background: s.color,
							'--op': s.op,
							'--drift': `${s.drift}vw`,
							'--y0': `${s.y0}vh`,
							animationDuration: `${s.dur}s`,
							animationDelay: `${s.delay}s`
						} as CSSVars
					}
				></span>
			))}
			{twinkles.map((t, i) => (
				<span
					key={`t${i}`}
					className="pf-star pf-twinkle"
					style={
						{
							left: `${t.left}%`,
							top: `${t.top}vh`,
							width: `${t.size}px`,
							height: `${t.size}px`,
							background: t.color,
							'--op': t.op,
							animationDuration: `${t.dur}s`,
							animationDelay: `${t.delay}s`
						} as CSSVars
					}
				></span>
			))}
		</div>
	);
}
