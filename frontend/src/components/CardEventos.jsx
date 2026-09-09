import { Link } from "react-router-dom";


const CardEventos = ({ producto, agregarAlCarrito }) => {

     return (
          <Link to={`/productos/${producto.id}`} className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

               <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="w-full h-72 object-cover"
               />

               <div className="p-4">

                    <h2 className="font-bold text-lg">
                         {producto.nombre}
                    </h2>

                    <p className="text-purple-700 font-semibold">
                         Q{producto.precio}
                    </p>

                    <button
                         onClick={() => agregarAlCarrito(producto)}
                         className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer"
                    >
                         Comprar
                    </button>

               </div>

          </Link>
     );
};

export default CardEventos;