import api from "./client";

export const crearPedido = async (pedido) => {
    const response = await api.post("/pedidos/", pedido);
    return response.data;
};