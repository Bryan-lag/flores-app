import { Link } from "react-router-dom";

const CardProducto = ({ producto, agregarAlCarrito }) => {
  return (
    <Link
      to={`/productos/${producto.id}`}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full hover:shadow-xl transition"
    >

      {/* IMAGEN */}
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* INFORMACIÓN DEL PRODUCTO */}
      <div className="grow">

        <h2 className="text-lg font-semibold mb-2">
          {producto.nombre}
        </h2>

        <p className="text-gray-600 mb-2">
          {producto.descripcion}
        </p>

        <p className="font-bold text-lg mb-4">
          Q{producto.precio}
        </p>

      </div>

      {/* BOTÓN */}
      <button
        onClick={(e) => {
          e.preventDefault();
          agregarAlCarrito(producto);
        }}
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Agregar al carrito
      </button>

    </Link>
  );
};

export default CardProducto;

