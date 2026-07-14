

const CardFunebre = ({ producto, agregarAlCarrito }) => {

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-72 object-cover"
      />

      <div className="p-5 flex flex-col gap-4">

        <h3 className="font-bold text-xl text-gray-800">
          {producto.nombre}
        </h3>

        <p className="text-2xl  text-purple-700">
          Q{producto.precio.toFixed(2)}
        </p>

        <button
          onClick={() => agregarAlCarrito(producto)}
          className="bg-purple-500 hover:bg-purple-500 text-white py-2 rounded-lg transition cursor-pointer"
        >
          Comprar
        </button>

      </div>

    </div>

  );
};

export default CardFunebre;