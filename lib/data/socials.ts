/**
 * Contact links shown on the Contact page (mail, GitHub, LinkedIn) plus the CV download entry.
 * Edit handles and URLs here.
 */
import { profile } from './profile';

export type Social = {
	id: 'github' | 'linkedin' | 'mail' | 'whatsapp' | 'cv';
	label: string;
	handle: string;
	url: string;
};

/** Correo de contacto (lo usa también el formulario). */
export const contactEmail = 'gonzalezambranopaula840@gmail.com';

export const socials: Social[] = [
	{ id: 'whatsapp', label: 'WhatsApp', handle: '+57 316 900 3205', url: 'https://wa.me/573169003205' },
	{ id: 'mail', label: 'Correo', handle: contactEmail, url: `mailto:${contactEmail}` },
	{ id: 'github', label: 'GitHub', handle: 'github.com/SoFzzz', url: 'https://github.com/SoFzzz' },
	{
		id: 'linkedin',
		label: 'LinkedIn',
		handle: 'Paula Sofía González Zambrano',
		url: 'https://www.linkedin.com/in/paula-sofia-gonzalez-zambrano-435081265/'
	}
];

/** CV download entry shown last on the Contact page. */
export const cvLink: Social = { id: 'cv', label: 'CV', handle: 'Descargar en PDF', url: profile.cv.href };
