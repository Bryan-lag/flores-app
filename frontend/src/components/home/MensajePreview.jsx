

const MensajePreview = () => {
  return (
    <div className="mt-16 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">

      {/* MITAD IMAGEN */}
      <div className="w-full md:w-1/2 h-64 md:h-100">
        <img
          src="https://images.pexels.com/photos/31505803/pexels-photo-31505803.jpeg"
          alt="Flores"
          className="w-full h-full object-cover"
        />
      </div>

      {/* MITAD TEXTO */}
      <div className="w-full md:w-1/2 min-h-64 md:h-100 bg-purple-100 flex flex-col justify-center px-6 md:px-10 py-10">

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-purple-900 mb-4">
          Conoce la historia
        </h1>

        <p className="text-gray-700 leading-relaxed">
          Cada ramo transmite emociones únicas y convierte momentos
          especiales en recuerdos inolvidables.
        </p>

      </div>

    </div>
  );
};

export default MensajePreview;

