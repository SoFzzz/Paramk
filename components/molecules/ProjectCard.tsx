import Image from 'next/image';
import { kindLabel, type Project } from '@/lib/data/projects';
import { ui } from '@/lib/data/ui';
import Button from '../atoms/Button';
import CardFrame from '../atoms/CardFrame';
import Tag from '../atoms/Tag';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project }: { project: Project }) {
	const c = project.cover;
	const cover = project.shots?.[0];
	return (
		<div
			data-nav-group
			tabIndex={0}
			role="group"
			aria-label={ui.card.projectLabel(project.title)}
			className="nav-card relative isolate flex h-full flex-col outline-none"
		>
			<CardFrame />
			<div
				className="relative flex h-48 items-center justify-center p-4 [clip-path:polygon(0_0,100%_0,100%_92%,90%_100%,0_100%)] md:h-56"
				style={{ backgroundColor: c.bg, backgroundImage: `radial-gradient(circle, ${c.dot} 1.4px, transparent 2px)`, backgroundSize: '10px 10px' }}
			>
				{cover ? (
					<Image
						src={cover.src}
						alt={cover.alt}
						width={cover.width}
						height={cover.height}
						sizes="(min-width: 768px) 340px, 300px"
						className="max-h-[85%] max-w-[85%] w-auto object-contain shadow-[5px_5px_0_var(--color-secondary)]"
					/>
				) : (
					/* Sin capturas: portada tipográfica con el nombre del proyecto. */
					<>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute -right-2 -bottom-10 font-display text-[11rem] leading-none uppercase opacity-20 select-none"
							style={{ color: c.ink }}
						>
							{project.title.charAt(0)}
						</span>
						<span
							aria-hidden="true"
							className="relative -rotate-3 font-display text-[clamp(3.25rem,2.5rem+3vw,4.75rem)] leading-none tracking-wide uppercase [text-shadow:4px_4px_0_var(--color-secondary)]"
							style={{ color: c.ink }}
						>
							{project.title}
						</span>
					</>
				)}
				{project.logo && (
					<Image src={project.logo.src} alt={project.logo.alt} width={project.logo.width} height={project.logo.height} className="absolute bottom-3 left-3 size-10 object-contain" />
				)}
				<span className="absolute top-3 left-3 border-2 px-2 py-0.5 text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ borderColor: c.ink, color: c.ink }}>
					{kindLabel[project.kind]}
				</span>
				<span className="absolute right-3 bottom-3 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase md:text-xs" style={{ background: c.chipBg, color: c.chipInk }}>
					{project.platform}
				</span>
			</div>

			<div className="flex flex-1 flex-col gap-3.5 p-5 pb-6 md:p-6">
				<h2 className="font-display text-[clamp(2rem,1.6rem+1vw,2.5rem)] leading-none tracking-wide text-primary uppercase">{project.title}</h2>
				<p className="text-base leading-relaxed">{project.summary}</p>
				<ul className="flex flex-wrap gap-2">
					{project.stack.map((item) => (
						<li key={item}>
							<Tag>{item}</Tag>
						</li>
					))}
				</ul>
				<div className="btn-row mt-auto flex flex-wrap gap-3 pt-2">
					<Button href={`/proyectos/${project.slug}/`}>
						{ui.card.view}
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-highlight" strokeWidth="3" strokeLinecap="square">
							<path d="M5 12h14M13 6l6 6-6 6" />
						</svg>
					</Button>
					<ProjectLinks repo={project.repo} demo={project.demo} demoVideoHref={project.videos?.length ? `/proyectos/${project.slug}/#demo` : undefined} />
				</div>
			</div>
		</div>
	);
}
