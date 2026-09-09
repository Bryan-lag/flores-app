import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProducto } from "../api/productos";
import { useCarrito } from "../context/CarritoContext";

const ProductoDetalle = () => {

    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const { agregarAlCarrito } = useCarrito();

    useEffect(() => {
        obtenerProducto(id)
            .then((data) => {
                setProducto(data);
            });
    }, [id]);

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    const handleComprar = () => {
        agregarAlCarrito(producto, cantidad);
    };

    const disminuirCantidad = () => {
        setCantidad((cantidadActual) => Math.max(1, cantidadActual - 1));
    };

    const aumentarCantidad = () => {
        setCantidad((cantidadActual) =>
            Math.min(producto.stock, cantidadActual + 1)
        );
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-16 mt-10">

            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Imagen */}
                <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="w-full h-125 object-cover"
                    />
                </div>

                {/* Información */}
                <div>

                    <p className="text-pink-500 font-medium uppercase tracking-wide">
                        {producto.categoria}
                    </p>

                    <h1 className="text-4xl font-bold text-gray-800 mt-2">
                        {producto.nombre}
                    </h1>

                    <p className="text-3xl font-semibold text-pink-600 mt-6">
                        Q{producto.precio}
                    </p>

                    <p className="text-gray-600 mt-6 leading-relaxed">
                        {producto.descripcion}
                    </p>

                    <p className="mt-6 text-sm text-gray-500">
                        Stock disponible: {producto.stock}
                    </p>

                    {/* Selector de cantidad */}
                    <div className="flex items-center gap-5 mt-8">

                        <button
                            onClick={disminuirCantidad}
                            disabled={cantidad === 1}
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
                        className="mt-8 w-full md:w-auto bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition"
                        onClick={handleComprar}
                    >
                        Comprar
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductoDetalle;

