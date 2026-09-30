import { createContext, useContext, useEffect, useState } from "react";
import { iniciarSesion, verificarSesion } from "../api/admin";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);


  // Si no hay token, arrancamos sin sesión y sin pasar por el servidor.
  const [verificando, setVerificando] = useState(
    () => !!localStorage.getItem("admin_token")
  );

  useEffect(() => {
    if (!verificando) return;

    let activo = true;

    // El token puede haber expirado (dura 12h); lo confirmamos con el
    // servidor antes de dar por buena la sesión guardada.
    verificarSesion()
      .then(() => {
        if (activo) setAutenticado(true);
      })
      .catch(() => {
        if (activo) localStorage.removeItem("admin_token");
      })
      .finally(() => {
        if (activo) setVerificando(false);
      });

    return () => {
      activo = false;
    };
  }, [verificando]);

  const login = async (contrasena) => {
    const { access_token } = await iniciarSesion(contrasena);
    localStorage.setItem("admin_token", access_token);
    setAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setAutenticado(false);
  };

  return (
    <AdminContext.Provider
      value={{ autenticado, verificando, login, logout }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);