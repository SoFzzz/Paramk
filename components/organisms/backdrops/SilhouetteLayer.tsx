import type { Silhouette } from '@/lib/data/scene';
import type { CSSVars } from '@/lib/utils/css';
import { cx } from '@/lib/utils/cx';

const place = {
	right: 'right-[-8%] bottom-0 h-[55vh] w-[80vw] md:right-[2%] md:h-[84vh] md:w-[34vw]',
	'right-tall': 'right-[-6%] bottom-0 h-[44vh] w-[78vw] lg:right-[1%] lg:h-[96vh] lg:w-[42vw]',
	'bottom-wide': 'right-[-4%] bottom-0 h-[30vh] w-[104vw] md:right-[2%] md:h-[58vh] md:w-[60vw]',
	'top-right': 'right-0 top-0 h-[22vh] w-[92vw] md:h-[36vh] md:w-[52vw]',
	run: 'left-0 bottom-0 h-[20vh] w-[42vw]'
} as const;
const anchor = {
	right: 'center bottom',
	'right-tall': 'center bottom',
	'bottom-wide': 'center bottom',
	'top-right': 'center top',
	run: 'center bottom'
} as const;
const origin = {
	sway: 'origin-top',
	breathe: 'origin-bottom',
	float: 'origin-bottom',
	run: 'origin-bottom',
	none: ''
} as const;

/** Silueta de personaje: solo se usa su forma (máscara CSS), pintada del color indicado en scene.ts. */
export default function SilhouetteLayer({ sil }: { sil: Silhouette }) {
	const url = `url(${sil.src})`;
	// Por debajo de su ancho mínimo solo se ve si la silueta es 'sm' o define smOpacity.
	const visibility = sil.from === 'sm' || sil.smOpacity !== undefined ? '' : sil.from === 'lg' ? 'hidden lg:block' : 'hidden md:block';
	const m = `${url} ${anchor[sil.pos]} / contain no-repeat`;
	const style: CSSVars = {
		'--o': sil.opacity,
		'--o-sm': sil.smOpacity ?? sil.opacity,
		'--c': `var(--color-${sil.tone})`,
		'--c-sm': `var(--color-${sil.smTone ?? sil.tone})`,
		WebkitMask: m,
		mask: m,
		...(sil.flip ? { transform: 'scaleX(-1)' } : {})
	};

	/* el contenedor entra con un fundido (después de que se abre la cortina); dentro va la animación en bucle.
	   El `key` del padre (sil.src) reinicia la entrada al cambiar de silueta. */
	return (
		<div
			className={cx('pf-enter absolute', visibility, place[sil.pos])}
		>
			{sil.anim === 'run' ? (
				<div className="pf-run absolute inset-y-0 left-0 w-full">
					<div data-bg="silhouette" className="pf-bob sil-tone size-full" style={style}></div>
				</div>
			) : (
				<div className={cx(sil.anim === 'none' ? '' : 'pf-' + sil.anim, 'size-full', origin[sil.anim])}>
					<div data-bg="silhouette" className="sil-tone size-full" style={style}></div>
				</div>
			)}
		</div>
	);
}
