import { useState, useEffect } from "react";
import { obtenerProductos } from "../api/productos";

const FlorCarrusel = () => {
    const [index, setIndex] = useState(0);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await obtenerProductos("Ramos");
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener los ramos:", error);
            }
        };

        cargarProductos();
    }, []);

    if (productos.length === 0) {
        return (
            <div className="w-75 sm:w-125 md:w-125 h-125 flex items-center justify-center">
                <p className="text-gray-500">Cargando...</p>
            </div>
        );
    }

    const siguiente = () => {
        setIndex((prev) => (prev + 1) % productos.length);
    };

    const anterior = () => {
        setIndex((prev) =>
            prev === 0 ? productos.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative w-75 sm:w-125 md:w-125">
            {/* Imagen */}
            <div className="w-full h-125 overflow-hidden rounded-2xl shadow-2xl bg-black">
                <img
                    className="w-full h-full object-cover object-center"
                    src={productos[index].imagen_url}
                    alt={productos[index].nombre}
                />
            </div>

            {/* Información */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl text-white text-center">
                <h2 className="font-serif font-semibold text-lg">
                    {productos[index].nombre}
                </h2>
            </div>

            {/* Botón izquierda */}
            <button
                onClick={anterior}
                className="
                    absolute left-3 top-1/2 -translate-y-1/2
                    bg-white/20 backdrop-blur-md
                    hover:bg-white/30
                    text-white
                    w-10 h-10
                    rounded-full
                    flex items-center justify-center
                    shadow-lg
                    transition
                "
            >
                ←
            </button>

            {/* Botón derecha */}
            <button
                onClick={siguiente}
                className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    bg-white/20 backdrop-blur-md
                    hover:bg-white/30
                    text-white
                    w-10 h-10
                    rounded-full
                    flex items-center justify-center
                    shadow-lg
                    transition
                "
            >
                →
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {productos.map((producto, i) => (
                    <div
                        key={producto.id}
                        className={`w-3 h-3 rounded-full transition ${
                            i === index ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlorCarrusel;
