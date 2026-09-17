import { Link } from "react-router-dom";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { totalItems, carrito } = useCarrito();

  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-200 z-50 shadow-md">
      
      {/* Barra principal */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-purple-800 cursor-pointer hover:text-yellow-600 transition">
            TULIPA
          </h1>
        </Link>

        {/* Buscador desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Buscar flores..."
            className="w-full px-4 py-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />

          <button className="bg-purple-500 text-white px-4 py-2 rounded-r-xl hover:bg-purple-600 transition cursor-pointer">
            Buscar
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          <ul className="flex gap-6 text-purple-800 font-serif">
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              <Link to="/productos">Ramos</Link>
            </li>

            <li>
              <Link to="/arreglos">Arreglos</Link>
            </li>

            <li>
              <Link to="/ocasiones">Ocasiones</Link>
            </li>

            <li>
              <Link to="/funebre">Funebre</Link>
            </li>

            <li>
              <Link to="/eventos">Eventos</Link>
            </li>

            <li>
              <Link to="/catalogo">Catalogo</Link>
            </li>

            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>

          {/* Carrito desktop */}
          <div
            className="relative"
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
          >
            <div className="relative cursor-pointer">
              <span className="text-3xl">🛒</span>

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Dropdown carrito */}
            {showCart && (
              <div
                className="
                  absolute right-0 top-full pt-2
                  w-80
                  bg-white
                  border border-purple-100
                  rounded-2xl
                  shadow-2xl
                  p-4
                  z-50
                "
              >
                <h2 className="text-lg font-bold text-purple-700 mb-4">
                  Tu carrito
                </h2>

                {carrito.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Tu carrito está vacío
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">

                      {carrito.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 border-b pb-3"
                        >
                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            className="w-16 h-16 object-cover rounded-xl"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-sm text-gray-800">
                              {item.nombre}
                            </h3>

                            <p className="text-xs text-gray-600">
                              Cantidad: {item.cantidad}
                            </p>

                            <p className="text-sm font-bold text-purple-700">
                              Q{item.precio * item.cantidad}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/carrito"
                      onClick={() => setShowCart(false)}
                      className="block mt-4 bg-purple-600 hover:bg-purple-700 transition text-white text-center py-2 rounded-xl font-semibold"
                    >
                      Ver carrito
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-purple-800 text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-purple-100 border-t border-purple-200 shadow-inner px-4 pb-5 max-h-[calc(100vh-70px)] overflow-y-auto">

          {/* Buscador móvil */}
          <div className="flex pt-4 mb-5">
            <input
              type="text"
              placeholder="Buscar flores..."
              className="min-w-0 flex-1 px-4 py-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            />

            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 rounded-r-xl transition">
              Buscar
            </button>
          </div>

          {/* Links móvil */}
          <ul className="flex flex-col gap-4 text-purple-800 font-serif">

            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/productos"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Ramos
              </Link>
            </li>

            <li>
              <Link
                to="/arreglos"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Arreglos
              </Link>
            </li>

            <li>
              <Link
                to="/ocasiones"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Ocasiones
              </Link>
            </li>

            <li>
              <Link
                to="/funebre"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Funebre
              </Link>
            </li>

            <li>
              <Link
                to="/eventos"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Eventos
              </Link>
            </li>

            <li>
              <Link
                to="/catalogo"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Catalogo
              </Link>
            </li>

            <li>
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="block py-1"
              >
                Contacto
              </Link>
            </li>

            {/* Carrito móvil */}
            <li>
              <Link
                to="/carrito"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-1"
              >
                <span className="text-2xl">🛒</span>

                <span>Carrito</span>

                {totalItems > 0 && (
                  <span className="bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
