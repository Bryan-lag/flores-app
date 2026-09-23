import { Link } from "react-router-dom";

const CardProducto = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">

      {/* IMAGEN */}
      <Link to={`/productos/${producto.id}`}>
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"
        />
      </Link>

      {/* INFORMACIÓN */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">

        <Link to={`/productos/${producto.id}`}>

          {/* NOMBRE */}
          <h2 className="font-bold text-sm sm:text-lg text-gray-800 line-clamp-2 min-h-10 sm:min-h-14">
            {producto.nombre}
          </h2>

          {/* DESCRIPCIÓN */}
          <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 sm:line-clamp-3 min-h-8 sm:min-h-15">
            {producto.descripcion}
          </p>

          {/* PRECIO */}
          <p className="text-purple-700 font-semibold text-base sm:text-xl mt-3 mb-4">
            Q{Number(producto.precio).toFixed(2)}
          </p>

        </Link>

        {/* BOTÓN */}
        <button
          onClick={() => agregarAlCarrito(producto)}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition cursor-pointer text-sm sm:text-base mt-auto"
        >
          Agregar al carrito
        </button>

      </div>
    </div>
  );
};

export default CardProducto;

