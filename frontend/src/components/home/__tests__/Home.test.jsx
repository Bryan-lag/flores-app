import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../../pages/Home";

  const renderHome = () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
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