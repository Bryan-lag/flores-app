import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import CardFunebre from "../components/CardFunebre";
import { useCarrito } from "../context/CarritoContext";

const Funebre = () => {

  const [funebre, setFunebre] = useState([]);

  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    total
  } = useCarrito();

  useEffect(() => {
    obtenerProductos("Funebres")
      .then(setFunebre)
      .catch((error) => {
        console.error("Error al obtener productos funebres:", error);
      });
  }, []);

  return (

    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Coronas Funebres
      </h1>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {funebre.map((producto) => (

          <CardFunebre
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />

        ))}

      </div>

      {/* CARRITO */}
      <div className="mt-10 bg-purple-100 p-4 rounded-xl shadow-md">

        <h2 className="text-xl font-bold mb-4">
          Carrito 🛒
        </h2>

        {carrito.length === 0 ? (

          <p>No hay productos en carrito</p>

        ) : (

          <>
            <ul className="space-y-3">

              {carrito.map((item) => (

                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg"
                >

                  <div>

                    <p className="font-semibold">
                      {item.nombre}
                    </p>

                    <p className="text-sm text-gray-600">
                      Q{item.precio.toFixed(2)}
                    </p>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => decrementarCantidad(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold">
                      {item.cantidad}
                    </span>

                    <button
                      onClick={() => incrementarCantidad(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>

                  </div>

                </li>

              ))}

            </ul>

            {/* TOTAL */}
            <div className="mt-5 border-t pt-4">

              <p className="text-lg font-bold">
                Total: Q{total.toFixed(2)}
              </p>

            </div>
          </>

        )}

      </div>

    </div>
  );
};

export default Funebre;