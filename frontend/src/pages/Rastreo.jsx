import { useState } from "react";
import { rastrearPedido } from "../api/pedidos";
import { ETIQUETA_ESTADO } from "../constants/estados";


const mensajeDeError = (error) => {
  if (!error.response) {
    return "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.";
  }
  const detalle = error.response.data?.detail;
  return typeof detalle === "string"
    ? detalle
    : "No encontramos un pedido con esos datos.";
};

const Rastreo = () => {
  const [pedidoId, setPedidoId] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [pedido, setPedido] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCargando(true);
    setError("");
    setPedido(null);

    try {
      const data = await rastrearPedido(pedidoId, telefono);
      setPedido(data);
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-10">

      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Rastrear pedido
      </h1>

      <p className="text-gray-600 text-center mb-8">
        Ingresa el número de pedido y el teléfono con el que lo hiciste.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div>
          <label htmlFor="pedidoId" className="block text-sm font-medium text-gray-700 mb-1">
            Número de pedido
          </label>
          <input
            id="pedidoId"
            type="number"
            min="1"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
            required
            placeholder="Ej. 12"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            placeholder="Ej. 5555-5555"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          {cargando ? "Buscando..." : "Buscar pedido"}
        </button>

      </form>

      {error && (
        <p role="alert" className="mt-5 text-center text-red-600">
          {error}
        </p>
      )}

      {pedido && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-lg">Pedido #{pedido.id}</p>
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
              {ETIQUETA_ESTADO[pedido.estado] || pedido.estado}
            </span>
          </div>

          <p className="text-sm text-gray-600">{pedido.direccion}</p>
          {pedido.referencia && (
            <p className="text-sm text-gray-500">Ref: {pedido.referencia}</p>
          )}

          <ul className="mt-4 text-sm text-gray-700 space-y-1">
            {pedido.detalles.map((item) => (
              <li key={item.producto_id}>
                • {item.producto_nombre} x{item.cantidad} — Q{item.precio_unitario * item.cantidad}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right font-bold text-purple-700">
            Total: Q{pedido.total}
          </p>

        </div>
      )}

    </div>
  );
};

export default Rastreo;