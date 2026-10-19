import type { CSSProperties } from 'react';

/** Estilo en línea que además admite variables CSS (`--nombre`). */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
