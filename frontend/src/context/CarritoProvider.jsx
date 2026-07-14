import { useState, useEffect } from "react";
import { CarritoContext } from "./CarritoContext";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar producto
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  // Incrementar cantidad
  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // Decrementar cantidad
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
}