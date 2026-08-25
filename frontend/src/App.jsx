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
import Ocaciones from "./pages/Ocaciones.jsx";

function App() {
  return (
    <>
      <Navbar />

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
        <Route path="/ocaciones" element={<Ocaciones/>} />
      </Routes>
    </>
  );
}

export default App;