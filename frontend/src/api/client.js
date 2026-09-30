import axios from "axios";

const API_URL = 
import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000": "");

if (!API_URL) {
     console.error("API_URL is not defined. Please set the VITE_API_URL environment variable.");
}

const api = axios.create({
     baseURL: API_URL,
     // Si el servidor no responde en 15 s, se corta con error
     timeout: 15000
})

// Adjunta el token de administrador a toda petición, si existe.
// Las rutas públicas simplemente ignoran este header.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;