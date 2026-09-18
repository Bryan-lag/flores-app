import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">

        {/* Contenido principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo / descripción */}
          <div>
            <Link to="/">
              <h2 className="text-3xl font-serif font-bold text-purple-200 hover:text-white transition">
                TULIPA
              </h2>
            </Link>

            <p className="mt-4 text-purple-100 leading-relaxed text-sm">
              Flores y arreglos especiales para acompañar
              tus momentos más importantes.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-200">
              Enlaces
            </h3>

            <ul className="space-y-3 text-sm text-purple-100">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  to="/catalogo"
                  className="hover:text-white transition"
                >
                  Catálogo
                </Link>
              </li>

              <li>
                <Link
                  to="/ocasiones"
                  className="hover:text-white transition"
                >
                  Ocasiones
                </Link>
              </li>

              <li>
                <Link
                  to="/eventos"
                  className="hover:text-white transition"
                >
                  Eventos
                </Link>
              </li>

              <li>
                <Link
                  to="/contacto"
                  className="hover:text-white transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-200">
              Categorías
            </h3>

            <ul className="space-y-3 text-sm text-purple-100">
              <li>
                <Link
                  to="/productos"
                  className="hover:text-white transition"
                >
                  Ramos
                </Link>
              </li>

              <li>
                <Link
                  to="/arreglos"
                  className="hover:text-white transition"
                >
                  Arreglos
                </Link>
              </li>

              <li>
                <Link
                  to="/funebre"
                  className="hover:text-white transition"
                >
                  Arreglos fúnebres
                </Link>
              </li>

              <li>
                <Link
                  to="/eventos"
                  className="hover:text-white transition"
                >
                  Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-200">
              Contáctanos
            </h3>

            <div className="space-y-3 text-sm text-purple-100">

              <p>
                📱 WhatsApp
              </p>

              <p>
                📍 Guatemala
              </p>

              <p>
                ✉️ contacto@tulipa.com
              </p>

            </div>

            {/* Redes */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="hover:text-purple-300 transition"
                aria-label="Facebook"
              >
                Facebook
              </a>

              <a
                href="#"
                className="hover:text-purple-300 transition"
                aria-label="Instagram"
              >
                Instagram
              </a>

            </div>
          </div>

        </div>

        {/* Separador */}
        <div className="border-t border-purple-700 mt-10 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-purple-200">

            <p>
              © {new Date().getFullYear()} TULIPA. Todos los derechos reservados.
            </p>

            <p>
              Flores con cariño 🌷
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
