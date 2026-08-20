import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const obtenerProductos = async (categoria) => {
    const response = await api.get("/productos/", {
        params: categoria ? { categoria } : {},
    });

    return response.data;
};

export const obtenerProducto = async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
};

export const crearProducto = async (producto) => {
    const response = await api.post("/productos/", producto);
    return response.data;
};

export const actualizarProducto = async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
};

export const eliminarProducto = async (id) => {
    await api.delete(`/productos/${id}`);
};

export default api;