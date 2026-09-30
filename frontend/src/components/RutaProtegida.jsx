import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

// Envuelve una página de admin: si no hay sesión válida, manda a login.
const RutaProtegida = ({ children }) => {
  const { autenticado, verificando } = useAdmin();

  if (verificando) {
    return (
      <div className="pt-36 md:pt-24 text-center">
        <p role="status" className="text-gray-500">
          Verificando sesión...
        </p>
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RutaProtegida;