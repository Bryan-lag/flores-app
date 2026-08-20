import { obtenerProductos } from "../../api/productos";
import { useEffect, useState } from "react";
import CardArreglos from "../CardArreglos";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

const ArreglosPreview = () => {

  const { agregarAlCarrito } = useCarrito();
  const [arreglos, setArreglos] = useState([]);

  useEffect(() => {

    const cargarArreglos = async () => {
      try {

        const data = await obtenerProductos("Arreglos");

        if(Array.isArray(data)){
          setArreglos(data);
        }

      } catch(error){
        console.error("Error al obtener arreglos:", error);
      }
    };

    cargarArreglos();

  }, []);


  const preview = arreglos.slice(0,3);


  return (
    <section className="w-full py-16">

      <div className="text-center mb-10">

        <h2 className="text-3xl font-bold">
          Nuestros Arreglos
        </h2>

        <p className="text-gray-600 mt-2">
          Algunos de nuestros arreglos más especiales
        </p>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {preview.map((producto)=>(
          <CardArreglos
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}

      </div>


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