import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="text-6xl mb-4">🥀</div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Página no encontrada
      </h1>

      <p className="text-gray-600 mb-8 max-w-sm">
        No encontramos lo que buscabas. Puede que el enlace esté roto o que
        la página ya no exista.
      </p>

      <Link
        to="/"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;