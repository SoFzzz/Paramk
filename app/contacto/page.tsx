import SocialLink from '@/components/molecules/SocialLink';
import ContactForm from '@/components/organisms/ContactForm';
import SectionShell from '@/components/templates/SectionShell';
import { cvLink, socials } from '@/lib/data/socials';
import { pageTitle, ui } from '@/lib/data/ui';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: pageTitle(ui.contact.title), description: ui.contact.description, path: '/contacto/' });

export default function ContactPage() {
	return (
		<SectionShell title={ui.contact.title} intro={ui.contact.intro}>
			<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
			<ul className="sl-list m-0 flex min-w-0 max-w-md list-none md:max-w-xl flex-col lg:flex-1 gap-6 p-0 pr-2">
				{socials.map((social, i) => (
					<li key={social.id} style={{ marginLeft: `calc(${i * 40}px * var(--stagger, 0))` }} className="[--stagger:0] md:[--stagger:1]">
						<SocialLink social={social} />
					</li>
				))}
				<li style={{ marginLeft: `calc(${socials.length * 40}px * var(--stagger, 0))` }} className="[--stagger:0] md:[--stagger:1]">
					<SocialLink social={cvLink} download />
				</li>
			</ul>
			<div className="w-full max-w-md lg:sticky lg:top-8 lg:w-[26rem] lg:shrink-0">
				<ContactForm />
			</div>
			</div>
		</SectionShell>
	);
}
