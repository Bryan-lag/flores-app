import { useState } from "react";

/**
 * Imagen optimizada para Cloudinary + Lighthouse
 * - Transformaciones (tamaño, formato, calidad)
 * - width + height para evitar CLS
 * - lazy / eager
 * - fallback si falla la carga
 */
const ImagenProducto = ({
  src,
  alt = "",
  width = 600,
  height = 600,
  className = "",
  eager = false,          // true solo para el primer slide del hero
  sizes = "(max-width: 768px) 90vw, 600px",
}) => {
  const [fallo, setFallo] = useState(false);

  if (fallo || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-purple-50 text-4xl`}
        role="img"
        aria-label={alt}
        style={{ width, height }}
      >
        🌷
      </div>
    );
  }

  // Detectar si es Cloudinary
  const isCloudinary = src.includes("res.cloudinary.com");

  let optimizedSrc = src;
  let srcSet = undefined;

  if (isCloudinary) {
    const parts = src.split("/upload/");
    if (parts.length === 2) {
      const base = parts[0] + "/upload/";
      const rest = parts[1];

      // Versión principal
      optimizedSrc = `${base}w_${width},c_fill,f_auto,q_auto/${rest}`;

      // srcset responsive
      srcSet = [
        `${base}w_${Math.round(width * 0.5)},c_fill,f_auto,q_auto/${rest} ${Math.round(width * 0.5)}w`,
        `${base}w_${width},c_fill,f_auto,q_auto/${rest} ${width}w`,
        `${base}w_${Math.round(width * 1.5)},c_fill,f_auto,q_auto/${rest} ${Math.round(width * 1.5)}w`,
        `${base}w_${width * 2},c_fill,f_auto,q_auto/${rest} ${width * 2}w`,
      ].join(", ");
    }
  }

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFallo(true)}
      className={className}
    />
  );
};

export default ImagenProducto;