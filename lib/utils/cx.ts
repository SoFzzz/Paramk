/** Une nombres de clase omitiendo los valores vacíos (sustituye a clsx). */
export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');
