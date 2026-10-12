// The original logo file stays untouched; these are resized copies made at build time.
import logoWebp from '../../EWHUCSD_logo.png?w=300;600;900&format=webp&as=srcset';
import logoPng from '../../EWHUCSD_logo.png?w=600&format=png';
import { cn } from '../lib/cn';

/** Original logo is 3608 × 1456 px; width/height keep its proportions. */
export function Logo({ className, sizes = '160px' }: { className?: string; sizes?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet={logoWebp} sizes={sizes} />
      <img
        src={logoPng}
        width={3608}
        height={1456}
        alt="Engineering World Health at UC San Diego"
        className={cn('h-auto w-auto', className)}
        decoding="async"
      />
    </picture>
  );
}
