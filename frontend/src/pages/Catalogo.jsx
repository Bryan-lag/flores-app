import { useProductos } from "../hooks/useProductos";
import EstadoCarga from "../components/EstadoCarga";
import { useCarrito } from "../context/CarritoContext";
import CardProducto from "../components/home/CardProducto";
import { useSearchParams } from "react-router-dom";

const Catalogo = () => {
  const { productos: catalogo, cargando, error, reintentar } = useProductos();

  const { agregarAlCarrito } = useCarrito();

  const [searchParams] = useSearchParams();

  const busqueda = searchParams.get("buscar") || "";

  // Filtrar productos
  const productosFiltrados = catalogo.filter((producto) => {
    const texto = busqueda.toLowerCase().trim();

    if (!texto) {
      return true;
    }

    return (
      producto.nombre?.toLowerCase().includes(texto) ||
      producto.descripcion?.toLowerCase().includes(texto) ||
      producto.categoria?.toLowerCase().includes(texto)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pt-36 md:pt-24 pb-10">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Catálogo de productos
      </h1>

      {/* MENSAJE DE BÚSQUEDA */}
      {busqueda && (
        <p className="text-center text-gray-600 mb-6">
          Resultados para:{" "}
          <span className="font-semibold text-purple-700">
            "{busqueda}"
          </span>
        </p>
      )}

      {/* CATÁLOGO */}
      <EstadoCarga cargando={cargando} error={error} onReintentar={reintentar}>
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {productosFiltrados.map((producto) => (
            <CardProducto
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}

        </div>
      ) : (
        /* SIN RESULTADOS */
        <div className="text-center py-16">

          <div className="text-5xl mb-4">
            🌸
          </div>

          <h2 className="text-xl font-semibold text-gray-700">
            No encontramos productos
          </h2>

          <p className="text-gray-500 mt-2">
            Intenta buscar con otro nombre o categoría.
          </p>

        </div>
      )}
      </EstadoCarga>

    </div>
  );
};

export default Catalogo;