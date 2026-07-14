import { Link } from "react-router-dom";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { totalItems, carrito } = useCarrito();


  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-200 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
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
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Ramos</Link></li>
            <li><Link to="/arreglos">Arreglos</Link></li>
            <li><Link to="/funebre">Funebre</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>

  
          {/* Carrito */}
        <div
          className="relative"
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
        >
          {/* Icono */}
          <div className="relative cursor-pointer">
            <span className="text-3xl">🛒</span>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
        </div>

      {/* Dropdown */}
      {showCart && (
        <div   className="
              absolute right-0 top-full pt-2
              w-80
              bg-white/20
              backdrop-blur-xl
              backdrop-saturate-150
              border border-white/30
              rounded-2xl
              shadow-2xl
              p-4
              z-50
              text-white
            ">

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
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        {item.nombre}
                      </h3>

                      <p className="text-xs text-gray-800">
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
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-purple-100 px-4 pb-4">

          {/* Buscador móvil */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Buscar flores..."
              className="w-full px-4 py-2 rounded-l-xl border border-gray-300"
            />

            <button className="bg-purple-500 text-white px-4 rounded-r-xl">
              Buscar
            </button>
          </div>

          {/* Links móvil */}
          <ul className="flex flex-col gap-4 text-purple-800 font-serif">

            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Inicio
              </Link>
            </li>

            <li>
              <Link to="/productos" onClick={() => setOpen(false)}>
                Ramos
              </Link>
            </li>

            <li>
              <Link to="/arreglos" onClick={() => setOpen(false)}>
                Arreglos
              </Link>
            </li>

            <li>
              <Link to="/funebre" onClick={() => setOpen(false)}>
                Funebre
              </Link>
            </li>

            <li>
              <Link to="/eventos" onClick={() => setOpen(false)}>
                Eventos
              </Link>
            </li>

            <li>
              <Link to="/catalogo" onClick={() => setOpen(false)}>
                Catalogo
              </Link>
            </li>

            <li>
              <Link to="/contacto" onClick={() => setOpen(false)}>
                Contacto
              </Link>
            </li>

            {/* Carrito móvil */}
            <li className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>

              {totalItems > 0 && (
                <span className="bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;