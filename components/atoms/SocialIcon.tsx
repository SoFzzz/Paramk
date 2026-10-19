/*
 * Iconos de contacto en línea (mismos trazos que usa SocialLink). Decorativos: el texto va al lado.
 */
export type SocialIconId = 'github' | 'linkedin' | 'mail' | 'whatsapp';

export default function SocialIcon({ id, className = 'size-10' }: { id: SocialIconId; className?: string }) {
	if (id === 'github') {
		return (
			<svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
				<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
			</svg>
		);
	}
	if (id === 'linkedin') {
		return (
			<svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
				<path d="M4.5 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2.5 9.5h4V21h-4zM9 9.5h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z" />
			</svg>
		);
	}
	if (id === 'whatsapp') {
		return (
			<svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
				<path d="M3.5 20.5 5 16.2A8.5 8.5 0 1 1 8 19.5z" />
				<path d="M9 8.5c0 3.2 2.8 6 6 6l1-1.2-2-1-.8.8c-.9-.4-2-1.5-2.4-2.4l.8-.8-1-2z" fill="currentColor" />
			</svg>
		);
	}
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
			<rect x="3" y="5" width="18" height="14" />
			<path d="m3 7 9 7 9-7" />
		</svg>
	);
}
