import { getPhoto } from '../lib/images';
import { cn } from '../lib/cn';

interface PhotoProps {
  /** Photo id from src/content/photos.ts */
  id: string;
  /** Classes for the wrapper; give it a size or aspect ratio. */
  className?: string;
  imgClassName?: string;
  /** Override the stored alt text. Use "" for purely decorative copies. */
  alt?: string;
  /** Override the stored crop focus (CSS object-position). */
  focus?: string;
  /** Rendered width hint for responsive loading. */
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fit?: 'cover' | 'contain';
  onLoad?: () => void;
}

/** Responsive photo with WebP sources and the original file as fallback. */
export function Photo({
  id,
  className,
  imgClassName,
  alt,
  focus,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  loading = 'lazy',
  fit = 'cover',
  onLoad,
}: PhotoProps) {
  const photo = getPhoto(id);
  if (!photo) {
    return (
      <div className={cn('grid place-items-center bg-tint p-4 text-center text-sm text-muted', className)}>
        Photo “{id}” not found
      </div>
    );
  }
  return (
    <picture className={cn('block', className)}>
      {photo.webpSrcset && <source type="image/webp" srcSet={photo.webpSrcset} sizes={sizes} />}
      <img
        src={photo.src}
        alt={alt ?? photo.alt}
        loading={loading}
        decoding="async"
        onLoad={onLoad}
        className={cn('h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain', imgClassName)}
        style={{ objectPosition: focus ?? photo.focus }}
      />
    </picture>
  );
}
