import { Link } from "react-router-dom";
import ImagenProducto from "./ImagenProducto";

const CardArreglos = ({ producto, agregarAlCarrito }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">

      <Link to={`/productos/${producto.id}`}>
        <ImagenProducto
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-lg text-gray-800 line-clamp-2">
            {producto.nombre}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
            {producto.descripcion}
          </p>

          <p className="text-base sm:text-xl text-purple-700 font-semibold mt-1">
            Q{producto.precio.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
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

export default CardArreglos;
