import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductos } from "../api/productos";
import CardProduct from "../components/CardProduct";

const OcasionesProductos = () => {
  const { ocasion } = useParams();

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos(ocasion)
      .then(setProductos)
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [ocasion]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl font-bold mb-8">
        {ocasion}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <CardProduct
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>

    </div>
  );
};

export default OcasionesProductos;