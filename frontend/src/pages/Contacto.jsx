import { useState } from "react";
import { EMAIL_CONTACTO, UBICACION } from "../config/contacto";
import {FaWhatsapp} from "react-icons/fa";

const NUMERO_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER;

const FORMULARIO_VACIO = {
  nombre: "",
  correo: "",
  asunto: "",
  mensaje: "",
};

const Contacto = () => {
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!NUMERO_WHATSAPP) {
      setError(
        "No podemos enviar el mensaje en este momento. Escríbenos directamente por WhatsApp o correo."
      );
      return;
    }

    const mensaje = [
      "Hola, tengo un mensaje desde el sitio de TULIPA",
      "",
      `*Nombre:* ${formulario.nombre}`,
      formulario.correo && `*Correo:* ${formulario.correo}`,
      formulario.asunto && `*Asunto:* ${formulario.asunto}`,
      "",
      formulario.mensaje,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");

    setError("");
    setEnviado(true);
    setFormulario(FORMULARIO_VACIO);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-8 pb-16">

      {/* Encabezado */}
      <section className="relative text-center px-6 py-10 mx-5 mb-12 rounded-3xl bg-purple-500 shadow-lg overflow-hidden">

        {/* Decoracion */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-400/20 rounded-full"></div>
        <div className="absolute -bottom-12 -left-10 w-36 h-36 bg-purple-400/20 rounded-full"></div>

        <div className="relative">
          <p className="text-pink-200 text-sm uppercase tracking-[0.25em] mb-3">
            Tulipa
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Contáctanos
          </h1>

          <p className="max-w-2xl mx-auto text-purple-100 text-lg leading-relaxed">
            ¿Tienes alguna pregunta o quieres realizar un pedido especial?
            Estamos aquí para ayudarte.
          </p>
        </div>
      </section>


      {/* Contenido */}
      <section className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


          {/* Información de contacto */}
          <div className="space-y-6">

            <div className="mb-8 ">
              <p className="text-purple-700 font-medium tracking-wide uppercase text-sm mb-2">
                Estamos para ti
              </p>

              <h2 className="text-3xl font-serif text-gray-800">
                Ponte en contacto con nosotros
              </h2>

              <div className="w-16 h-1 bg-pink-400 rounded-full mt-4"></div>
            </div>


            {/* WhatsApp */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:border-pink-200 transition duration-300">

              <div className="flex items-start gap-4">

                <div className="shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <FaWhatsapp className="text-green-600 text-xl" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    WhatsApp
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Escríbenos directamente para consultar sobre nuestros
                    productos y pedidos.
                  </p>

                  {NUMERO_WHATSAPP ? (
                    <a
                      href={`https://wa.me/${NUMERO_WHATSAPP}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-purple-700 font-semibold hover:text-purple-900 transition"
                    >
                      +{NUMERO_WHATSAPP}
                    </a>
                  ) : (
                    <p className="mt-3 text-gray-400">No disponible</p>
                  )}
                </div>

              </div>
            </div>


            {/* Correo */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:border-pink-200 transition duration-300">

              <div className="flex items-start gap-4">

                <div className="shrink-0 w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
                  <span className="text-pink-500 text-xl">
                    ✉
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Correo electrónico
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    También puedes enviarnos tus consultas por correo.
                  </p>

                  <a
                    href={`mailto:${EMAIL_CONTACTO}`}
                    className="mt-3 inline-block text-purple-700 font-semibold hover:text-purple-900 transition"
                  >
                    {EMAIL_CONTACTO}
                  </a>
                </div>

              </div>
            </div>


            {/* Ubicación */}
            <div className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:border-pink-200 transition duration-300">

              <div className="flex items-start gap-4">

                <div className="shrink-0 w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <span className="text-purple-700 text-xl">
                    ⌖
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ubicación
                  </h3>

                  <p className="text-gray-600">
                    {UBICACION}
                  </p>
                </div>

              </div>
            </div>

          </div>


          {/* Formulario */}
          <div className="bg-pink-100 rounded-3xl shadow-md border border-stone-100 p-6 md:p-8">

            <div className="mb-7">
              <p className="text-purple-700 font-medium tracking-wide uppercase text-sm mb-2">
                Hablemos
              </p>

              <h2 className="text-3xl font-serif text-gray-800">
                Envíanos un mensaje
              </h2>

              <p className="text-gray-500 mt-2">
                Cuéntanos cómo podemos ayudarte.
              </p>
            </div>

            {enviado && (
              <p
                role="status"
                className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm"
              >
                Se abrió WhatsApp con tu mensaje listo para enviar.
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>


              {/* Correo */}
              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tu@email.com"
                  value={formulario.correo}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>


              {/* Asunto */}
              <div>
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Asunto
                </label>

                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formulario.asunto}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>


              {/* Mensaje */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mensaje
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  placeholder="Escribe tu mensaje..."
                  value={formulario.mensaje}
                  onChange={handleChange}
                  required
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition resize-none"
                ></textarea>
              </div>


              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-purple-700 text-white cursor-pointer py-3.5 rounded-xl font-medium hover:bg-purple-800 hover:shadow-lg transition duration-300"
              >
                Enviar mensaje
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contacto;