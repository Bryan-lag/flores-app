import api from "./client";

export const crearPedido = async (pedido) => {
    const response = await api.post("/pedidos/", pedido);
    return response.data;
};

export const rastrearPedido = async (pedidoId, telefono) => {
    const response = await api.get("/pedidos/rastreo", {
        params: { pedido_id: pedidoId, telefono },
    });
    return response.data;
};