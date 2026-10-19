'use client';

import { useEffect, useState } from 'react';

/**
 * Fecha actual para mostrar. La página se genera en el build, así que empieza con la fecha de build (idéntica en
 * servidor y durante la hidratación, sin desajuste) y tras hidratar se actualiza a la fecha real del visitante.
 */
export function useClock(): Date {
	const [now, setNow] = useState(() => new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? 0));
	useEffect(() => {
		setNow(new Date());
	}, []);
	return now;
}
