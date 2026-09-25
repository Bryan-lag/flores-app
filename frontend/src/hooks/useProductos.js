import { useEffect, useState } from "react";
import { obtenerProductos, obtenerProducto } from "../api/productos";

const MENSAJE_ERROR =
  "No pudimos cargar la información. Revisa tu conexión e inténtalo de nuevo.";

// Carga la lista de productos (todos, o solo los de una categoría).
// Devuelve { productos, cargando, error, reintentar }.
export function useProductos(categoria) {
  const [intento, setIntento] = useState(0);

  // "clave" identifica la petición actual (categoría + número de intento).
  // Mientras el resultado guardado no coincida con ella, estamos cargando.
  const clave = `${categoria ?? ""}|${intento}`;

  const [resultado, setResultado] = useState({
    clave: null,
    productos: [],
    error: null,
  });

  useEffect(() => {
    // "activo" evita guardar una respuesta vieja si el usuario ya
    // cambió de categoría o salió de la página.
    let activo = true;

    obtenerProductos(categoria)
      .then((data) => {
        if (!activo) return;
        setResultado({
          clave,
          productos: Array.isArray(data) ? data : [],
          error: null,
        });
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        if (!activo) return;
        setResultado({ clave, productos: [], error: MENSAJE_ERROR });
      });

    return () => {
      activo = false;
    };
  }, [categoria, clave]);

  const actual = resultado.clave === clave;

  return {
    productos: actual ? resultado.productos : [],
    cargando: !actual,
    error: actual ? resultado.error : null,
    reintentar: () => setIntento((n) => n + 1),
  };
}

// Carga un solo producto por id.
// Distingue "no existe" (404/422) de "falló la conexión".
export function useProducto(id) {
  const [intento, setIntento] = useState(0);
  const clave = `${id}|${intento}`;

  const [resultado, setResultado] = useState({
    clave: null,
    producto: null,
    error: null,
    noEncontrado: false,
  });

  useEffect(() => {
    let activo = true;

    obtenerProducto(id)
      .then((data) => {
        if (!activo) return;
        setResultado({ clave, producto: data, error: null, noEncontrado: false });
      })
      .catch((err) => {
        console.error("Error al cargar el producto:", err);
        if (!activo) return;

        const status = err.response?.status;
        const noEncontrado = status === 404 || status === 422;

        setResultado({
          clave,
          producto: null,
          error: noEncontrado ? null : MENSAJE_ERROR,
          noEncontrado,
        });
      });

    return () => {
      activo = false;
    };
  }, [id, clave]);

  const actual = resultado.clave === clave;

  return {
    producto: actual ? resultado.producto : null,
    cargando: !actual,
    error: actual ? resultado.error : null,
    noEncontrado: actual ? resultado.noEncontrado : false,
    reintentar: () => setIntento((n) => n + 1),
  };
}