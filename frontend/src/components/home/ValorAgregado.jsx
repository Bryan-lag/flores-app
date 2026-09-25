const beneficios = [
  {
    titulo: "Envíos a todo el país",
    descripcion: "Entrega rápida en Guatemala.",
  },
  {
    titulo: "Flores 100% frescas",
    descripcion: "Seleccionadas cuidadosamente.",
  },
  {
    titulo: "Pago seguro",
    descripcion: "Compra de forma sencilla y segura.",
  },
  {
    titulo: "Dedicatoria personalizada",
    descripcion: "Agrega un mensaje especial a tu pedido.",
  },
];

const ValorAgregado = () => {
  return (
    <section className="py-6 px-4">
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto mt-3">
        {beneficios.map((beneficio, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 text-center"
          >
            <h3 className="font-semibold text-sm md:text-base">
              {beneficio.titulo}
            </h3>

            <p className="text-xs md:text-sm text-gray-500 mt-2">
              {beneficio.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValorAgregado;