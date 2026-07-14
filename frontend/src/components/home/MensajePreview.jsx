

const MensajePreview = () => {
  return (
    <div className="mt-15 flex h-100 rounded-3xl overflow-hidden shadow-2xl">

      {/* MITAD IMAGEN */}
      <div className="w-1/2 h-full">
        <img
          src="https://images.pexels.com/photos/31505803/pexels-photo-31505803.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* MITAD TEXTO */}
      <div className="w-1/2 h-full bg-purple-100 flex flex-col justify-center px-10">

        <h1 className="font-serif text-4xl font-bold text-purple-900 mb-4">
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