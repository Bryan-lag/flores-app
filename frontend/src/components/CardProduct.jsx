import { Link } from "react-router-dom";
import ImagenProducto from "./ImagenProducto";

const CardProducto = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">

      <Link to={`/productos/${producto.id}`} className="flex flex-col flex-1">

        {/* Imagen */}
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
          <ImagenProducto
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Información */}
        <div className="p-4">
          <h2 className="font-bold text-lg line-clamp-2">
            {producto.nombre}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-3">
            {producto.descripcion}
          </p>

          <p className="text-purple-700 font-semibold mt-1">
            Q{producto.precio}
          </p>
        </div>

      </Link>

      {/* Comprar */}
      <div className="px-4 pb-4">
        <button
          onClick={() => agregarAlCarrito(producto, 1)}
          className="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer transition"
        >
          Comprar
        </button>
      </div>

    </div>
  );
};

export default CardProducto;

