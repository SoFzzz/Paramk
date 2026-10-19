import type { CSSVars } from '@/lib/utils/css';

// Interior de un vagón a pantalla completa, solo con siluetas planas del rojo de la marca,
// en tonos pálidos como la silueta original: pared, ventanas (con ciudad, mar y pilares que pasan),
// respaldo, asiento y, delante, la silueta sentada.
const layer = (file: string, tile: number, dur: number): CSSVars => ({
	'--tile': `${tile}px`,
	'--dur': `${dur}s`,
	background: `url(/scene/${file}) repeat-x left bottom / ${tile}px 100%`
});

const girl = 'url(/characters/banca.webp)';
const girlMask = { WebkitMask: `${girl} center bottom / contain no-repeat`, mask: `${girl} center bottom / contain no-repeat` };

// Tonos planos: el mismo rojo mezclado con el fondo, de más pálido (atrás) a más fuerte (adelante)
const tone = (pct: number) => `color-mix(in oklab, var(--color-primary) ${pct}%, var(--color-background))`;

export default function MetroBackdrop() {
	return (
		/* El vagón, a todos los tamaños: --win es la altura de las ventanas y --girl-w el ancho de la silueta */
		<div className="pf-enter absolute inset-0 [--win:34vh] [--girl-w:118vw] md:[--win:44vh] md:[--girl-w:86vw] xl:[--win:52vh] xl:[--girl-w:64vw]">
			{/* por las ventanas: ciudad que pasa, mar que brilla y pilares de puente */}
			<div data-bg="wagon" className="absolute inset-x-0 top-0 h-[var(--win)] overflow-hidden">
				<div className="pf-scroll absolute inset-x-0 bottom-[30%] h-[34%]" style={layer('skyline-far.svg', 600, 55)}></div>
				<div className="pf-scroll absolute inset-x-0 bottom-[30%] h-[44%]" style={layer('skyline-near.svg', 800, 24)}></div>

				<div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: tone(11) }}>
					<div
						className="pf-scroll absolute inset-0"
						style={
							{
								'--tile': '90px',
								'--dur': '2.4s',
								background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0 26px, transparent 26px 90px)',
								backgroundSize: '90px 100%',
								WebkitMask: 'repeating-linear-gradient(0deg, #000 0 2px, transparent 2px 11px)',
								mask: 'repeating-linear-gradient(0deg, #000 0 2px, transparent 2px 11px)'
							} as CSSVars
						}
					></div>
				</div>

				<div className="pf-scroll absolute inset-0" style={layer('poles.svg', 760, 2.2)}></div>
			</div>

			{/* pared: cabecera, dos pilares y repisa */}
			<div className="absolute inset-x-0 top-0 h-[4vh]" style={{ background: tone(16) }}></div>
			<div className="absolute top-0 left-[57vw] h-[var(--win)] w-[5vw] max-md:hidden" style={{ background: tone(16) }}></div>
			<div className="absolute top-0 left-[90vw] h-[var(--win)] w-[3.5vw]" style={{ background: tone(16) }}></div>
			<div className="absolute inset-x-0 top-[calc(var(--win)-2vh)] h-[6vh]" style={{ background: tone(16) }}></div>

			{/* respaldo */}
			<div className="absolute inset-x-0 top-[calc(var(--win)+4vh)] bottom-0" style={{ background: tone(17) }}></div>

			{/* asiento: a la altura de la cadera de la silueta */}
			<div className="absolute inset-x-0 bottom-0 h-[max(8vh,calc(5.5vw-2vh))]" style={{ background: tone(44), boxShadow: `inset 0 0.9vh 0 ${tone(54)}` }}></div>

			{/* la silueta, sentada. Baja un poco de la pantalla para que su borde inferior no se vea */}
			<div className="pf-lean absolute -right-[34vw] -bottom-[4vh] aspect-[1400/860] w-[var(--girl-w)] max-w-[calc(90vh*1.628)] origin-bottom md:-right-[12vw] xl:-right-[3vw] xl:-bottom-[10vh]">
				{/* los muebles se miden en % de la silueta, así se mueven y escalan con ella */}
				<div className="pf-rattle size-full">
					{/* apoyabrazos del asiento, junto al poste, donde descansa el gato */}
					<div
						className="absolute top-[75%] left-[69%] h-[10%] w-[19%] rounded-[1.4vw]"
						style={{ background: tone(42), boxShadow: `inset 0 0.7vh 0 ${tone(54)}` }}
					></div>
					<div data-bg="silhouette" className="absolute inset-0" style={{ background: tone(68), ...girlMask }}></div>
				</div>
			</div>
		</div>
	);
}
