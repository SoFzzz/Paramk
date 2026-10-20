import PhotoFrame from '@/components/molecules/PhotoFrame';
import QuickFacts from '@/components/organisms/QuickFacts';
import SectionShell from '@/components/templates/SectionShell';
import { profile } from '@/lib/data/profile';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.aboutMe.title), description: ui.aboutMe.description, path: '/acerca-de-mi/' });

export default function AboutMePage() {
	return (
		<SectionShell title={ui.aboutMe.title} intro={ui.aboutMe.intro}>
			{/* Columna de lectura a la izquierda; la derecha queda libre para la silueta */}
			<div className="flex min-w-0 flex-col gap-7 lg:max-w-[44%]">
				<div className="flex flex-wrap items-start gap-7">
					<PhotoFrame src={profile.photoCasual} alt={ui.photo.alt(profile.name)} className="h-52 w-44 shrink-0" position="62% 28%" />
					<div className="flex min-w-0 flex-1 basis-60 flex-col gap-1.5">
						<span className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.25rem)] leading-tight tracking-wide text-primary uppercase">{ui.aboutMe.whoTitle}</span>
						<span className="text-base font-medium">{profile.shortName}</span>
						<span className="text-[15px] text-muted">{profile.studies}</span>
					</div>
				</div>

				<div className="flex max-w-xl flex-col gap-4 bg-surface px-5 py-4 shadow-[6px_6px_0_var(--color-secondary)]">
					{ui.aboutMe.who.map((paragraph) => (
						<p key={paragraph} className="m-0 text-base leading-relaxed sm:text-lg">
							{paragraph}
						</p>
					))}
				</div>

				<QuickFacts />
			</div>
		</SectionShell>
	);
}
