import axios from "axios";


const api = axios.create({
     baseURL: "http://127.0.0.1:8000",
});

export async function obtenerProductos() {
     const response = await api.get("/productos");
     return response.data;
}


export default api;