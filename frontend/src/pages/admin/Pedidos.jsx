import { useEffect, useState } from "react";
import { obtenerPedidos, actualizarEstadoPedido } from "../../api/admin";
import { useAdmin } from "../../context/AdminContext";
import EstadoCarga from "../../components/EstadoCarga";

const ESTADOS = ["pendiente", "confirmado", "en_camino", "entregado", "cancelado"];

const ETIQUETA_ESTADO = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  en_camino: "En camino",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

const AdminPedidos = () => {

  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState({
    clave: null,
    pedidos: [],
    error: null,
  });
  const [actualizando, setActualizando] = useState(null);

  const { logout } = useAdmin();

  useEffect(() => {
    let activo = true;

    obtenerPedidos()
      .then((data) => {
        if (!activo) return;
        setResultado({ clave: intento, pedidos: data, error: null });
      })
      .catch((err) => {
        console.error(err);
        if (!activo) return;
        setResultado({
          clave: intento,
          pedidos: [],
          error: "No pudimos cargar los pedidos. Revisa tu conexión.",
        });
      });

    return () => {
      activo = false;
    };
  }, [intento]);

  const actual = resultado.clave === intento;
  const pedidos = actual ? resultado.pedidos : [];
  const cargando = !actual;
  const error = actual ? resultado.error : null;

  const cambiarEstado = async (id, nuevoEstado) => {
    setActualizando(id);

    try {
      const pedidoActualizado = await actualizarEstadoPedido(id, nuevoEstado);

      setResultado((prev) => ({
        ...prev,
        pedidos: prev.pedidos.map((p) => (p.id === id ? pedidoActualizado : p)),
      }));
    } catch (err) {
      console.error(err);
      alert("No pudimos actualizar el estado. Intenta de nuevo.");
    } finally {
      setActualizando(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-36 md:pt-24 pb-10">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Pedidos</h1>

        <button
          onClick={logout}
          className="text-sm text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      <EstadoCarga
        cargando={cargando}
        error={error}
        vacio={pedidos.length === 0}
        mensajeVacio="Todavía no hay pedidos."
        onReintentar={() => setIntento((n) => n + 1)}
      >
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border border-gray-200 rounded-xl p-4">

              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold">
                    Pedido #{pedido.id} — {pedido.nombre_cliente}
                  </p>
                  <p className="text-sm text-gray-600">{pedido.telefono}</p>
                  <p className="text-sm text-gray-600">{pedido.direccion}</p>
                  {pedido.referencia && (
                    <p className="text-sm text-gray-500">
                      Ref: {pedido.referencia}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="font-bold text-purple-700">Q{pedido.total}</p>

                  <select
                    value={pedido.estado}
                    disabled={actualizando === pedido.id}
                    onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                    className="mt-2 border border-gray-300 rounded-lg px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                  >
                    {ESTADOS.map((estado) => (
                      <option key={estado} value={estado}>
                        {ETIQUETA_ESTADO[estado]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ul className="text-sm text-gray-700 space-y-1">
                {pedido.detalles.map((item) => (
                  <li key={item.producto_id}>
                    • {item.producto_nombre} x{item.cantidad} — Q
                    {item.precio_unitario * item.cantidad}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </EstadoCarga>

    </div>
  );
};

export default AdminPedidos;