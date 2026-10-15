import { useState } from "react";

// si la URL de la imagen no es válida, se muestra un placeholder con un emoji de flor

const ImagenProducto = ({ src, alt, className = "", eager = false }) => {
  const [fallo, setFallo] = useState(false);

  if (fallo || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-purple-50 text-4xl`}
        role="img"
        aria-label={alt}
      >
        🌷
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFallo(true)}
      className={className}
    />
  );
};

export default ImagenProducto;