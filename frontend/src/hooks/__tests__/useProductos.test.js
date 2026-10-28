import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { useProductos, useProducto } from "../useProductos";
import { obtenerProductos, obtenerProducto } from "../../api/productos";

// Se mockea la capa de API: estas pruebas no tocan la red.
vi.mock("../../api/productos", () => ({
  obtenerProductos: vi.fn(),
  obtenerProducto: vi.fn(),
}));

beforeEach(() => {
  // Los hooks hacen console.error al fallar; se silencia para no ensuciar la salida.
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  // Sin "globals: true", Testing Library no desmonta el DOM entre pruebas.
  cleanup();
  vi.restoreAllMocks();
});

describe("useProductos", () => {
  it("empieza cargando y luego devuelve los productos", async () => {
    obtenerProductos.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const { result } = renderHook(() => useProductos("ramos"));

    expect(result.current.cargando).toBe(true);

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(obtenerProductos).toHaveBeenCalledWith("ramos");
    expect(result.current.productos).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it("devuelve lista vacía si la respuesta no es un arreglo", async () => {
    obtenerProductos.mockResolvedValue({ detail: "algo raro" });

    const { result } = renderHook(() => useProductos());

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.productos).toEqual([]);
  });

  it("expone un mensaje de error si la petición falla", async () => {
    obtenerProductos.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useProductos());

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.productos).toEqual([]);
  });
});

describe("useProducto", () => {
  it("carga un producto por id", async () => {
    obtenerProducto.mockResolvedValue({ id: 7, nombre: "Rosas" });

    const { result } = renderHook(() => useProducto(7));

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.producto).toMatchObject({ id: 7 });
    expect(result.current.noEncontrado).toBe(false);
  });

  it("distingue 'no existe' (404) de un error de conexión", async () => {
    obtenerProducto.mockRejectedValue({ response: { status: 404 } });

    const { result } = renderHook(() => useProducto(999));

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.noEncontrado).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("un fallo de red no se marca como 'no encontrado'", async () => {
    obtenerProducto.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useProducto(7));

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.noEncontrado).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});