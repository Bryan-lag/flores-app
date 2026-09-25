import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";

const EventosPreview = () => {

  const { productos } = useProductos("Eventos");

  const destacado = productos[0];

  if (!destacado) {
    return null;
  }

  return (

    <section className="w-full">

      <div className="relative group overflow-hidden rounded-3xl h-80 sm:h-90 md:h-100 shadow-xl">

        {/* IMAGEN */}
        <img
          src={destacado.imagen_url}
          alt={destacado.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENIDO */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 text-white">

          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Eventos
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

