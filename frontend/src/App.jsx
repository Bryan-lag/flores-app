import FlorCarrusel from "./components/FlorCarrusel.jsx";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Funebre from "./pages/Funebre.jsx";
import Arreglos from "./pages/Arreglos.jsx";
import Eventos from "./pages/Eventos.jsx";
import Carrito from "./pages/Carrito.jsx"
import Catalogo from "./pages/Catalogo.jsx";
import Contacto from "./pages/Contacto.jsx";
import Ocasiones from "./pages/Ocasiones.jsx";
import OcasionesProductos from "./pages/OcasionesProductos.jsx";
import ProductoDetalle from "./pages/ProductoDetalle";
import Checkout from "./pages/Checkout.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/funebre" element={<Funebre />} />
        <Route path="/arreglos" element={<Arreglos />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/flor-carrusel" element={<FlorCarrusel />} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/catalogo" element={<Catalogo/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/ocasiones" element={<Ocasiones/>} />
        <Route path="/ocasiones/:ocasion" element={<OcasionesProductos/>} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/checkout" element={<Checkout />} />
s      </Routes>

      <Footer />
    </>
  );
}

export default App;