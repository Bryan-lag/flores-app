import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";

const ProductosDestacados = () => {
  const { productos: todos } = useProductos();

  const productos = todos.slice(0, 4);

  
  if (productos.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        PRODUCTOS DESTACADOS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {productos.map((producto) => (
          <Link
            key={producto.id}
            to={`/productos/${producto.id}`}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="w-full h-44 sm:h-48 object-cover rounded-lg"
            />

            <h3 className="font-semibold mt-3 text-sm md:text-base">
              {producto.nombre}
            </h3>

            <div className="flex justify-between items-center mt-3">
              <span className="text-purple-700 font-bold">
                Q{producto.precio}
              </span>

              <span className="bg-purple-600 text-white rounded-full px-2 py-1 text-xs">
                Ver
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductosDestacados;