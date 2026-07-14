import { eventos } from "../data/eventos";
import CardEventos from "../components/CardEventos";
import { useCarrito } from "../context/CarritoContext";

const Eventos = () => {

     const {
           carrito,
           agregarAlCarrito,
           eliminarDelCarrito,
           incrementarCantidad,
           decrementarCantidad,
           total,
     } = useCarrito();

     return (
          <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

               <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                    Eventos para toda ocasión
               </h1>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {eventos.map((evento) => (
                         <CardEventos
                              key={evento.id}
                              producto={evento}
                              agregarAlCarrito={agregarAlCarrito}
                         />
                    ))}

               </div>

               <div className="mt-10 bg-purple-100 p-4 rounded-xl shadow-md">

                    <h2 className="font-bold text-xl mb-4">
                         Carrito 🛒
                    </h2>

                 {carrito.length === 0 ? (
                    <p>No hay ningún producto seleccionado</p>
               ) : (
     <>
          <ul className="space-y-3">

               {carrito.map(item => (
                    <li
                         key={item.id}
                         className="flex justify-between items-center bg-white p-3 rounded-lg"
                    >
                         <div>
                              <p>{item.nombre}</p>
                              <p>Q{item.precio}</p>
                         </div>

                         <div className="flex items-center gap-2">

                              <button
                                   onClick={() => decrementarCantidad(item.id)}
                                   className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
                              >
                                   -
                              </button>

                              <span className="font-bold">
                                   {item.cantidad}
                              </span>

                              <button
                                   onClick={() => incrementarCantidad(item.id)}
                                   className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded cursor-pointer"
                              >
                                   +
                              </button>

                              <button
                                   onClick={() => eliminarDelCarrito(item.id)}
                                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                              >
                                   x
                              </button>

                         </div>
                    </li>
               ))}

          </ul>

               <div className="mt-4">
                    <p className="font-bold text-lg">
                         Total: Q{total.toFixed(2)}
                    </p>
               </div>
          </>
     )}

               </div>
          </div>
     );
};

export default Eventos;