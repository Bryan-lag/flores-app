import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminLogin = () => {
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      await login(contrasena);
      navigate("/admin/pedidos");
    } catch (err) {
      const status = err.response?.status;

      setError(
        status === 401
          ? "Contraseña incorrecta."
          : "No pudimos conectar con el servidor. Intenta de nuevo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 pt-36 md:pt-32 pb-10">
      <h1 className="text-2xl font-bold text-center mb-8">
        Acceso administrador
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            autoFocus
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && (
          <p role="alert" className="text-red-600 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;