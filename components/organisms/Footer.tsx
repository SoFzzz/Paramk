'use client';

import BackToTop from '@/components/atoms/BackToTop';
import SocialIcon from '@/components/atoms/SocialIcon';
import TransitionLink from '@/components/atoms/TransitionLink';
import { footer } from '@/lib/data/footer';
import { menuItems } from '@/lib/data/nav';
import { profile } from '@/lib/data/profile';
import { socials } from '@/lib/data/socials';
import { ui } from '@/lib/data/ui';
import { useClock } from '@/lib/utils/clock';
import FooterSilhouette from '@/components/organisms/backdrops/FooterSilhouette';
import { currentYear } from '@/lib/utils/date';

/*
 * Pie de página: banda oscura con franja roja en diagonal (como las siluetas del fondo).
 * Va fuera de <main>, así que no lo cubre KeyNav; el botón de movimiento es fijo, por eso deja espacio abajo.
 */
export default function Footer() {
	const now = useClock();
	const links = [{ id: 'inicio', label: footer.homeLabel, href: '/' }, ...menuItems];

	return (
		<footer className="relative mt-16 bg-secondary text-background">
			{/* Silueta del fondo en naranja: el recorte del contenedor la deja visible solo sobre el pie */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 [clip-path:inset(0)]">
				<FooterSilhouette />
			</div>

			{/* Franja roja con borde en diagonal */}
			<div aria-hidden="true" className="absolute inset-x-0 -top-7 h-8 bg-primary [clip-path:polygon(0_0,100%_0,100%_40%,0_100%)]"></div>

			<div className="relative mx-auto flex max-w-[90rem] flex-col gap-10 px-4 pt-10 pb-24 sm:px-8 sm:pb-20 lg:px-[4.5rem]">
				<div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col gap-1.5">
						<p className="m-0 font-display text-2xl tracking-wider text-highlight uppercase">{profile.shortName}</p>
						<p className="m-0 text-[12px] font-semibold tracking-[0.14em] text-background/80 uppercase">{profile.role}</p>
					</div>

					<nav aria-label={footer.navLabel}>
						<ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
							{links.map((link) => (
								<li key={link.id}>
									<TransitionLink
										href={link.href}
										className="inline-block border-b-2 border-transparent pb-0.5 text-[14px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-accent hover:text-highlight"
									>
										{link.label}
									</TransitionLink>
								</li>
							))}
						</ul>
					</nav>

					<div className="flex flex-col gap-3">
						<span className="text-[12px] font-semibold tracking-[0.14em] text-background/70 uppercase">{footer.socialLabel}</span>
						<ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
							{socials.map((social) => {
								const isMail = social.url.startsWith('mailto:');
								return (
									<li key={social.id}>
										<a
											href={social.url}
											target={isMail ? undefined : '_blank'}
											rel={isMail ? undefined : 'noopener noreferrer'}
											className="group inline-flex items-center gap-2.5 border-b-2 border-transparent pb-0.5 text-[14px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-accent hover:text-highlight"
										>
											{social.id !== 'cv' && (
												<span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center text-highlight transition-colors group-hover:text-accent">
													<SocialIcon id={social.id} className="size-5" />
												</span>
											)}
											{social.label}
											{!isMail && <span className="sr-only"> {ui.newTab}</span>}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="flex flex-col gap-3 border-t border-background/20 pt-5 text-[13px] text-background/75">
					<p className="m-0 flex items-center gap-3">
						<span aria-hidden="true" className="h-3 w-7 shrink-0 bg-accent -skew-x-[12deg]"></span>
						{footer.copyright(currentYear(now))}
					</p>
				</div>
			</div>

			<BackToTop />
		</footer>
	);
}
