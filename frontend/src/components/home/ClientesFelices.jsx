const clientes = [
  {
    nombre: "Ana",
    comentario:
      "El arreglo quedó precioso y la entrega fue puntual. Todo excelente.",
  },
  {
    nombre: "Lucía",
    comentario:
      "Las flores llegaron hermosas y exactamente como las esperaba.",
  },
  {
    nombre: "María",
    comentario:
      "Muy buena atención y el arreglo estuvo perfecto para la ocasión.",
  },
];

const ClientesFelices = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        CLIENTES FELICES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {clientes.map((cliente, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5"
          >
            <div className="text-yellow-500 text-lg mb-2">
              ★★★★★
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              "{cliente.comentario}"
            </p>

            <p className="font-semibold mt-4 text-purple-700">
              {cliente.nombre}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientesFelices;