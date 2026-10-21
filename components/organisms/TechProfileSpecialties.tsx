import TransitionLink from '@/components/atoms/TransitionLink';
import { game } from '@/lib/data/game';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { ui } from '@/lib/data/ui';

const titleOf = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? game.title;

/** Perfil técnico: tarjetas numeradas con losa roja (como el menú), título grande y enlaces a los proyectos que lo demuestran. */
export default function TechProfileSpecialties() {
	return (
		<section className="flex flex-col gap-4">
			<h2 className="font-display text-[2rem] tracking-wider text-balance text-primary uppercase">{ui.about.profile}</h2>
			<ul className="m-0 grid max-w-xl list-none gap-5 p-0">
				{profile.specialties.map((s, i) => {
					const [main, ...rest] = s.title.split(' · ');
					return (
						<li key={s.title} className="relative flex flex-col gap-2.5 border-l-[6px] border-primary bg-surface py-4 pr-5 pl-5 shadow-[6px_6px_0_var(--color-secondary)]">
							<span
								aria-hidden="true"
								className="absolute -top-3 right-4 -skew-x-12 bg-primary px-3 py-0.5 font-display text-lg tracking-wider text-white shadow-[3px_3px_0_var(--color-secondary)]"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<h3 className="m-0 flex flex-col gap-0.5 pr-10 text-balance">
								<span className="font-display text-[1.65rem] leading-none tracking-wide uppercase sm:text-[1.9rem]">{main}</span>
								{rest.length > 0 && <span className="text-[13px] font-semibold tracking-[0.12em] text-secondary uppercase">{rest.join(' · ')}</span>}
							</h3>
							<p className="m-0 text-base leading-relaxed text-pretty">{s.text}</p>
							<p className="m-0 flex flex-wrap items-center gap-x-1 gap-y-0 text-sm">
								<span className="mr-2 text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{ui.about.provenBy}</span>
								{s.projects.map((slug) => (
									<TransitionLink
										key={slug}
										href={`/proyectos/${slug}/`}
										className="inline-flex min-h-11 items-center px-1.5 font-semibold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-white hover:no-underline data-[selected]:bg-primary data-[selected]:text-white data-[selected]:no-underline lg:min-h-8"
									>
										{titleOf(slug)}
									</TransitionLink>
								))}
							</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
