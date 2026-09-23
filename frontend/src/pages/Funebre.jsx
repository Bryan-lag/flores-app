import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import CardFunebre from "../components/CardFunebre";
import { useCarrito } from "../context/CarritoContext";

const Funebre = () => {

  const [funebre, setFunebre] = useState([]);

  const {
    agregarAlCarrito
  } = useCarrito();

  useEffect(() => {
    obtenerProductos("Funebres")
      .then(setFunebre)
      .catch((error) => {
        console.error("Error al obtener productos funebres:", error);
      });
  }, []);

  return (

    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Coronas Funebres
      </h1>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-2  md:grid-cols-3 gap-6">

        {funebre.map((producto) => (

          <CardFunebre
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />

        ))}

      </div>

    </div>
  );
};

export default Funebre;