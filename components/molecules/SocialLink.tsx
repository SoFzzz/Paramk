import type { Social } from '@/lib/data/socials';
import { ui } from '@/lib/data/ui';
import DownloadIcon from '../atoms/DownloadIcon';

/*
 * Igual que el menú de inicio: al seleccionar/pasar/enfocar, un bloque rojo entra desde la izquierda,
 * el texto se vuelve blanco y se desplaza, y el subrayado de acento se estira (estilos .sl-* en globals.css).
 * `download`: enlace de descarga local (no abre pestaña nueva).
 */
export default function SocialLink({ social, download = false }: { social: Social; download?: boolean }) {
	const isMail = social.url.startsWith('mailto:');
	const external = !isMail && !download;
	return (
		<a
			href={social.url}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			download={download ? '' : undefined}
			className="sl group relative flex min-h-20 items-center gap-5 bg-surface px-6 pt-3 pb-5 text-primary shadow-[6px_6px_0_var(--color-secondary)] outline-none md:min-h-24 md:gap-6 md:px-7 md:shadow-[8px_8px_0_var(--color-secondary)]"
		>
			<span aria-hidden="true" className="sl-block absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-200 ease-snap"></span>
			<span className="sl-icon relative flex size-10 shrink-0 items-center justify-center text-primary transition-colors duration-200">
				{social.id === 'github' ? (
					<svg aria-hidden="true" viewBox="0 0 24 24" className="size-10" fill="currentColor">
						<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
					</svg>
				) : social.id === 'linkedin' ? (
					<svg aria-hidden="true" viewBox="0 0 24 24" className="size-10" fill="currentColor">
						<path d="M4.5 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2.5 9.5h4V21h-4zM9 9.5h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z" />
					</svg>
				) : social.id === 'whatsapp' ? (
					<svg aria-hidden="true" viewBox="0 0 24 24" className="size-10" fill="currentColor">
						<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28-.24-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47z" />
					</svg>
				) : social.id === 'mail' ? (
					<svg aria-hidden="true" viewBox="0 0 24 24" className="size-10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
						<rect x="3" y="5" width="18" height="14" />
						<path d="m3 7 9 7 9-7" />
					</svg>
				) : (
					<span className="contents [&>svg]:size-10">
						<DownloadIcon />
					</span>
				)}
			</span>
			<span className="sl-text relative flex min-w-0 flex-1 flex-col gap-0.5 transition-transform duration-200 ease-out-expo">
				<span className="sl-title font-display text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-none tracking-wide uppercase transition-colors duration-200">{social.label}</span>
				<span className={`sl-handle ${isMail ? 'break-all' : 'truncate'} text-[15px] text-muted transition-colors duration-200`}>{social.handle}</span>
			</span>
			<svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="sl-arrow relative shrink-0 text-primary transition-colors duration-200" strokeWidth="3" strokeLinecap="square">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
			<span aria-hidden="true" className="sl-line absolute right-6 bottom-2 left-6 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo md:right-7 md:left-7 md:h-1.5"></span>
			{external && <span className="sr-only">{ui.newTab}</span>}
		</a>
	);
}
