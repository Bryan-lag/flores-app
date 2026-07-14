import { Link } from "react-router-dom";

const Detalles = () => {
  return (
    <div className="text-center md:text-left space-y-4">
        
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
  Flores que hablan <br />
  el lenguaje del <br />
  <span className="text-purple-800">
    CORAZÓN 💜
  </span>
</h1>

      <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 pt-6">

          {/* BOTON CATALOGO */}
          <Link
            to="/catalogo"
            className="
              inline-flex
              items-center
              gap-2
              bg-purple-700
              hover:bg-purple-800
              text-white
              font-semibold
              px-8
              py-4
              rounded-full
              shadow-xl
              shadow-purple-300/30
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Ver Catálogo 
          </Link>

          {/* BOTON CONTACTO */}
          <Link
            to="/contacto"
            className="
              inline-flex
              items-center
              gap-2
              bg-yellow-600
              hover:bg-yellow-700
              text-white
              font-semibold
              px-8
              py-4
              rounded-full
              shadow-xl
              shadow-yellow-300/30
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Contacto 
          </Link>

      </div>

    </div>

    
  );
};

export default Detalles;