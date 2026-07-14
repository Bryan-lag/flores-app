import FlorCarrusel from "./components/FlorCarrusel.jsx";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Funebre from "./pages/Funebre.jsx";
import Arreglos from "./pages/Arreglos.jsx";
import Eventos from "./pages/Eventos.jsx";

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
      </Routes>
    </>
  );
}

export default App;