

const CardEventos = ({producto, agregarAlCarrito}) => {

     return (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300">

               <img 
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-72 object-cover"/>

               <div>
                    <h2 className="font-bold text-lg">{producto.nombre}</h2>

                    <p className="text-purple-700">Q{producto.precio}</p>

                    <button onClick={() => agregarAlCarrito(producto)}
                         className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 cursor-pointer">
                         Comprar
                    </button>
               </div>

          </div>
     )
}

export default CardEventos;