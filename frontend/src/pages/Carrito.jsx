import { Link } from "react-router-dom";

import { useCarrito } from "../context/CarritoContext";

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    total,
  } = useCarrito();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl md:text-4xl font-serif font-bold text-purple-800 mb-8">
        Tu carrito 🛒
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-6">
            Tu carrito está vacío.
          </p>

          <Link
               to="/productos"
               className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
               >
               Ver Ramos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PRODUCTOS */}
          <div className="lg:col-span-2 space-y-4">

            {carrito.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4"
              >

                {/* Imagen */}
                <img
                  src={item.imagen_url}
                  alt={item.nombre}
                  className="w-full sm:w-28 h-28 object-cover rounded-xl"
                />

                {/* Información */}
                <div className="flex-1">

                  <h2 className="text-lg font-bold text-purple-800">
                    {item.nombre}
                  </h2>

                  <p className="text-gray-600">
                    Q{item.precio} c/u
                  </p>

                  {/* Controles */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decrementarCantidad(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.cantidad}
                    </span>

                    <button
                      onClick={() => incrementarCantidad(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* Precio + eliminar */}
                <div className="flex sm:flex-col justify-between items-end">

                  <p className="font-bold text-purple-700">
                    Q{item.precio * item.cantidad}
                  </p>

                  <button
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* RESUMEN */}
          <div className="bg-purple-100 rounded-2xl shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold text-purple-800 mb-6">
              Resumen del pedido
            </h2>

            <div className="flex justify-between border-b pb-4">
              <span>Subtotal</span>

              <span className="font-bold">
                Q{total}
              </span>
            </div>

            <div className="flex justify-between py-4">
              <span>Total</span>

              <span className="text-xl font-bold text-purple-700">
                Q{total}
              </span>
            </div>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              Proceder al pago
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Carrito;