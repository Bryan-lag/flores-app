import { describe, it, expect, vi, afterEach } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "../../../context/CarritoContext";
import Home from "../../../pages/Home";


vi.mock("../../../api/productos", () => ({
  obtenerProductos: vi.fn().mockResolvedValue([]),
  obtenerProducto: vi.fn().mockResolvedValue(null),
}));


afterEach(() => {
  cleanup();
});


const renderHome = async () => {
  let resultado;
  await act(async () => {
    resultado = render(
      <CarritoProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </CarritoProvider>
    );
  });
  return resultado;
};

describe("Home page", () => {
  it("renderiza sin crashear", async () => {
    await expect(renderHome()).resolves.toBeDefined();
  });

  it("contiene al menos un elemento visible en el DOM", async () => {
    const { container } = await renderHome();
    expect(container.firstChild).not.toBeNull();
  });
});