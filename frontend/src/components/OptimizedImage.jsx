import { useState } from 'react';

export default function OptimizedImage({
  src,
  alt = '',
  width = 600,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 90vw, 600px',
}) {
  const [fallo, setFallo] = useState(false);

  // Si no hay src o falló la carga
  if (fallo || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-purple-50 text-4xl`}
        role="img"
        aria-label={alt}
        style={{ width, height: height || Math.round(width * 1.25) }}
      >
        🌷
      </div>
    );
  }

  const isCloudinary = src.includes('res.cloudinary.com');
  const finalHeight = height || Math.round(width * 1.25);

  let optimizedSrc = src;
  let srcSet = undefined;

  if (isCloudinary) {
    const parts = src.split('/upload/');
    if (parts.length === 2) {
      const base = parts[0] + '/upload/';
      const rest = parts[1];

      optimizedSrc = `${base}w_${width},c_fill,f_auto,q_auto/${rest}`;

      srcSet = [
        `${base}w_${Math.round(width * 0.5)},c_fill,f_auto,q_auto/${rest} ${Math.round(width * 0.5)}w`,
        `${base}w_${width},c_fill,f_auto,q_auto/${rest} ${width}w`,
        `${base}w_${Math.round(width * 1.5)},c_fill,f_auto,q_auto/${rest} ${Math.round(width * 1.5)}w`,
        `${base}w_${width * 2},c_fill,f_auto,q_auto/${rest} ${width * 2}w`,
      ].join(', ');
    }
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={finalHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFallo(true)}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  );
}