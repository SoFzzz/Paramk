import Button from '../atoms/Button';
import { linkLabels } from '@/lib/data/projects';

type Props = {
	/** Repositorio (GitHub). */
	repo?: string;
	/** Demo en vivo; si falta se usa el video (si hay) o un chip deshabilitado. */
	demo?: string;
	/** Sin demo en vivo, enlace a la sección de videos (/proyectos/<slug>/#demo). */
	demoVideoHref?: string;
	/** Muestra el chip "Demo no disponible" cuando no hay demo ni video (solo páginas de proyecto; las tarjetas lo omiten). */
	showUnavailable?: boolean;
};

/*
 * Enlaces de GitHub y Demo de un proyecto. Van dentro de un `.btn-row` (las tarjetas y las páginas lo usan).
 * Sin demo en vivo pero con videos, el botón lleva a la sección #demo; sin nada, un chip con `aria-disabled`.
 */
export default function ProjectLinks({ repo, demo, demoVideoHref, showUnavailable = false }: Props) {
	return (
		<>
			{repo && (
				<Button href={repo} external variant="secondary">
					{linkLabels.github}
				</Button>
			)}
			{demo ? (
				<Button href={demo} external variant="secondary">
					{linkLabels.demo}
				</Button>
			) : demoVideoHref ? (
				<Button href={demoVideoHref} variant="secondary">
					{linkLabels.demoVideo}
				</Button>
			) : showUnavailable ? (
				<span
					aria-disabled="true"
					className="inline-flex min-h-12 cursor-not-allowed items-center border-[3px] border-dashed border-muted px-5 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase"
				>
					{linkLabels.demoUnavailable}
				</span>
			) : null}
		</>
	);
}
