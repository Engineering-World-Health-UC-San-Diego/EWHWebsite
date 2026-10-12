/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** Shared button styles. */
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-display font-bold no-underline transition-colors duration-200 select-none';
const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-7 py-3.5 text-lg',
};
const variants = {
  /** Teal-dark with white text — the main call to action. */
  primary: 'bg-teal-dark text-white shadow-sm hover:bg-teal-darker',
  /** Blue on white with a light border. */
  secondary: 'border-2 border-line bg-white text-brand hover:border-brand hover:bg-tint',
  /** Solid brand blue. */
  brand: 'bg-brand text-white hover:bg-brand-dark',
  /** For dark/blue backgrounds. */
  light: 'bg-white text-brand-dark shadow-sm hover:bg-tint',
  ghostLight: 'border-2 border-white/60 text-white hover:border-white hover:bg-white/10',
};
export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return cn(base, sizes[size], variants[variant], extra);
}
