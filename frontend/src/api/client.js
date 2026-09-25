import axios from "axios";

const API_URL = 
import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000": "");

if (!API_URL) {
     console.error("API_URL is not defined. Please set the VITE_API_URL environment variable.");
}

const api = axios.create({
     baseURL: API_URL,
     // Si el servidor no responde en 15 s, se corta con error
     // en lugar de dejar la pantalla cargando para siempre.
     timeout: 15000
})


export default api;