import { Link } from "react-router-dom";

const NUMERO_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER;

const TopBar = () => {
  return (
    <div className="h-8 bg-purple-800 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-4 flex items-center justify-between">

        {/* Teléfono: solo se muestra si hay número configurado */}
        {NUMERO_WHATSAPP ? (
          <a
            href={`https://wa.me/${NUMERO_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-200"
          >
            📞 +{NUMERO_WHATSAPP}
          </a>
        ) : (
          <span></span>
        )}

        {/* Rastrear pedido */}
        <Link to="/rastreo" className="hover:text-purple-100 transition">
          📦 Rastrear pedido
        </Link>

      </div>
    </div>
  );
};

export default TopBar;