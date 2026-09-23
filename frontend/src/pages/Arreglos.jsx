import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import CardArreglos from "../components/CardArreglos";
import { useCarrito } from "../context/CarritoContext";

const Arreglos = () => {

  const {
    agregarAlCarrito
  } = useCarrito();

  const [arreglos, setArreglos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    obtenerProductos("Arreglos")
      .then((data) => {
        if (activo) setArreglos(data);
      })
      .catch((err) => {
        console.error("Error al cargar arreglos:", err);
        if (activo) setError("No se pudieron cargar los arreglos.");
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      {/* TITULO */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Arreglos florales 🌷
      </h1>

      {/* GRID DE PRODUCTOS */}
      {cargando ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-center text-gray-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {arreglos.map((producto) => (
            <CardArreglos
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default Arreglos;
