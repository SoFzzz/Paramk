import ExperienceTimeline from '@/components/organisms/ExperienceTimeline';
import SectionShell from '@/components/templates/SectionShell';
import { academic, work } from '@/lib/data/experience';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.experience.title), description: ui.experience.description, path: '/experiencia/' });

export default function ExperiencePage() {
	return (
		<SectionShell title={ui.experience.title} intro={ui.experience.intro}>
			<div className="grid min-w-0 gap-10 lg:max-w-[62%] lg:gap-12">
				<ExperienceTimeline heading={ui.experience.academic} items={academic} />
				<ExperienceTimeline heading={ui.experience.work} items={work} />
			</div>
		</SectionShell>
	);
}
