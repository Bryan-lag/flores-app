import { eventos } from "../../data/eventos";
import { Link } from "react-router-dom";

const EventosPreview = () => {

     const destacado = eventos[0];

     return (

          <section className="w-full">

               <div className="relative group overflow-hidden rounded-3xl h-[400px] shadow-xl">

                    {/* IMAGEN */}
                    <img
                         src={destacado.imagen}
                         alt={destacado.nombre}
                         className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* CONTENIDO */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">

                         <h2 className="text-3xl md:text-4xl font-bold mb-3">
                              Arreglos para Eventos
                         </h2>

                         <p className="text-sm md:text-base text-gray-200 mb-5 max-w-md">
                              Arreglos florales que transforman cada evento en una experiencia inolvidable.
                         </p>

                         <Link
                              to="/eventos"
                              className="bg-white text-purple-900 px-6 py-3 rounded-full w-fit font-medium hover:bg-purple-200 transition duration-300"
                         >
                              Ver colección
                         </Link>

                    </div>

               </div>

          </section>
     );
};

export default EventosPreview;