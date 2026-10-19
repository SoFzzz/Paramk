import Image from 'next/image';
import SectionShell from '@/components/templates/SectionShell';
import { testimonials } from '@/lib/data/testimonials';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.testimonials.title), description: ui.testimonials.description, path: '/testimonios/' });

export default function TestimonialsPage() {
	return (
		<SectionShell title={ui.testimonials.title} intro={ui.testimonials.intro}>
			<ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 xl:grid-cols-3">
				{testimonials.map((t, i) => (
					<li key={t.name} className={i % 2 ? 'md:translate-y-4' : ''}>
						<figure
							aria-label={ui.testimonials.quoteLabel(t.name)}
							className="relative m-0 flex h-full flex-col gap-4 bg-surface px-6 pt-9 pb-5 shadow-[6px_6px_0_var(--color-secondary)]"
						>
							{/* esquina inclinada y comilla grande */}
							<span aria-hidden="true" className="absolute top-0 right-0 h-3 w-1/2 bg-primary [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"></span>
							<span aria-hidden="true" className="absolute top-1 left-4 font-display text-6xl leading-none text-accent">
								“
							</span>
							<blockquote className="m-0 text-base leading-relaxed sm:text-lg">{t.quote}</blockquote>
							<figcaption className="mt-auto flex items-center gap-4 border-t-4 border-secondary pt-4">
								{/* avatar redondo con borde y sombra dura, igual para los tres */}
								<span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-secondary bg-secondary shadow-[3px_3px_0_var(--color-accent)]">
									{t.photo ? (
										<Image src={t.photo} alt={ui.testimonials.photoAlt(t.name)} width={148} height={148} sizes="64px" className="size-full object-cover" />
									) : (
										<span aria-hidden="true" className="font-display text-2xl tracking-wide text-primary">
											{t.initials}
										</span>
									)}
								</span>
								<span className="flex min-w-0 flex-col gap-0.5">
									<span className="font-display text-xl tracking-wide text-primary uppercase">{t.name}</span>
									<span className="text-sm font-semibold">{t.role}</span>
									<span className="text-sm text-muted">{t.relation}</span>
								</span>
							</figcaption>
						</figure>
					</li>
				))}
			</ul>
		</SectionShell>
	);
}
