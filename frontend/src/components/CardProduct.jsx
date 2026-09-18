import { Link } from "react-router-dom";

const CardProduct = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">

      <Link to={`/productos/${producto.id}`}>
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"
        />

        <div className="p-3 sm:p-4">
          <h2 className="font-bold text-sm sm:text-lg line-clamp-2">
            {producto.nombre}
          </h2>

          <p className="text-purple-700 font-semibold mt-1">
            Q{producto.precio}
          </p>
        </div>
      </Link>

      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <button
          onClick={() => agregarAlCarrito(producto, 1)}
          className="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer text-sm sm:text-base transition"
        >
          Comprar
        </button>
      </div>

    </div>
  );
};

export default CardProduct;
