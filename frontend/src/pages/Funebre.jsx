import CardFunebre from "../components/CardFunebre";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../hooks/useProductos";

const Funebre = () => {

  const { agregarAlCarrito } = useCarrito();

  const { productos, cargando, error, reintentar } = useProductos("Funebres");

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Coronas Funebres
      </h1>

      {/* PRODUCTOS */}
      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        onReintentar={reintentar}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {productos.map((producto) => (
            <CardFunebre
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

export default Funebre;