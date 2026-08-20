

const CardProduct = ({ producto, agregarAlCarrito }) => {
  console.log(producto);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition duration-300">

      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{producto.nombre}</h2>
        <p className="text-purple-700">Q{producto.precio}</p>

        <button
          
          onClick={() => agregarAlCarrito(producto)}
          className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer"
        >
          Comprar
        </button>
      </div>

    </div>
  );
};

export default CardProduct;

