import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="h-8 bg-purple-800 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-4 flex items-center justify-between">
        
        {/* Teléfono */}
        <a
          href="https://wa.me/50212345678"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-purple-200"
          >
          📞 1234-5678
       </a>

        {/* Rastrear pedido */}
    
        <Link
          to="/rastreo"
          className="hover:text-purple-100 transition"
        >
          📦 Rastrear pedido
        </Link>

      </div>
    </div>
  );
};

export default TopBar;


