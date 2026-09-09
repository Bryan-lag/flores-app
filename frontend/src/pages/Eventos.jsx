import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import CardEventos from "../components/CardEventos";
import { useCarrito } from "../context/CarritoContext";

const Eventos = () => {

     const [eventos, setEventos] = useState([]);

     useEffect(() => {

          obtenerProductos("Eventos")
               .then(setEventos)
               .catch((error) => {
                    console.error("Error al obtener productos de eventos:", error);
               });

     }, []);

     const {
          agregarAlCarrito
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

            
          </div>
     );
};

export default Eventos;