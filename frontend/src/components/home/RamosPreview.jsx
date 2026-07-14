import { flores } from "../../data/flores";
import CardProduct from "../CardProduct";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

const RamosPreview = () => {

     const {agregarAlCarrito} = useCarrito();

     const preview = flores.slice(0,3);

     return (
          <section className="w-full py-16">

               <div className="text-center mb-10">
                    <h2 className="font-bold text-3xl">Ramos Florales</h2>
                    <p className="text-gray-600 mt-2">Descubre ese ramo tan perfecto, para esa persona perfecta</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {preview.map((producto) => (
                         <CardProduct 
                              key={producto.id}
                              producto={producto}
                              agregarAlCarrito={agregarAlCarrito}/>
                    ))}
               </div>

               <div className="flex justify-center mt-10">
                    <Link to="/Productos"
                         className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition">
                         Ver mas...
                    </Link>
               </div>

          </section>
     )
}

export default RamosPreview;