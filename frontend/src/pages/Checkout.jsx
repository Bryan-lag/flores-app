import { useState } from "react";
import axios from "axios";

import { useCarrito } from "../context/CarritoContext";

const Checkout = () => {
  const { carrito, total, vaciarCarrito } = useCarrito();

  const [formulario, setFormulario] = useState({
    nombre_cliente: "",
    telefono: "",
    direccion: "",
    referencia: "",
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [pedidoCreado, setPedidoCreado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const crearMensajeWhatsApp = (pedidoId) => {
    const productos = carrito
      .map(
        (item) =>
          `• ${item.nombre} x${item.cantidad} - Q${
            item.precio * item.cantidad
          }`
      )
      .join("\n");

    const mensaje = `
      Hola, quiero confirmar mi pedido en TULIPA 

      *Pedido #${pedidoId}*

      *Cliente:* ${formulario.nombre_cliente}
      *Teléfono:* ${formulario.telefono}

      *Dirección:*
      ${formulario.direccion}

      *Referencia:*
      ${formulario.referencia || "No especificada"}

      *Productos:*
      ${productos}

      *Total: Q${total}*

      ¡Gracias!
      `;

    return mensaje;
  };

  

  const abrirWhatsApp = (pedidoId) => {
    const numeroWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER; 

    const mensaje = crearMensajeWhatsApp(pedidoId);

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCargando(true);
    setError("");

    try {
      const pedido = {
        ...formulario,
        detalles: carrito.map((item) => ({
          producto_id: item.id,
          cantidad: item.cantidad,
        })),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/pedidos/",
        pedido
      );

      console.log("Pedido creado:", response.data);

      const pedidoId = response.data.pedido_id;

      // Guardamos la información del pedido creado
      setPedidoCreado({
        id: pedidoId,
      });

      // El pedido ya fue guardado correctamente
      vaciarCarrito();

      // Abrimos WhatsApp después de crear el pedido
      abrirWhatsApp(pedidoId);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.detail ||
          "Ocurrió un error al crear el pedido."
      );
    } finally {
      setCargando(false);
    }
  };

  // PANTALLA DE CONFIRMACIÓN
  if (pedidoCreado) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10 bg-pink-50">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">

          {/* ICONO */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-4xl text-purple-700">
              ✓
            </span>
          </div>

          {/* TITULO */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-purple-800 mb-4">
            ¡Pedido creado correctamente!
          </h1>

          {/* MENSAJE */}
          <p className="text-gray-600 text-lg mb-2">
            Tu pedido{" "}
            <span className="font-bold text-purple-700">
              #{pedidoCreado.id}
            </span>{" "}
            ha sido registrado con éxito.
          </p>

          <p className="text-gray-500 mb-8">
            Se abrió WhatsApp para que puedas confirmar los
            detalles de tu pedido.
          </p>

          {/* BOTON WHATSAPP */}
          <button
            onClick={() => abrirWhatsApp(pedidoCreado.id)}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer mb-4"
          >
            💬 Abrir WhatsApp nuevamente
          </button>

          {/* SEGUIR COMPRANDO */}
          <div>
            <a
              href="/"
              className="inline-block text-purple-700 hover:text-purple-900 font-semibold transition"
            >
              ← Seguir comprando
            </a>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">

      <h1 className="text-3xl md:text-4xl font-serif font-bold text-purple-800 mb-8">
        Finalizar pedido
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-5"
        >

          {/* NOMBRE */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Nombre completo
            </label>

            <input
              type="text"
              name="nombre_cliente"
              value={formulario.nombre_cliente}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          {/* TELEFONO */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Teléfono
            </label>

            <input
              type="tel"
              name="telefono"
              value={formulario.telefono}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ej. 5555-5555"
            />
          </div>

          {/* DIRECCION */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Dirección de entrega
            </label>

            <textarea
              name="direccion"
              value={formulario.direccion}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ej. Zona 10, Ciudad de Guatemala"
            />
          </div>

          {/* REFERENCIA */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Referencia
            </label>

            <textarea
              name="referencia"
              value={formulario.referencia}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ej. Casa blanca con portón negro"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* BOTON */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            {cargando ? "Creando pedido..." : "Confirmar pedido"}
          </button>

        </form>

        {/* RESUMEN */}
        <div className="bg-purple-100 rounded-2xl shadow-md p-6 h-fit">

          <h2 className="text-xl font-bold text-purple-800 mb-6">
            Resumen del pedido
          </h2>

          <div className="space-y-3 mb-6">

            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 text-sm"
              >
                <span>
                  {item.nombre} x {item.cantidad}
                </span>

                <span className="font-semibold">
                  Q{item.precio * item.cantidad}
                </span>
              </div>
            ))}

          </div>

          <div className="border-t pt-4 flex justify-between">

            <span className="font-semibold">
              Total
            </span>

            <span className="text-xl font-bold text-purple-700">
              Q{total}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;