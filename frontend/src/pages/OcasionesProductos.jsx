import { useParams } from "react-router-dom";
import CardProduct from "../components/CardProduct";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../hooks/useProductos";

const OcasionesProductos = () => {
  const { ocasion } = useParams();

  const { agregarAlCarrito } = useCarrito();

  const { productos, cargando, error, reintentar } = useProductos(ocasion);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl font-bold mb-8">
        {ocasion}
      </h1>

      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        onReintentar={reintentar}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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

export default OcasionesProductos;