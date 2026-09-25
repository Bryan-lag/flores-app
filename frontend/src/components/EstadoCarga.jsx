// Muestra el estado correcto según la petición:

const EstadoCarga = ({
  cargando,
  error,
  vacio = false,
  mensajeVacio = "No hay productos disponibles por ahora.",
  onReintentar,
  children,
}) => {
  if (cargando) {
    return (
      <p role="status" className="text-center text-gray-500 py-16">
        Cargando...
      </p>
    );
  }

  if (error) {
    return (
      <div role="alert" className="text-center py-16">
        <div className="text-5xl mb-4">🥀</div>

        <p className="text-gray-700 mb-5">{error}</p>

        {onReintentar && (
          <button
            onClick={onReintentar}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition cursor-pointer"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (vacio) {
    return (
      <p className="text-center text-gray-500 py-16">{mensajeVacio}</p>
    );
  }

  return children;
};

export default EstadoCarga;