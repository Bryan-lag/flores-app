import { Link } from "react-router-dom";

const CardEventos = ({ producto, agregarAlCarrito }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">

      <Link to={`/productos/${producto.id}`}>
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"
        />

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-lg text-gray-800 line-clamp-2 min-h-10 sm:min-h-14">
            {producto.nombre}
          </h3>

          <p className="text-base sm:text-xl text-purple-700 font-semibold mt-1">
            Q{producto.precio.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-3 pb-3 sm:px-4 sm:pb-4 mt-auto">
        <button
          onClick={() => agregarAlCarrito(producto)}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition cursor-pointer text-sm sm:text-base"
        >
          Comprar
        </button>
      </div>

    </div>
  );
};

export default CardEventos;

