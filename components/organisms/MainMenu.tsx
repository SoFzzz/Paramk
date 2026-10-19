'use client';

import { useEffect, useRef, useState } from 'react';
import { menuItems as navItems } from '@/lib/data/nav';
import { ui } from '@/lib/data/ui';
import { motionOn } from '@/lib/motion/prefs';
import MenuOption from '../molecules/MenuOption';
import { useNavigate } from './TransitionProvider';

export default function MainMenu() {
	const navigate = useNavigate();
	const [active, setActive] = useState(0);
	const links = useRef<(HTMLAnchorElement | null)[]>([]);
	const list = useRef<HTMLUListElement>(null);

	// Los manejadores de teclado leen el estado más reciente a través de una referencia
	const activeRef = useRef(active);
	activeRef.current = active;

	useEffect(() => {
		function move(delta: number) {
			const next = (activeRef.current + delta + navItems.length) % navItems.length;
			setActive(next);
			links.current[next]?.focus();
		}

		function onKey(e: KeyboardEvent) {
			if (e.ctrlKey || e.metaKey || e.altKey) return;
			if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable]')) return;
			// W/S y flechas solo cuando el foco está en el cuerpo o en el menú
			const a = document.activeElement;
			if (e.key !== 'Enter' && a && a !== document.body && !a.closest('nav')) return;
			switch (e.key) {
				case 'ArrowDown':
				case 's':
				case 'S':
					e.preventDefault();
					move(1);
					break;
				case 'ArrowUp':
				case 'w':
				case 'W':
					e.preventDefault();
					move(-1);
					break;
				case 'Enter':
					// Solo si nada tiene el foco; en un enlace o botón, el navegador lo activa solo.
					if (!a || a === document.body) {
						e.preventDefault();
						navigate(navItems[activeRef.current].href);
					}
					break;
			}
		}

		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [navigate]);

	// Entrada escalonada de las opciones (Web Animations API)
	useEffect(() => {
		if (!motionOn() || !list.current) return;
		const anims = [...list.current.children].map((el, i) =>
			el.animate(
				[
					{ transform: 'translateX(-90px)', opacity: 0 },
					{ transform: 'translateX(0)', opacity: 1 }
				],
				{ duration: 520, delay: 150 + i * 80, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
			)
		);
		return () => anims.forEach((a) => a.cancel());
	}, []);

	return (
		<nav aria-label={ui.menuLabel}>
			<ul ref={list} className="m-0 flex list-none flex-col gap-2 p-0 [--stagger:0] lg:gap-[1vh] lg:[--stagger:1]">
				{navItems.map((item, i) => (
					<li key={item.id} className="self-start">
						<MenuOption
							ref={(el) => {
								links.current[i] = el;
							}}
							href={item.href}
							label={item.label}
							active={active === i}
							offset={i * 36}
							onFocus={() => setActive(i)}
							onMouseEnter={() => setActive(i)}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
