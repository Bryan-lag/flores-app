import { Link } from "react-router-dom";

const CardArreglos = ({ producto, agregarAlCarrito }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

      <Link to={`/productos/${producto.id}`}>
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-72 object-cover"
        />

        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800">
            {producto.nombre}
          </h3>

          <p className="text-2xl text-purple-700 mt-2">
            Q{producto.precio.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={() => agregarAlCarrito(producto)}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition cursor-pointer"
        >
          Comprar
        </button>
      </div>

    </div>
  );
};

export default CardArreglos;