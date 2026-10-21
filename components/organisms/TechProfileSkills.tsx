import Tag from '@/components/atoms/Tag';
import { profile } from '@/lib/data/profile';
import { ui } from '@/lib/data/ui';

/** Habilidades agrupadas por categoría: se renderiza una sola vez; la página la coloca con grid. */
export default function TechProfileSkills({ className }: { className?: string }) {
	return (
		<section className={className}>
			<h2 className="mb-4 font-display text-[2rem] tracking-wider text-balance text-primary uppercase">{ui.about.skills}</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{profile.skills.map((group) => (
					<section key={group.group} className="flex flex-col gap-3 border-t-[6px] border-primary bg-surface p-4 shadow-[5px_5px_0_var(--color-secondary)]">
						<h3 className="m-0 font-display text-xl leading-none tracking-wider text-balance uppercase">{group.group}</h3>
						<ul className="m-0 flex list-none flex-wrap gap-2 p-0">
							{group.items.map((item) => (
								<li key={item} className="text-sm [&_span]:px-3 [&_span]:py-1.5 [&_span]:text-sm">
									<Tag>{item}</Tag>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</section>
	);
}
