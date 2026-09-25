import { Link } from "react-router-dom";

const DisenaRamo = () => {
  return (
    <section className="px-4 py-6">
      <div className="max-w-6xl mx-auto rounded-2xl bg-linear-to-r from-purple-700 to-yellow-500 p-6 md:p-8 text-white text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold">
          DISEÑA TU RAMO
        </h2>

        <p className="mt-2 text-sm md:text-base">
          Crea un arreglo especial para esa persona que quieres sorprender.
        </p>

        <Link
          to="/contacto"
          className="inline-block mt-4 bg-yellow-400 text-purple-900 font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition"
        >
          Diseña tu ramo
        </Link>
      </div>
    </section>
  );
};

export default DisenaRamo;