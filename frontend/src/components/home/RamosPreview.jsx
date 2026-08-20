import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../../api/productos";

const RamosPreview = () => {
    const [productos, setProductos] = useState([]);

    const { agregarAlCarrito } = useCarrito();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await obtenerProductos("Ramos");
                setProductos(data.slice(0, 3));
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        cargarProductos();
    }, []);

    return (
        <section className="w-full py-16">
            <div className="text-center mb-10">
                <h2 className="font-bold text-3xl">
                    Ramos Florales
                </h2>

                <p className="text-gray-600 mt-2">
                    Descubre ese ramo tan perfecto, para esa persona perfecta
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <CardProduct
                        key={producto.id}
                        producto={producto}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Link
                    to="/Productos"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition"
                >
                    Ver más...
                </Link>
            </div>
        </section>
    );
};

export default RamosPreview;