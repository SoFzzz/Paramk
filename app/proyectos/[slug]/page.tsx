import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Button from '@/components/atoms/Button';
import Tag from '@/components/atoms/Tag';
import ProjectLinks from '@/components/molecules/ProjectLinks';
import SectionShell from '@/components/templates/SectionShell';
import { kindLabel, linkLabels, projects } from '@/lib/data/projects';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

// Solo existen las rutas de la lista de proyectos; cualquier otra da 404
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) return { title: ui.project.notFound };
	return buildMetadata({ title: pageTitle(project.title), description: project.summary, path: `/proyectos/${project.slug}/` });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) notFound();

	const facts = [
		[ui.project.type, kindLabel[project.kind]],
		[ui.project.platform, project.platform],
		[ui.project.role, project.role]
	];

	return (
		<SectionShell title={project.title} intro={project.summary} backHref="/proyectos/">
			<div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
				{project.shots?.length ? (
					<ul className="m-0 grid min-w-0 list-none gap-4 p-0 sm:grid-cols-2 lg:flex-[1.3]">
						{project.shots.map((shot, i) => (
							<li key={shot.src} className={`min-w-0 self-start ${shot.width > shot.height * 1.4 ? 'sm:col-span-2' : ''}`}>
								<Image
									src={shot.src}
									alt={shot.alt}
									width={shot.width}
									height={shot.height}
									sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 92vw"
									priority={i === 0}
									className="h-auto w-full bg-surface p-2 shadow-[6px_6px_0_var(--color-secondary)]"
								/>
							</li>
						))}
					</ul>
				) : project.highlights?.length ? (
					<div className="min-w-0 self-start bg-surface p-5 shadow-[6px_6px_0_var(--color-secondary)] md:p-6 md:shadow-[8px_8px_0_var(--color-secondary)] lg:flex-[1.3]">
						<h3 className="m-0 mb-3 font-display text-2xl tracking-wide text-primary uppercase">{ui.project.highlights}</h3>
						<ul className="m-0 flex list-none flex-col gap-2.5 p-0">
							{project.highlights.map((h) => (
								<li key={h} className="flex gap-3 text-[15px] leading-relaxed">
									<span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-accent"></span>
									{h}
								</li>
							))}
						</ul>
					</div>
				) : null}

				<div className="flex min-w-0 flex-col gap-6 lg:flex-1">
					{project.logo && <Image src={project.logo.src} alt={project.logo.alt} width={project.logo.width} height={project.logo.height} className="size-16 object-contain" />}

					<dl className="m-0 grid grid-cols-[6.5rem_minmax(0,1fr)] bg-surface shadow-[6px_6px_0_var(--color-secondary)] md:grid-cols-[7.5rem_minmax(0,1fr)] md:shadow-[8px_8px_0_var(--color-secondary)]">
						{facts.map(([k, v]) => (
							<div key={k} className="contents">
								<dt className="border-b border-text/15 px-4 py-3.5 text-xs font-semibold tracking-[0.12em] text-secondary uppercase">{k}</dt>
								<dd className="m-0 border-b border-text/15 px-4 py-3.5 text-[15px]">{v}</dd>
							</div>
						))}
						<dt className="px-4 py-3.5 text-xs font-semibold tracking-[0.12em] text-secondary uppercase">{ui.project.stack}</dt>
						<dd className="m-0 px-4 py-3.5">
							<ul className="m-0 flex list-none flex-wrap gap-2 p-0">
								{project.stack.map((item) => (
									<li key={item}>
										<Tag>{item}</Tag>
									</li>
								))}
							</ul>
						</dd>
					</dl>

					<div className="btn-row flex flex-wrap gap-4">
						<ProjectLinks repo={project.repo} demo={project.demo} demoVideoHref={project.videos?.length ? '#demo' : undefined} />
						{project.links?.map((link) => (
							<Button key={link.href} href={link.href} external variant="secondary">
								{link.label}
							</Button>
						))}
					</div>
				</div>
			</div>

			{project.videos?.length ? (
				<section id="demo" aria-labelledby="demo-titulo" className="scroll-mt-24 flex flex-col gap-6">
					<h3 id="demo-titulo" className="m-0 font-display text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-none tracking-wide text-primary uppercase">
						{linkLabels.videoSection}
					</h3>
					<ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2">
						{project.videos.map((video) => (
							<li
								key={video.src}
								className={`min-w-0 bg-surface p-3 shadow-[6px_6px_0_var(--color-secondary)] md:p-4 md:shadow-[8px_8px_0_var(--color-secondary)] ${video.width === video.height ? 'mx-auto w-full max-w-md md:col-span-2' : ''}`}
							>
								<figure className="m-0 flex flex-col gap-3">
									<video
										controls
										muted
										playsInline
										preload="metadata"
										src={video.src}
										width={video.width}
										height={video.height}
										aria-label={`${project.title}: ${video.title}`}
										className="block h-auto w-full bg-background"
									>
										Tu navegador no admite video HTML5.
									</video>
									<figcaption className="m-0 text-sm font-semibold tracking-[0.12em] text-secondary uppercase">{video.title}</figcaption>
								</figure>
							</li>
						))}
					</ul>
				</section>
			) : null}
		</SectionShell>
	);
}
