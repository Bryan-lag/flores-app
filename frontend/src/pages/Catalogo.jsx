import { useState, useEffect } from "react";
import { obtenerProductos } from "../api/productos";
import { useCarrito } from "../context/CarritoContext";

const Catalogo = () => {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then(setCatalogo)
      .catch((error) => {
        console.log("Error al cargar el catálogo", error);
      });
  }, []);

  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    total,
  } = useCarrito();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Catálogo de productos
      </h1>

      {/* CATÁLOGO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {catalogo.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h2 className="text-lg font-semibold mb-2">
              {producto.nombre}
            </h2>

            <p className="text-gray-600 mb-2">
              {producto.descripcion}
            </p>

            <p className="font-bold text-lg mb-4">
              ${producto.precio}
            </p>

            <button
              onClick={() => agregarAlCarrito(producto)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}

      </div>

      {/* RESUMEN DEL CARRITO */}
      <div className="mt-10 bg-purple-100 p-4 rounded-xl shadow-md">

        <h2 className="font-bold text-xl mb-4">
          Resumen del carrito
        </h2>

        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <div>

            {/* PRODUCTOS DEL CARRITO */}
            <div className="space-y-4">

              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >

                  {/* INFORMACIÓN */}
                  <div>
                    <h3 className="font-semibold">
                      {producto.nombre}
                    </h3>

                    <p className="text-gray-600">
                      ${producto.precio}
                    </p>

                    <p className="text-sm text-gray-500">
                      Cantidad: {producto.cantidad}
                    </p>
                  </div>

                  {/* BOTONES */}
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => decrementarCantidad(producto.id)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      −
                    </button>

                    <span className="font-semibold px-2">
                      {producto.cantidad}
                    </span>

                    <button
                      onClick={() => incrementarCantidad(producto.id)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>

                    <button
                      onClick={() => eliminarDelCarrito(producto.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="mt-6 border-t border-purple-200 pt-4">

              <p className="text-lg font-bold">
                Total: ${total.toFixed(2)}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Catalogo;