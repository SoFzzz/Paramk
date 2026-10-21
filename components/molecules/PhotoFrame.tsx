import Image from 'next/image';
import { ui } from '@/lib/data/ui';
import { cx } from '@/lib/utils/cx';

const shape = 'polygon(14% 0, 100% 0, 100% 86%, 86% 100%, 0 100%, 0 14%)';

export default function PhotoFrame({ src = null, alt = '', className = '', position = 'center' }: { src?: string | null; alt?: string; className?: string; position?: string }) {
	return (
		<div className={cx('relative', className)}>
			{/* sombra dura detrás del marco (naranja, para que se lea sobre el panel oscuro) */}
			<div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 bg-accent md:translate-x-5 md:translate-y-5" style={{ clipPath: shape }}></div>

			<div
				className="absolute inset-0 overflow-hidden"
				style={{
					clipPath: shape,
					background: 'linear-gradient(165deg, var(--color-secondary) 0%, color-mix(in oklab, var(--color-primary) 55%, var(--color-secondary)) 55%, var(--color-primary) 100%)'
				}}
				role={src ? undefined : 'img'}
				aria-label={src ? undefined : ui.photo.placeholderLabel}
			>
				{src ? (
					/* foto a color natural, sin filtros: se ve nítida y el rostro queda limpio */
					<Image src={src} alt={alt} width={440} height={520} sizes="180px" priority className="size-full object-cover" style={{ objectPosition: position }} />
				) : (
					<>
						<span className="absolute bottom-4 left-4 font-display text-sm tracking-widest text-background uppercase md:text-xl">{ui.photo.placeholderText}</span>
						{/* trama halftone: solo en el placeholder, nunca sobre la foto */}
						<div
							aria-hidden="true"
							className="absolute inset-0"
							style={{ backgroundImage: 'radial-gradient(circle, rgba(242,149,68,0.55) 1.6px, transparent 2.2px)', backgroundSize: '11px 11px' }}
						></div>
					</>
				)}
			</div>

			{/* franja de acento */}
			<div aria-hidden="true" className="absolute top-[18%] -right-3 h-[38%] w-3.5 -skew-y-[8deg] bg-highlight"></div>
		</div>
	);
}
