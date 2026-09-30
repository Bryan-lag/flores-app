import api from "./client";

export const iniciarSesion = async (contrasena) => {
  const response = await api.post("/admin/login", { contrasena });
  return response.data;
};

export const verificarSesion = async () => {
  const response = await api.get("/admin/me");
  return response.data;
};

export const obtenerPedidos = async () => {
  const response = await api.get("/pedidos/");
  return response.data;
};

export const actualizarEstadoPedido = async (id, estado) => {
  const response = await api.patch(`/pedidos/${id}/estado`, { estado });
  return response.data;
};