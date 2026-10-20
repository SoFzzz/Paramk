import Button from '@/components/atoms/Button';
import DownloadIcon from '@/components/atoms/DownloadIcon';
import Tag from '@/components/atoms/Tag';
import TransitionLink from '@/components/atoms/TransitionLink';
import PhotoFrame from '@/components/molecules/PhotoFrame';
import EducationList from '@/components/organisms/EducationList';
import SectionShell from '@/components/templates/SectionShell';
import { game } from '@/lib/data/game';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.about.title), description: ui.about.description, path: '/sobre-mi/' });

const titleOf = (slug: string) => projects.find((p) => p.slug === slug)?.title ?? game.title;

/* Habilidades: se pinta en dos sitios (con display:none en el que no se ve): arriba a la derecha desde lg, y tras el perfil técnico por debajo de lg */
function Skills() {
	return (
		<>
			<h2 className="mb-3 font-display text-2xl tracking-wider text-primary uppercase">{ui.about.skills}</h2>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{profile.skills.map((group) => (
					<section key={group.group} className="flex flex-col gap-2 bg-surface p-3.5 shadow-[4px_4px_0_var(--color-secondary)]">
						<h3 className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{group.group}</h3>
						<ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
							{group.items.map((item) => (
								<li key={item}>
									<Tag size="sm">{item}</Tag>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</>
	);
}

export default function AboutPage() {
	return (
		<SectionShell
			title={ui.about.title}
			aside={
				<div className="hidden lg:block">
					<Skills />
				</div>
			}
		>
			{/* Columna de lectura a la izquierda; la derecha queda libre para la silueta */}
			<div className="flex min-w-0 flex-col gap-7 lg:max-w-[44%]">
				<div className="flex flex-wrap items-start gap-7">
					<PhotoFrame src={profile.photo} alt={ui.photo.alt(profile.name)} className="h-52 w-44 shrink-0" position="62% 28%" />
					<div className="flex min-w-0 flex-1 basis-60 flex-col gap-1.5">
						<span className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.25rem)] leading-tight tracking-wide text-primary uppercase">{profile.name}</span>
						<span className="text-base font-medium">{profile.role}</span>
						<span className="text-[15px] text-muted">{profile.studies}</span>
						<div className="mt-3">
							<Button href={profile.cv.href} download>
								<DownloadIcon />
								{profile.cv.label}
							</Button>
						</div>
					</div>
				</div>

				<section className="flex flex-col gap-3">
					<h2 className="font-display text-[1.75rem] tracking-wider text-primary uppercase">{ui.about.profile}</h2>
					<ul className="m-0 grid max-w-xl list-none gap-4 p-0">
						{profile.specialties.map((s) => (
							<li key={s.title} className="flex flex-col gap-2 bg-surface px-5 py-4 shadow-[6px_6px_0_var(--color-secondary)]">
								<h3 className="m-0 font-display text-xl leading-tight tracking-wide uppercase sm:text-2xl">{s.title}</h3>
								<p className="m-0 text-base leading-relaxed">{s.text}</p>
								<p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
									<span className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{ui.about.provenBy}</span>
									{s.projects.map((slug) => (
										<TransitionLink
											key={slug}
											href={`/proyectos/${slug}/`}
											className="px-1 font-semibold text-primary underline decoration-2 underline-offset-4 hover:bg-primary hover:text-white hover:no-underline data-[selected]:bg-primary data-[selected]:text-white data-[selected]:no-underline"
										>
											{titleOf(slug)}
										</TransitionLink>
									))}
								</p>
							</li>
						))}
					</ul>
				</section>

				<div className="lg:hidden">
					<Skills />
				</div>

				<EducationList />
			</div>
		</SectionShell>
	);
}
