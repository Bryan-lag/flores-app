import { useState } from "react";
import { flores } from "../data/flores";

const FlorCarrusel = () => {
  const [index, setIndex] = useState(0);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % flores.length);
  };

  const anterior = () => {
    setIndex((prev) =>
      prev === 0 ? flores.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-[300px] sm:w-[450px] md:w-[500px]">

      {/* Imagen */}
     <div className="w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-black">
      <img
        className="w-full h-full object-cover object-center"
        src={flores[index].imagen}
        alt={flores[index].nombre}
      />
    </div>

      {/* Info */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center">
        <h2 className="font-serif font-semi-bold text-lg">
          {flores[index].nombre}
        </h2>

       
      </div>

      {/* Botón izquierda */}
      <button
        onClick={anterior}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          bg-white/20 backdrop-blur-md
          hover:bg-white/30
          text-white
          w-10 h-10
          rounded-full
          flex items-center justify-center
          shadow-lg
          transition
        "
      >
        ←
      </button>

      {/* Botón derecha */}
      <button
        onClick={siguiente}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          bg-white/20 backdrop-blur-md
          hover:bg-white/30
          text-white
          w-10 h-10
          rounded-full
          flex items-center justify-center
          shadow-lg
          transition
        "
      >
        →
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {flores.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === index
                ? "bg-white"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlorCarrusel;
