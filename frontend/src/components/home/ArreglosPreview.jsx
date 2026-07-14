import { arreglos } from "../../data/arreglos";
import CardArreglos from "../CardArreglos";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

const ArreglosPreview = () => {

  const { agregarAlCarrito } = useCarrito();


  const preview = arreglos.slice(0, 3);

     return (
          <section className="w-full py-16">

               {/* TITULO */}
               <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">
                         Nuestros Arreglos 
                    </h2>

                    <p className="text-gray-600 mt-2">
                         Algunos de nuestros arreglos más especiales
                    </p>
               </div>

               {/* GRID */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {preview.map((producto) => (
                         <CardArreglos
                         key={producto.id}
                         producto={producto}
                         agregarAlCarrito={agregarAlCarrito}
                         />
                    ))}

               </div>

               {/* BOTON */}
               <div className="flex justify-center mt-10">

                    <Link
                         to="/arreglos"
                         className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition"
                    >
                         Ver más arreglos
                    </Link>

               </div>

          </section>
     );
};

export default ArreglosPreview;