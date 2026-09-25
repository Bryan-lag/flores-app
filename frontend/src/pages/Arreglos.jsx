import CardArreglos from "../components/CardArreglos";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../hooks/useProductos";

const Arreglos = () => {

  const { agregarAlCarrito } = useCarrito();

  const { productos, cargando, error, reintentar } = useProductos("Arreglos");

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      {/* TITULO */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Arreglos florales 🌷
      </h1>

      {/* GRID DE PRODUCTOS */}
      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        onReintentar={reintentar}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {productos.map((producto) => (
            <CardArreglos
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

export default Arreglos;