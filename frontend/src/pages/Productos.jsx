import { flores } from "../data/flores";
import CardProduct from "../components/CardProduct";
import { useCarrito } from "../context/CarritoContext";

const Productos = () => {

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

      <div className="relative w-full h-40 md:h-52 overflow-hidden rounded-3xl mb-10 shadow-2xl">

        {/* Imagen */}
        <img
          src="https://images.pexels.com/photos/29355994/pexels-photo-29355994.jpeg"
          alt="Nuestros Ramos"
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
          Nuestros Ramos 🌷
        </h1>

      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {flores.map((flor) => (
          <CardProduct
            key={flor.id}
            producto={flor}
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
          <p>No hay productos aún</p>
        ) : (
          <>
            <ul className="space-y-3">

              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg"
                >

                  {/* INFO PRODUCTO */}
                  <div>
                    <p className="font-semibold">
                      {item.nombre}
                    </p>

                    <p className="text-sm text-gray-600">
                      Q{item.precio} c/u
                    </p>
                  </div>

                  {/* CONTROLES */}
                  <div className="flex items-center gap-2">

                    {/* BOTON RESTAR */}
                    <button
                      onClick={() => decrementarCantidad(item.id )}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
                    >
                      -
                    </button>

                    {/* CANTIDAD */}
                    <span className="font-bold">
                      {item.cantidad}
                    </span>

                    {/* BOTON SUMAR */}
                    <button
                      onClick={() => incrementarCantidad(item.id )}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
                    >
                      +
                    </button>

                    {/* ELIMINAR */}
                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
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
                Total: Q{total}
              </p>

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Productos;