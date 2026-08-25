const Ocaciones = () => {
  return (
    <>
      {/* OCASIONES */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">

        <div className="text-center mb-12 bg-pink-300/20 p-8 rounded-3xl shadow-sm border border-pink-200">
          <p className="text-purple-700 font-medium uppercase tracking-[0.2em] text-sm mb-2">
            Encuentra el detalle perfecto
          </p>

          <h2 className="text-3xl md:text-4xl font-serif text-gray-800">
            Flores para cada ocasión
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Elige el arreglo perfecto para celebrar, agradecer o simplemente
            demostrarle a alguien cuánto te importa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Cumpleaños */}
          <div className="group relative overflow-hidden rounded-3xl bg-pink-100 p-8 min-h-64 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

            <div className="relative z-10">
              <span className="text-4xl">🎂</span>

              <h3 className="text-2xl font-serif text-gray-800 mt-5">
                Cumpleaños
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Celebra un día especial con flores que hagan sonreír.
              </p>

              <span className="inline-block mt-6 text-purple-700 font-medium group-hover:translate-x-1 transition">
                Ver flores →
              </span>
            </div>

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-300/40 rounded-full group-hover:scale-125 transition duration-500"></div>
          </div>


          {/* Aniversario */}
          <div className="group relative overflow-hidden rounded-3xl bg-purple-100 p-8 min-h-64 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

            <div className="relative z-10">
              <span className="text-4xl">❤️</span>

              <h3 className="text-2xl font-serif text-gray-800 mt-5">
                Aniversario
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Celebra el amor con un detalle que diga lo que las palabras no pueden.
              </p>

              <span className="inline-block mt-6 text-purple-700 font-medium group-hover:translate-x-1 transition">
                Ver flores →
              </span>
            </div>

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-300/40 rounded-full group-hover:scale-125 transition duration-500"></div>
          </div>


          {/* Amistad */}
          <div className="group relative overflow-hidden rounded-3xl bg-emerald-50 p-8 min-h-64 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

            <div className="relative z-10">
              <span className="text-4xl">🌷</span>

              <h3 className="text-2xl font-serif text-gray-800 mt-5">
                Amistad
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Un pequeño detalle puede convertirse en un gran recuerdo.
              </p>

              <span className="inline-block mt-6 text-purple-700 font-medium group-hover:translate-x-1 transition">
                Ver flores →
              </span>
            </div>

            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-200/40 rounded-full group-hover:scale-125 transition duration-500"></div>
          </div>

        </div>

      </section>
    </>
  );
};

export default Ocaciones;