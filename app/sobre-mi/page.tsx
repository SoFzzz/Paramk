import Button from '@/components/atoms/Button';
import DownloadIcon from '@/components/atoms/DownloadIcon';
import PhotoFrame from '@/components/molecules/PhotoFrame';
import EducationList from '@/components/organisms/EducationList';
import TechProfileSkills from '@/components/organisms/TechProfileSkills';
import TechProfileSpecialties from '@/components/organisms/TechProfileSpecialties';
import SectionShell from '@/components/templates/SectionShell';
import { profile } from '@/lib/data/profile';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.about.title), description: ui.about.description, path: '/sobre-mi/' });

export default function AboutPage() {
	return (
		<SectionShell title={ui.about.title}>
			{/* Una sola copia de cada bloque; en lg la cuadrícula deja las habilidades a la derecha y la columna de lectura a la izquierda (la silueta queda libre abajo a la derecha) */}
			<div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-8">
				<div className="flex flex-wrap items-start gap-7 lg:col-start-1 lg:row-start-1">
					<PhotoFrame src={profile.photo} alt={ui.photo.alt(profile.name)} className="h-52 w-44 shrink-0" position="62% 28%" />
					<div className="flex min-w-0 flex-1 basis-60 flex-col gap-1.5">
						<span className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.25rem)] leading-tight tracking-wide text-balance text-primary uppercase">{profile.name}</span>
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

				<div className="lg:col-start-1 lg:row-start-2">
					<TechProfileSpecialties />
				</div>

				<TechProfileSkills className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start" />

				<div className="lg:col-start-1 lg:row-start-3">
					<EducationList />
				</div>
			</div>
		</SectionShell>
	);
}
