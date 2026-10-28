import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "../../../context/CarritoContext";
import Home from "../../../pages/Home";

const renderHome = () =>
  render(
    <CarritoProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </CarritoProvider>
  );

describe("Home page", () => {
  it("renderiza sin crashear", () => {
    expect(() => renderHome()).not.toThrow();
  });

  it("contiene al menos un elemento visible en el DOM", () => {
    const { container } = renderHome();
    expect(container.firstChild).not.toBeNull();
  });
});