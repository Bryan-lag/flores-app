import Detalles from "../components/Detalles";
import FlorCarrusel from "../components/FlorCarrusel";
import ArreglosPreview from "../components/home/ArreglosPreview";
import RamosPreview from "../components/home/RamosPreview";
import FunebresPreview from "../components/home/FunebrePreview";
import EventosPreview from "../components/home/EventosPreview";
import MensajePreview from "../components/home/MensajePreview";

  const Home = () => {
    return (
      <div>

        {/* HERO */}
        <div className="relative overflow-hidden bg-linear-to-br from-violet-200 via-purple-100 to-fuchsia-100">

          {/* GLOW 1 */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-violet-400/30 rounded-full blur-3xl"></div>

          {/* GLOW 2 */}
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"></div>

          {/* HERO CONTENT */}
          <section className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen max-w-6xl mx-auto px-4 md:px-8 pt-24 gap-10">

            {/* DETALLES */}
            <div className="w-full md:w-1/2">

              <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl shadow-violet-300/20 rounded-3xl p-8">

                <Detalles />

              </div>

            </div>

            {/* CARRUSEL */}
            <div className="w-full md:w-1/2 flex justify-center">

              <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl shadow-purple-300/20 rounded-3xl p-6">

                <FlorCarrusel />

              </div>

            </div>

          </section>

        </div>

        {/* PREVIEW RAMOS */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <RamosPreview />
        </div>

        {/* PREVIEW ARREGLOS */}
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <ArreglosPreview />
        </div>

        {/* FUNEBRES + EVENTOS */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <FunebresPreview />

            <EventosPreview />


          </div>

          <div>
              <MensajePreview/>
          </div>

        </div>

      </div>
    );
  };

export default Home;