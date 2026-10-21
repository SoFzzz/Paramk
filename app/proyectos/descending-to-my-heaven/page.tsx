import Image from 'next/image';
import Tag from '@/components/atoms/Tag';
import ProjectLinks from '@/components/molecules/ProjectLinks';
import SectionShell from '@/components/templates/SectionShell';
import { game } from '@/lib/data/game';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.game.title), description: ui.game.description, path: game.path });

const facts = [
	[ui.game.genre, game.genre],
	[ui.game.engine, game.engine],
	[ui.game.platform, game.platform],
	[ui.game.role, game.role]
];
const keyArt = 'polygon(0 0, 100% 0, 100% 90%, 94% 100%, 0 100%)';

export default function GamePage() {
	return (
		<SectionShell title={game.title} backHref="/proyectos/">
			<div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
				<div className="flex min-w-0 flex-col gap-5 lg:flex-[1.3]">
					{game.shots?.length ? (
						<ul className="m-0 grid min-w-0 list-none gap-4 p-0 sm:grid-cols-2">
							{game.shots.map((shot, i) => (
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
					) : (
					<div className="relative">
						<div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary md:translate-x-3.5 md:translate-y-3.5" style={{ clipPath: keyArt }}></div>
						<div
							role="img"
							aria-label={ui.game.coverLabel(game.title)}
							className="relative flex aspect-[16/10] items-end justify-between p-4 md:aspect-video md:p-6"
							style={{
								clipPath: keyArt,
								backgroundImage:
									'radial-gradient(circle, rgba(242,149,68,0.45) 1.5px, transparent 2.1px), linear-gradient(160deg, #0d0000 0%, #4a0f0f 50%, #bf2424 100%)',
								backgroundSize: '11px 11px, 100% 100%'
							}}
						>
							<span className="font-display text-sm tracking-widest text-background uppercase md:text-[22px]">{game.coverText}</span>
						</div>
					</div>
					)}

					<div className="bg-surface p-5 shadow-[6px_6px_0_var(--color-secondary)] md:p-6">
						<h2 className="m-0 mb-3 font-display text-2xl tracking-wide text-primary uppercase">{ui.game.features}</h2>
						<ul className="m-0 flex list-none flex-col gap-2.5 p-0">
							{game.features.map((f) => (
								<li key={f} className="flex gap-3 text-[15px] leading-relaxed">
									<span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-accent"></span>
									{f}
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex min-w-0 flex-col gap-6 lg:flex-1">
					<div className="flex flex-wrap items-center gap-3">
						<span className="bg-highlight px-3 py-1 text-xs font-semibold tracking-[0.12em] text-text uppercase shadow-[3px_3px_0_var(--color-secondary)]">{ui.game.title}</span>
						<Tag kind="status">{game.status}</Tag>
					</div>
					<p className="max-w-md text-base leading-relaxed sm:text-lg">{game.premise}</p>

					<dl className="m-0 grid grid-cols-[7.5rem_minmax(0,1fr)] bg-surface shadow-[6px_6px_0_var(--color-secondary)] md:grid-cols-[8.5rem_minmax(0,1fr)] md:shadow-[8px_8px_0_var(--color-secondary)]">
						{facts.map(([k, v], i) => (
							<div key={k} className="contents">
								<dt className={`px-3 sm:px-4 py-3.5 text-xs font-semibold tracking-[0.06em] text-secondary uppercase max-sm:wrap-anywhere sm:tracking-[0.12em] ${i < facts.length - 1 ? 'border-b border-text/15' : ''}`}>{k}</dt>
								<dd className={`m-0 px-4 py-3.5 text-[15px] ${i < facts.length - 1 ? 'border-b border-text/15' : ''}`}>{v}</dd>
							</div>
						))}
					</dl>

					<div className="btn-row flex flex-wrap gap-4">
						<ProjectLinks repo={game.links.repo} demo={game.links.play} showUnavailable />
					</div>
				</div>
			</div>
		</SectionShell>
	);
}
