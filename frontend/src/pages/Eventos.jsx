import CardEventos from "../components/CardEventos";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../hooks/useProductos";

const Eventos = () => {

  const { agregarAlCarrito } = useCarrito();

  const { productos, cargando, error, reintentar } = useProductos("Eventos");

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Eventos para toda ocasión
      </h1>

      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={productos.length === 0}
        onReintentar={reintentar}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {productos.map((evento) => (
            <CardEventos
              key={evento.id}
              producto={evento}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}

        </div>
      </EstadoCarga>

    </div>
  );
};

export default Eventos;