'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactEmail, socials } from '@/lib/data/socials';
import { ui } from '@/lib/data/ui';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;
type CopyState = 'idle' | 'copied' | 'failed';

const copy = ui.contact.form;
const whatsapp = socials.find((s) => s.id === 'whatsapp');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 10;

const labelCls = 'font-display text-xl tracking-wider text-primary uppercase';
const inputCls =
	'w-full border-[3px] border-secondary bg-background px-3 py-2.5 text-base font-medium text-secondary outline-none transition-shadow placeholder:text-muted/70 focus:shadow-[4px_4px_0_var(--color-primary)] aria-[invalid=true]:border-primary';
const errorCls = 'm-0 border-l-4 border-primary pl-2 text-sm font-semibold text-primary';
const btnBase =
	'min-h-12 -skew-x-6 cursor-pointer px-6 text-[15px] font-semibold tracking-[0.08em] uppercase outline-none transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-accent';

function validate(v: Record<Field, string>): Errors {
	const e: Errors = {};
	if (!v.name.trim()) e.name = copy.errors.name;
	if (!EMAIL_RE.test(v.email.trim())) e.email = copy.errors.email;
	if (v.message.trim().length < MIN_MESSAGE) e.message = copy.errors.message;
	return e;
}

/** Copia por un camino antiguo (textarea + execCommand) cuando la API del portapapeles no está disponible. */
function legacyCopy(text: string): boolean {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.setAttribute('readonly', '');
	ta.style.position = 'fixed';
	ta.style.opacity = '0';
	document.body.appendChild(ta);
	ta.select();
	let ok = false;
	try {
		ok = document.execCommand('copy');
	} catch {
		ok = false;
	}
	ta.remove();
	return ok;
}

/** Formulario de contacto: no hay backend, así que prepara un mailto: con los datos y abre el correo del visitante. */
export default function ContactForm() {
	const [errors, setErrors] = useState<Errors>({});
	const [done, setDone] = useState(false);
	const [copyState, setCopyState] = useState<CopyState>('idle');
	const formRef = useRef<HTMLFormElement>(null);
	const emailRef = useRef<HTMLSpanElement>(null);

	// El aviso de "copiado" desaparece solo tras unos segundos.
	useEffect(() => {
		if (copyState === 'idle') return;
		const t = window.setTimeout(() => setCopyState('idle'), 2500);
		return () => window.clearTimeout(t);
	}, [copyState]);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const values = { name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), message: String(data.get('message') ?? '') };
		const found = validate(values);
		setErrors(found);
		const first = (['name', 'email', 'message'] as Field[]).find((f) => found[f]);
		if (first) {
			formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
			return;
		}
		const subject = copy.subject(values.name.trim());
		const body = `Nombre: ${values.name.trim()}\nCorreo: ${values.email.trim()}\n\n${values.message.trim()}`;
		window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		setCopyState('idle');
		setDone(true);
	}

	async function copyEmail() {
		let ok = false;
		try {
			await navigator.clipboard.writeText(contactEmail);
			ok = true;
		} catch {
			ok = legacyCopy(contactEmail);
		}
		if (ok) {
			setCopyState('copied');
			return;
		}
		// Si nada funciona, selecciona el correo para que el visitante lo copie a mano.
		const node = emailRef.current;
		if (node) {
			const range = document.createRange();
			range.selectNodeContents(node);
			const sel = window.getSelection();
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
		setCopyState('failed');
	}

	const clear = (f: Field) => () => errors[f] && setErrors((prev) => ({ ...prev, [f]: undefined }));

	return (
		<section aria-labelledby="contact-form-title" className="relative flex flex-col gap-5 bg-surface px-5 pt-8 pb-6 shadow-[8px_8px_0_var(--color-secondary)] sm:px-7">
			<span aria-hidden="true" className="absolute top-0 right-0 h-3 w-1/2 bg-primary [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)]"></span>
			<h2 id="contact-form-title" className="m-0 font-display text-[1.75rem] tracking-wider text-primary uppercase">
				{copy.title}
			</h2>

			{done ? (
				<div role="status" className="flex flex-col items-start gap-4">
					<p className="m-0 font-display text-3xl tracking-wide text-secondary uppercase">{copy.doneTitle}</p>
					<p className="m-0 text-base leading-relaxed">
						{copy.doneText} <span ref={emailRef} className="font-semibold break-words">{contactEmail}</span>{' '}
						{whatsapp ? (
							<>
								{copy.doneOr}{' '}
								<a href={whatsapp.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-2 underline-offset-4">
									{whatsapp.label}
									<span className="sr-only"> {ui.newTab}</span>
								</a>
								.
							</>
						) : (
							'.'
						)}
					</p>
					<div className="flex flex-wrap items-center gap-x-5 gap-y-4">
						<button
							type="button"
							onClick={copyEmail}
							className={`${btnBase} border-[3px] border-secondary bg-background text-secondary shadow-[4px_4px_0_var(--color-primary)] hover:bg-surface`}
						>
							<span className="inline-block skew-x-6">{copy.copy}</span>
						</button>
						<span aria-live="polite" className="min-h-6 text-sm font-semibold text-primary">
							{copyState === 'copied' && copy.copied}
							{copyState === 'failed' && copy.copyFailed}
						</span>
					</div>
					<button
						type="button"
						onClick={() => {
							setDone(false);
							setErrors({});
							setCopyState('idle');
						}}
						className={`${btnBase} bg-primary text-white shadow-[4px_4px_0_var(--color-secondary)]`}
					>
						<span className="inline-block skew-x-6">{copy.again}</span>
					</button>
				</div>
			) : (
				<form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label htmlFor="cf-name" className={labelCls}>
							{copy.name}
						</label>
						<input
							id="cf-name"
							name="name"
							type="text"
							autoComplete="name"
							required
							onChange={clear('name')}
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? 'cf-name-err' : undefined}
							className={inputCls}
						/>
						{errors.name && (
							<p id="cf-name-err" role="alert" className={errorCls}>
								{errors.name}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<label htmlFor="cf-email" className={labelCls}>
							{copy.email}
						</label>
						<input
							id="cf-email"
							name="email"
							type="email"
							autoComplete="email"
							required
							onChange={clear('email')}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? 'cf-email-err' : undefined}
							className={inputCls}
						/>
						{errors.email && (
							<p id="cf-email-err" role="alert" className={errorCls}>
								{errors.email}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-1.5">
						<label htmlFor="cf-message" className={labelCls}>
							{copy.message}
						</label>
						<textarea
							id="cf-message"
							name="message"
							rows={5}
							required
							minLength={MIN_MESSAGE}
							onChange={clear('message')}
							aria-invalid={!!errors.message}
							aria-describedby={errors.message ? 'cf-message-err' : undefined}
							className={`${inputCls} resize-y`}
						/>
						{errors.message && (
							<p id="cf-message-err" role="alert" className={errorCls}>
								{errors.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className={`${btnBase} mt-1 self-start bg-primary text-white shadow-[4px_4px_0_var(--color-secondary)]`}
					>
						<span className="inline-block skew-x-6">{copy.submit}</span>
					</button>
				</form>
			)}
		</section>
	);
}
