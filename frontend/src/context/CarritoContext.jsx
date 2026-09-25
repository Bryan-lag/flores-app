import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

// Lee el carrito guardado. Si el dato está corrupto, arranca vacío
// en lugar de romper toda la aplicación.
const cargarCarritoGuardado = () => {
  try {
    const guardado = JSON.parse(localStorage.getItem("carrito"));

    if (!Array.isArray(guardado)) return [];

    return guardado.filter(
      (item) => item && item.id != null && item.cantidad > 0
    );
  } catch {
    return [];
  }
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(cargarCarritoGuardado);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto (nunca más unidades de las que hay en stock)
  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (!producto || producto.stock <= 0 || cantidad <= 0) return;

    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                stock: producto.stock,
                cantidad: Math.min(item.cantidad + cantidad, producto.stock),
              }
            : item
        );
      }

      return [
        ...prevCarrito,
        { ...producto, cantidad: Math.min(cantidad, producto.stock) },
      ];
    });
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decrementarCantidad = (id) => {
      setCarrito((prevCarrito) =>
        prevCarrito
          .map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          )
          .filter((item) => item.cantidad > 0)
      );
    };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Total $
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Cantidad total de productos
  const totalItems = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        incrementarCantidad,
        decrementarCantidad,
        total,
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);