import { useState, useEffect } from "react";
import { obtenerProductos } from "../api/productos";
import { useCarrito } from "../context/CarritoContext";
import CardProducto from "../components/home/CardProducto";

const Catalogo = () => {
  const [catalogo, setCatalogo] = useState([]);

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    obtenerProductos()
      .then(setCatalogo)
      .catch((error) => {
        console.log("Error al cargar el catálogo", error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      {/* TÍTULO */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Catálogo de productos
      </h1>

      {/* CATÁLOGO */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        {catalogo.map((producto) => (
          <CardProducto
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}

      </div>
    </div>
  );
};

export default Catalogo;
