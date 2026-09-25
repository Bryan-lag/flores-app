import CardProduct from "../components/CardProduct";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../hooks/useProductos";
import { useSearchParams } from "react-router-dom";

const Productos = () => {

  const { agregarAlCarrito } = useCarrito();

  const [searchParams] = useSearchParams();

  const categoria = searchParams.get("categoria") || "Ramos";

  const { productos, cargando, error, reintentar } = useProductos(categoria);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <div className="relative w-full h-40 md:h-52 overflow-hidden rounded-3xl mb-10 shadow-2xl">

        {/* Imagen */}
        <img
          src="https://images.pexels.com/photos/29355994/pexels-photo-29355994.jpeg"
          alt={`Flores para ${categoria}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Texto */}
        <h1
          className="
            absolute inset-0
            flex items-center justify-center
            text-white
            text-3xl md:text-5xl
            font-serif
            italic
            font-bold
            tracking-wide
            drop-shadow-2xl
          "
        >
          {categoria} 🌷
        </h1>

      </div>

      {/* GRID DE PRODUCTOS */}
      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        mensajeVacio={`Aún no tenemos productos en "${categoria}".`}
        onReintentar={reintentar}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">

          {productos.map((producto) => (
            <CardProduct
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}

        </div>
      </EstadoCarga>

    </div>
  );
};

export default Productos;