import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act, cleanup } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../CarritoContext";

const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;
const renderCarrito = () => renderHook(() => useCarrito(), { wrapper });

const rosas = { id: 1, nombre: "Rosas", precio: 50, stock: 5 };
const tulipanes = { id: 2, nombre: "Tulipanes", precio: 30, stock: 10 };

describe("CarritoContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Sin "globals: true", Testing Library no desmonta el DOM entre pruebas.
  afterEach(() => {
    cleanup();
  });

  it("arranca vacío cuando no hay nada guardado", () => {
    const { result } = renderCarrito();

    expect(result.current.carrito).toEqual([]);
    expect(result.current.total).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("calcula total y cantidad de items", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito(rosas, 2); // 2 x 50
      result.current.agregarAlCarrito(tulipanes, 1); // 1 x 30
    });

    expect(result.current.total).toBe(130);
    expect(result.current.totalItems).toBe(3);
  });

  it("nunca agrega más unidades que el stock disponible", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito(rosas, 3);
      result.current.agregarAlCarrito(rosas, 10);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(rosas.stock);
  });

  it("ignora productos sin stock", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito({ ...rosas, stock: 0 });
    });

    expect(result.current.carrito).toEqual([]);
  });

  it("incrementar no pasa del stock", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito({ ...rosas, stock: 2 }, 2);
    });
    act(() => {
      result.current.incrementarCantidad(rosas.id);
    });

    expect(result.current.carrito[0].cantidad).toBe(2);
  });

  it("decrementar hasta 0 elimina el producto", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito(rosas, 1);
    });
    act(() => {
      result.current.decrementarCantidad(rosas.id);
    });

    expect(result.current.carrito).toEqual([]);
  });

  it("guarda el carrito en localStorage", () => {
    const { result } = renderCarrito();

    act(() => {
      result.current.agregarAlCarrito(rosas, 2);
    });

    const guardado = JSON.parse(localStorage.getItem("carrito"));
    expect(guardado).toHaveLength(1);
    expect(guardado[0]).toMatchObject({ id: rosas.id, cantidad: 2 });
  });

  it("si el dato guardado está corrupto, arranca vacío en vez de romper", () => {
    localStorage.setItem("carrito", "{esto no es json");

    const { result } = renderCarrito();

    expect(result.current.carrito).toEqual([]);
  });

  it("descarta items inválidos del carrito guardado", () => {
    localStorage.setItem(
      "carrito",
      JSON.stringify([
        { id: 1, precio: 10, stock: 5, cantidad: 0 }, // cantidad 0
        { precio: 10, stock: 5, cantidad: 1 }, // sin id
        { id: 3, precio: 10, stock: 5, cantidad: 2 }, // válido
      ])
    );

    const { result } = renderCarrito();

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].id).toBe(3);
  });
});