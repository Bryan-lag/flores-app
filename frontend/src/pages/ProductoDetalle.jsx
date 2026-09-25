import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useProducto } from "../hooks/useProductos";
import { useCarrito } from "../context/CarritoContext";

const ProductoDetalle = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { producto, cargando, error, noEncontrado, reintentar } = useProducto(id);
    const [cantidad, setCantidad] = useState(1);

    const { agregarAlCarrito } = useCarrito();

    if (cargando) {
        return (
            <div className="pt-36 md:pt-24 text-center">
                <p role="status" className="text-gray-500">Cargando producto...</p>
            </div>
        );
    }

    if (noEncontrado) {
        return (
            <div className="pt-36 md:pt-24 pb-10 text-center px-4">
                <div className="text-5xl mb-4">🥀</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Este producto no existe
                </h1>
                <p className="text-gray-600 mb-6">
                    Puede que ya no esté disponible.
                </p>
                <Link
                    to="/catalogo"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    Ver catálogo
                </Link>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" className="pt-36 md:pt-24 pb-10 text-center px-4">
                <div className="text-5xl mb-4">🥀</div>
                <p className="text-gray-700 mb-5">{error}</p>
                <button
                    onClick={reintentar}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition cursor-pointer"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    const agotado = producto.stock <= 0;

    const handleComprar = () => {
        agregarAlCarrito(producto, cantidad);
    };

    const disminuirCantidad = () => {
        setCantidad((cantidadActual) =>
            Math.max(1, cantidadActual - 1)
        );
    };

    const aumentarCantidad = () => {
        setCantidad((cantidadActual) =>
            Math.min(producto.stock, cantidadActual + 1)
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-36 md:pt-24 pb-10">

            <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-purple-700 hover:text-yellow-600 font-semibold mb-6 transition cursor-pointer"
                >
                    Volver
            </button>

           
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Imagen */}
                <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="w-full h-72 sm:h-96 md:h-125 object-cover"
                    />
                </div>

                {/* Información */}
                <div>

                    {/* Categoría */}
                    <p className="text-purple-500 font-medium uppercase tracking-wide text-sm">
                        {producto.categoria}
                    </p>

                    {/* Nombre */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
                        {producto.nombre}
                    </h1>

                    {/* Precio */}
                    <p className="text-3xl font-semibold text-purple-600 mt-5">
                        Q{Number(producto.precio).toFixed(2)}
                    </p>

                    {/* Descripción */}
                    <p className="text-gray-600 mt-5 leading-relaxed">
                        {producto.descripcion}
                    </p>

                    {/* Stock */}
                    <p
                        className={`mt-5 text-sm ${
                            agotado ? "text-red-500 font-semibold" : "text-gray-500"
                        }`}
                    >
                        {agotado
                            ? "Producto agotado"
                            : `Stock disponible: ${producto.stock}`}
                    </p>

                    {/* Selector de cantidad */}
                    <div className="flex items-center gap-5 mt-7">

                        <button
                            onClick={disminuirCantidad}
                            disabled={agotado || cantidad <= 1}
                            className="w-10 h-10 rounded-full bg-gray-200 text-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            -
                        </button>

                        <span className="text-xl font-semibold text-gray-800 min-w-6 text-center">
                            {cantidad}
                        </span>

                        <button
                            onClick={aumentarCantidad}
                            disabled={cantidad === producto.stock}
                            className="w-10 h-10 rounded-full bg-gray-200 text-xl font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            +
                        </button>

                    </div>

                    {/* Comprar */}
                    <button
                        className="mt-7 w-full bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        onClick={handleComprar}
                        disabled={agotado}
                    >
                        {agotado ? "Agotado" : "Agregar al carrito"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductoDetalle;
