import GameCard from '@/components/molecules/GameCard';
import ProjectCard from '@/components/molecules/ProjectCard';
import SectionShell from '@/components/templates/SectionShell';
import { projects } from '@/lib/data/projects';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.projects.title), description: ui.projects.description, path: '/proyectos/' });

const collaborative = projects.filter((p) => p.kind === 'collaborative');
const personal = projects.filter((p) => p.kind === 'personal');
const grid = 'm-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 xl:grid-cols-3 lg:gap-9';

export default function ProjectsPage() {
	return (
		<SectionShell title={ui.projects.title} intro={ui.projects.intro}>
			<h2 className="mb-6 font-display text-3xl tracking-wide uppercase">{ui.projects.collaborative}</h2>
			<ul className={`${grid} mb-14`}>
				{collaborative.map((project) => (
					<li key={project.slug} className="min-w-0">
						<ProjectCard project={project} />
					</li>
				))}
				<li className="min-w-0">
					<GameCard />
				</li>
			</ul>

			<h2 className="mb-6 font-display text-3xl tracking-wide uppercase">{ui.projects.personal}</h2>
			<ul className={grid}>
				{personal.map((project) => (
					<li key={project.slug} className="min-w-0">
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</SectionShell>
	);
}
