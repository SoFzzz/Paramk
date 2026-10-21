import Image from 'next/image';
import { game } from '@/lib/data/game';
import { ui } from '@/lib/data/ui';
import Button from '../atoms/Button';
import CardFrame from '../atoms/CardFrame';
import Tag from '../atoms/Tag';

const coverBg = {
	backgroundImage: 'radial-gradient(circle, rgba(242,149,68,0.4) 1.4px, transparent 2px), linear-gradient(160deg, #0d0000 0%, #4a0f0f 55%, #bf2424 100%)',
	backgroundSize: '10px 10px, 100% 100%'
};

export default function GameCard() {
	const cover = game.shots?.[0];
	return (
		<article
			data-nav-group
			tabIndex={0}
			role="group"
			aria-label={ui.card.projectLabel(game.title)}
			className="nav-card relative isolate flex h-full flex-col outline-none"
		>
			<CardFrame />
			{cover ? (
				<div
					className="relative flex h-48 items-center justify-center p-4 [clip-path:polygon(0_0,100%_0,100%_92%,90%_100%,0_100%)] md:h-56"
					style={coverBg}
				>
					<Image
						src={cover.src}
						alt={cover.alt}
						width={cover.width}
						height={cover.height}
						sizes="(min-width: 768px) 340px, 300px"
						className="max-h-[85%] max-w-[85%] w-auto object-contain shadow-[5px_5px_0_var(--color-secondary)]"
					/>
					<span className="absolute right-3 bottom-3 bg-highlight px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-text uppercase md:text-xs">
						{ui.card.gameBadge}
					</span>
				</div>
			) : (
				<div
					role="img"
					aria-label={ui.card.artLabel(game.title)}
					className="flex h-40 items-end justify-between p-4 [clip-path:polygon(0_0,100%_0,100%_84%,90%_100%,0_100%)] md:h-56 md:p-5"
					style={coverBg}
				>
					<span className="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-[0.95] tracking-wide text-background uppercase">
						{game.titleLines[0]}
						<br />
						{game.titleLines[1]}
					</span>
					<span className="bg-highlight px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-text uppercase md:text-xs">{ui.card.gameBadge}</span>
				</div>
			)}

			<div className="flex flex-1 flex-col gap-3.5 p-5 pb-6 md:p-6">
				<h2 className="font-display text-[clamp(2rem,1.6rem+1vw,2.5rem)] leading-none tracking-wide text-primary uppercase">{game.title}</h2>
				<p className="text-base leading-relaxed">{game.premise}</p>
				<ul className="flex flex-wrap gap-2">
					<li>
						<Tag kind="status">{game.status}</Tag>
					</li>
					{game.stack.map((item) => (
						<li key={item}>
							<Tag>{item}</Tag>
						</li>
					))}
				</ul>
				<div className="btn-row mt-auto flex flex-wrap gap-3 pt-2">
					<Button href={game.path}>
						{ui.card.view}
						<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-highlight" strokeWidth="3" strokeLinecap="square">
							<path d="M5 12h14M13 6l6 6-6 6" />
						</svg>
					</Button>
					{game.links.repo && (
						<Button href={game.links.repo} external variant="secondary">
							{ui.card.repo}
						</Button>
					)}
				</div>
			</div>
		</article>
	);
}
